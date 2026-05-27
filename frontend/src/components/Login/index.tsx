import { useLoginForm } from '../../hooks/useLogin';
import { LoginStyles as s } from './Login';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const { email, setEmail, password, setPassword, errors, handleSubmit } = useLoginForm();
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>TutorIA</h1>
        <p className={s.subtitle}>Entre para continuar seus estudos</p>

        <form onSubmit={(e) => handleSubmit(e, () => navigate('/dashboard'))} className={s.form} noValidate>
          <div className={s.inputGroup}>
            <label className={s.label}>E-mail</label>
            <input
              type="email"
              className={errors.email ? s.inputInvalid : s.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={s.fieldError}>{errors.email}</p>}
          </div>

          <div className={s.inputGroup}>
            <label className={s.label}>Senha</label>
            <input
              type="password"
              className={errors.password ? s.inputInvalid : s.input}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className={s.fieldError}>{errors.password}</p>}
          </div>

          <button type="submit" className={s.button}>Entrar</button>
          <button type="button" className={s.btnOutline}>
            <NavLink to="/">Voltar</NavLink>
          </button>
        </form>

        <p className="text-[#9ca3af] text-center mt-6 text-sm">
          Nao tem uma conta? <NavLink to="/signup" className="text-[#4ade80] hover:underline">Cadastre-se</NavLink>
        </p>
      </div>
    </div>
  );
}
