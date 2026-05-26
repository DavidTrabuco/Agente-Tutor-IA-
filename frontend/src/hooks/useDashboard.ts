import { useAuth } from './useLogin';
import { useProgress } from './useProgress';

export const subjectMeta: Record<string, { label: string; iconBg: string; iconColor: string; barColor: string }> = {
  'Algoritmos':              { label: '</>',  iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'Lógica de Programação':   { label: 'λ',    iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'Estrutura de Dados':      { label: '[]',   iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'POO':                     { label: '📦',   iconBg: '#1a3d2b', iconColor: '#4ade80', barColor: '#4ade80' },
  'Cálculo I':               { label: '√x',   iconBg: '#2a1a3d', iconColor: '#a855f7', barColor: '#a855f7' },
  'Banco de Dados':          { label: '⊕',    iconBg: '#1a2a3d', iconColor: '#60a5fa', barColor: '#60a5fa' },
  'Redes de Computadores':   { label: '🌐',   iconBg: '#3d2a1a', iconColor: '#f59e0b', barColor: '#f59e0b' },
  'Redes':                   { label: '🌐',   iconBg: '#3d2a1a', iconColor: '#f59e0b', barColor: '#f59e0b' },
  'Inteligência Artificial':  { label: '🤖',  iconBg: '#3d1a1a', iconColor: '#f87171', barColor: '#f87171' },
  'Frontend':                { label: '✦',    iconBg: '#1a2a3d', iconColor: '#60a5fa', barColor: '#60a5fa' },
};

const fallbackMeta = { label: '?', iconBg: '#2e2e2e', iconColor: '#9ca3af', barColor: '#9ca3af' };

export default function useDashboard() {
  const { user } = useAuth();
  const { progress, loading } = useProgress();

  const subjects = progress?.subjects ?? [];
  const streak   = progress?.streak ?? 0;
  const xp       = progress?.xp ?? 0;
  const timeStudied   = progress?.time_studied ?? '0min';
  const difficulties  = progress?.difficulties ?? [];

  // Mapa de habilidades vem direto das matérias reais do progresso
  const skills = subjects.map(s => ({
    name:     s.name,
    percent:  s.percent,
    barColor: (subjectMeta[s.name] ?? fallbackMeta).barColor,
  }));

  const getMeta = (name: string) => subjectMeta[name] ?? fallbackMeta;

  const greetingMsg = streak > 0
    ? `Você estudou ${streak} dia${streak > 1 ? 's' : ''} seguido${streak > 1 ? 's' : ''}. Continue assim!`
    : 'Bem-vindo ao seu primeiro dia de estudos! Vamos começar?';

  return {
    user,
    loading,
    subjects,
    streak,
    xp,
    timeStudied,
    difficulties,
    skills,
    getMeta,
    greetingMsg,
  };
}
