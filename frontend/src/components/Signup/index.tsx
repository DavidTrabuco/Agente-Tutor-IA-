import { SignUpStyles as s } from './SignUpStyles';
import useSignUp from '../../hooks/useSignUp';
import { NavLink } from 'react-router-dom';

export default function Signup() {
  const { name, setName, email, setEmail, password, setPassword, errors, handleSubmit } = useSignUp();

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>Criar Conta</h1>
        <p className={s.subtitle}>Junte-se ao TutorIA e comece a aprender</p>

        <form onSubmit={handleSubmit} className={s.form} noValidate>
          <div className={s.inputGroup}>
            <label className={s.label}>Nome Completo</label>
            <input
              type="text"
              className={errors.name ? s.inputInvalid : s.input}
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className={s.fieldError}>{errors.name}</p>}
          </div>

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

          <button type="submit" className={s.button}>Criar Conta</button>
        </form>

        <p className="text-[#9ca3af] text-center mt-6 text-sm">
          Já tem uma conta? <NavLink to="/login" className="text-[#4ade80] hover:underline">Entrar</NavLink>
        </p>
      </div>
    </div>
  );
}
