import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode, FC } from 'react';

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
    // Simulando chamada de API com mock data
    try {
      const response = await fetch('/src/data/mock/users.json');
      const users = await response.json();
      
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('@TutorIA:user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    try {
      const newUser = {
        ...userData,
        id: Date.now(),
        onboarded: false,
        xp: 0,
        level: 1,
        streak: 0
      };
      
      // No mundo real, faríamos um POST para o backend
      // Aqui simulamos salvando no localStorage e no estado
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
