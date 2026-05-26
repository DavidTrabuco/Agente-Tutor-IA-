import { useAuth } from '../../hooks/useLogin';
import { useProgress } from '../../hooks/useProgress';
import { TelaPrincipalStyles as s } from './DashboardStyles';

const subjectMeta: Record<string, any> = {
  'Algoritmos':                 { label: '</>',  iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'Lógica de Programação':      { label: 'λ',   iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'Estrutura de Dados':         { label: '[]',  iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'POO':                        { label: '📦',  iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'Cálculo I':                  { label: '√x',   iconBg: '#2a1a3d', iconColor: '#a855f7', barColor: '#a855f7' },
  'Banco de Dados':             { label: '⊕',    iconBg: '#1a2a3d', iconColor: '#60a5fa', barColor: '#60a5fa' },
  'Redes de Computadores':      { label: '🌐',    iconBg: '#3d2a1a', iconColor: '#f59e0b', barColor: '#f59e0b' },
  'Inteligência Artificial':    { label: '🤖',    iconBg: '#3d1a1a', iconColor: '#f87171', barColor: '#f87171' },
};

export default function Dashboard() {
  const { user } = useAuth();
  const { progress, loading } = useProgress();

  if (loading) return <div className={s.loading}>Carregando dashboard...</div>;

  const subjects = progress?.subjects || [];
  const streak = progress?.streak || 0;
  const xp = progress?.xp || 0;
  const timeStudied = progress?.time_studied || '0min';
  const difficulties = progress?.difficulties || [];

  return (
    <div className={s.page}>

      <div className={s.greetingCard}>
        <div className={s.greetingAvatar}>👤</div>
        <div className={s.greetingContent}>
          <p className={s.greetingTitle}>Olá, {user?.name}! 👋</p>
          <p className={s.greetingSubtitle}>
            {streak > 0
              ? `Você estudou ${streak} dias seguidos. Continue assim!`
              : "Bem-vindo ao seu primeiro dia de estudos! Vamos começar?"}
          </p>
        </div>
      </div>

      <div className={s.statsRow}>
        <div className={s.statCard}>
          <span className={s.statIcon} style={{ color: '#4ade80' }}>🔥</span>
          <p className={s.statValue}>{streak}</p>
          <p className={s.statLabel}>dias seguidos</p>
        </div>
        <div className={s.statCard}>
          <span className={s.statIcon} style={{ color: '#4ade80' }}>✓</span>
          <p className={s.statValue}>{xp}</p>
          <p className={s.statLabel}>XP total</p>
        </div>
        <div className={s.statCard}>
          <span className={s.statIcon} style={{ color: '#4ade80' }}>🕐</span>
          <p className={s.statValue}>{timeStudied}</p>
          <p className={s.statLabel}>tempo estudado</p>
        </div>
      </div>

      <div className={s.skillsMapCard}>
        <p className={s.skillsMapTitle}>Mapa de Habilidades</p>
        <div className={s.skillsMapList}>
          {[
            { name: 'Backend',    val: 70 },
            { name: 'SQL',        val: 50 },
            { name: 'Algoritmos', val: 30 },
            { name: 'IA',         val: 20 },
          ].map(skill => (
            <div key={skill.name} className={s.skillRow}>
              <span className={s.skillName}>{skill.name}</span>
              <div className={s.skillBars}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${s.skillBar} ${i < skill.val / 10 ? 'bg-[#4ade80]' : 'bg-[#333]'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.subjectsSection}>
        <p className={s.sectionHeading}>Matérias</p>
        {subjects.length > 0 ? (
          <div className={s.subjectsGrid}>
            {subjects.map((sub) => {
              const meta = subjectMeta[sub.name] || { label: '?', iconBg: '#333', iconColor: '#fff', barColor: '#fff' };
              return (
                <div key={sub.name} className={s.subjectCard}>
                  <div className={s.subjectHeader}>
                    <div
                      className={s.subjectIcon}
                      style={{ backgroundColor: meta.iconBg, color: meta.iconColor }}
                    >
                      {meta.label}
                    </div>
                    <div className={s.subjectInfo}>
                      <p className={s.subjectName}>{sub.name}</p>
                      <p className={s.subjectPercent}>{sub.percent}% concluído</p>
                    </div>
                  </div>
                  <div className={s.progressBg}>
                    <div
                      className={s.progressFill}
                      style={{ width: `${sub.percent}%`, backgroundColor: meta.barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={s.subjectsEmpty}>
            Nenhuma matéria iniciada ainda. Comece pelo Tutor!
          </div>
        )}
      </div>

      {difficulties.length > 0 && (
        <div className={s.difficultiesCard}>
          <p className={s.difficultiesTitle}>Atenção</p>
          <p className={s.difficultiesText}>
            Você está com dificuldade em: <span className="font-semibold">{difficulties.join(', ')}</span>.
            Que tal revisar esses temas hoje?
          </p>
        </div>
      )}

    </div>
  );
}
