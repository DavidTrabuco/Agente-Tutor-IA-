import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  name: string;
  education_level?: string;
  interests?: string[];
  difficulties?: string[];
  learning_style?: string;
  goal?: string;
  onboarded?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('@TutorIA:user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const loggedUser = await response.json();
      setUser(loggedUser);
      localStorage.setItem('@TutorIA:user', JSON.stringify(loggedUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) return false;

      const newUser = await response.json();
      setUser(newUser);
      localStorage.setItem('@TutorIA:user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('@TutorIA:user', JSON.stringify(updatedUser));
      
      // Sincronizar com o backend real no futuro
      await fetch('http://localhost:5001/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      }).catch(err => console.error("Sync error:", err));
    }
  };

  const logout = () => {
    localStorage.removeItem('@TutorIA:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, updateUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const validar = (): boolean => {
    const next = { email: '', password: '' };
    let valido = true;

    if (!email) {
      next.email = 'E-mail obrigatorio.';
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'E-mail invalido.';
      valido = false;
    }

    if (!password) {
      next.password = 'Senha obrigatoria.';
      valido = false;
    } else if (password.length < 6) {
      next.password = 'A senha deve ter ao menos 6 caracteres.';
      valido = false;
    }

    setErrors(next);
    return valido;
  };

  const handleSubmit = async (e: React.FormEvent, onSuccess: () => void) => {
    e.preventDefault();
    if (!validar()) return;

    const success = await login(email, password);
    if (!success) {
      setErrors({ email: 'E-mail ou senha invalidos.', password: '' });
    } else {
      onSuccess();
    }
  };

  return { email, setEmail, password, setPassword, errors, handleSubmit };
}

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-[#181818] flex items-center justify-center text-white">Carregando...</div>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
