import { useState } from 'react';
import { useAuth } from '../../hooks/useLogin';
import { LoginStyles as s } from './Login';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>TutorIA</h1>
        <p className={s.subtitle}>Entre para continuar seus estudos</p>
        
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.inputGroup}>
            <label className={s.label}>E-mail</label>
            <input
              type="email"
              className={s.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={s.inputGroup}>
            <label className={s.label}>Senha</label>
            <input
              type="password"
              className={s.input}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className={s.button}>
            Entrar
          </button>
        </form>

        {error && <p className={s.error}>{error}</p>}

        <p className="text-[#9ca3af] text-center mt-6 text-sm">
          Não tem uma conta? <NavLink to="/signup" className="text-[#4ade80] hover:underline">Cadastre-se</NavLink>
        </p>
      </div>
    </div>
  );
}
