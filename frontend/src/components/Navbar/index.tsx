import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useLogin';
import { NavBarStyles as s } from './NavBarStyles';

const links = [
  { to: '/', label: 'Início', icon: '⌂' },
  { to: '/chatbot', label: 'Tutor', icon: '☰' },
  { to: '/quiz', label: 'Quiz', icon: '≡' },
];

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={s.wrapper}>
      <div className={s.brand}>
        <div className={s.logoCircle}>✦</div>
        <div className={s.titleGroup}>
          <span className={s.title}><NavLink to="/dashboard">TutorIA</NavLink></span>
          <span className={s.subtitle}>Agente de aprendizado adaptativo</span>
        </div>
      </div>
      <ul className={s.nav}>
        {links.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => `${s.navLink} ${isActive ? s.navLinkActive : ''}`}
            >
              <span className={s.icon}>{link.icon}</span>
              <span className={s.label}>{link.label}</span>
            </NavLink>
          </li>
        ))}
        <button
          className={s.navButton}
          onClick={handleLogout}
          style={{ color: '#ef4444' }}
        >
          ⎋ Sair
        </button>
      </ul>
    </nav>
  );
}
