import useDashboard from '../../hooks/useDashboard';
import { TelaPrincipalStyles as s } from './DashboardStyles';

export default function Dashboard() {
  const { user, loading, subjects, streak, xp, timeStudied, difficulties, skills, getMeta, greetingMsg } = useDashboard();

  if (loading) return <div className={s.loading}>Carregando dashboard...</div>;

  return (
    //Teste de David 
    <div className={s.page}>

      <div className={s.greetingCard}>
        <div className={s.greetingAvatar}>👤</div>
        <div className={s.greetingContent}>
          <p className={s.greetingTitle}>Olá, {user?.name}! 👋</p>
          <p className={s.greetingSubtitle}>{greetingMsg}</p>
        </div>
      </div>

      <div className={s.statsRow}>
        <div className={s.statCard}>
          <span className={s.statIcon} style={{ color: '#f59e0b' }}>🔥</span>
          <p className={s.statValue}>{streak}</p>
          <p className={s.statLabel}>dias seguidos</p>
        </div>
        <div className={s.statCard}>
          <span className={s.statIcon} style={{ color: '#4ade80' }}>✓</span>
          <p className={s.statValue}>{xp}</p>
          <p className={s.statLabel}>XP total</p>
        </div>
        <div className={s.statCard}>
          <span className={s.statIcon} style={{ color: '#60a5fa' }}>🕐</span>
          <p className={s.statValue}>{timeStudied}</p>
          <p className={s.statLabel}>tempo estudado</p>
        </div>
      </div>

      <div className={s.skillsMapCard}>
        <p className={s.skillsMapTitle}>Mapa de Habilidades</p>
        <div className={s.skillsMapList}>
          {skills.length > 0 ? skills.map(skill => (
            <div key={skill.name} className={s.skillRow}>
              <span className={s.skillName}>{skill.name}</span>
              <div className={s.skillBars}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={s.skillBar}
                    style={{ backgroundColor: i < Math.round(skill.percent / 10) ? skill.barColor : '#333' }}
                  />
                ))}
              </div>
              <span className="text-[#9ca3af] text-xs w-8 text-right">{skill.percent}%</span>
            </div>
          )) : (
            <p className="text-[#9ca3af] text-xs italic">Nenhuma habilidade registrada ainda.</p>
          )}
        </div>
      </div>

      <div className={s.subjectsSection}>
        <p className={s.sectionHeading}>Matérias</p>
        {subjects.length > 0 ? (
          <div className={s.subjectsGrid}>
            {subjects.map(sub => {
              const meta = getMeta(sub.name);
              return (
                <div key={sub.name} className={s.subjectCard}>
                  <div className={s.subjectHeader}>
                    <div className={s.subjectIcon} style={{ backgroundColor: meta.iconBg, color: meta.iconColor }}>
                      {meta.label}
                    </div>
                    <div className={s.subjectInfo}>
                      <p className={s.subjectName}>{sub.name}</p>
                      <p className={s.subjectPercent}>{sub.percent}% concluído</p>
                    </div>
                  </div>
                  <div className={s.progressBg}>
                    <div className={s.progressFill} style={{ width: `${sub.percent}%`, backgroundColor: meta.barColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={s.subjectsEmpty}>Nenhuma matéria iniciada ainda. Comece pelo Tutor!</div>
        )}
      </div>

      {difficulties.length > 0 && (
        <div className={s.difficultiesCard}>
          <p className={s.difficultiesTitle}>Atenção</p>
          <p className={s.difficultiesText}>
            Você está com dificuldade em: <span className="font-semibold">{difficulties.join(', ')}</span>. Que tal revisar esses temas hoje?
          </p>
        </div>
      )}

    </div>
  );
}
