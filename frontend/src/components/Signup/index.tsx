import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useLogin';
import { SignUpStyles as s } from './SignUpStyles';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await signup({ name, email, password });
    if (success) {
      navigate('/questionario');
    } else {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>Criar Conta</h1>
        <p className={s.subtitle}>Junte-se ao TutorIA e comece a aprender</p>
        
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.inputGroup}>
            <label className={s.label}>Nome Completo</label>
            <input
              type="text"
              className={s.input}
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className={s.button}>
            Criar Conta
          </button>

          </form>
          

        {error && <p className={s.error}>{error}</p>}

        <p className="text-[#9ca3af] text-center mt-6 text-sm">
          Já tem uma conta? <NavLink to="/login" className="text-[#4ade80] hover:underline">Entrar</NavLink>
        </p>
      </div>
    </div>
  );
}
