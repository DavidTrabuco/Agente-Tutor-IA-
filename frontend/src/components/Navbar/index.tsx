import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NavBarStyles as s } from '../../styles/NavBarStyles';

export default function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();
  
  const active = location.pathname;

  return (
    <nav className={s.wrapper}>
      <div className={s.brand}>
        <div className={s.logoCircle}>✦</div>
        <div className={s.titleGroup}>
          <span className={s.title}>TutorIA</span>
          <span className={s.subtitle}>Agente de aprendizado adaptativo</span>
        </div>
      </div>
      <div className={s.nav}>
        <Link
          to="/"
          className={active === '/' ? s.navButtonActive : s.navButton}
        >
          ⌂ Início
        </Link>
        <Link
          to="/tutor"
          className={active === '/tutor' ? s.navButtonActive : s.navButton}
        >
          ☰ Tutor
        </Link>
        <Link
          to="/quiz"
          className={active === '/quiz' ? s.navButtonActive : s.navButton}
        >
          ≡ Quiz
        </Link>
        <button
          className={s.navButton}
          onClick={logout}
          style={{ color: '#ef4444' }}
        >
          ⎋ Sair
        </button>
      </div>
    </nav>
  );
}
