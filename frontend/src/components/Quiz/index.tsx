import useQuiz from '../../hooks/useQuiz';
import type { Topic } from '../../hooks/useQuiz';
import { QuizStyles as s } from './QuizStyles';

const badgeClass = { high: s.nextTopicBadgeHigh, mid: s.nextTopicBadgeMid, low: s.nextTopicBadgeLow };
const badgeLabel = { high: 'Revisar', mid: 'Dificuldade', low: 'Explorar' };

function NextTopicsCard({ topics, onSelectTopic }: { topics: Topic[]; onSelectTopic: (t: string) => void }) {
  if (topics.length === 0) return null;
  return (
    <div className={s.nextTopicsCard}>
      <p className={s.nextTopicsTitle}>Próximos Temas</p>
      {topics.map((item, i) => (
        <button
          key={i}
          className={`${s.nextTopicItem} w-full text-left hover:border-[#555] transition-colors cursor-pointer`}
          onClick={() => onSelectTopic(item.topic)}
        >
          <div className="flex flex-col gap-0.5">
            <span className={s.nextTopicName}>{item.topic}</span>
            <span className={s.nextTopicReason}>{item.reason}</span>
          </div>
          <span className={badgeClass[item.priority]}>{badgeLabel[item.priority]}</span>
        </button>
      ))}
    </div>
  );
}

export default function Quiz() {
  const {
    progress,
    question, selected, feedback,
    loading, fetchError,
    xpGained,
    sessionCorrect, sessionWrong,
    historyIndex, currentSubject,
    nextTopics,
    handleAnswer, goToPrev, goToNext, selectTopic, retry,
  } = useQuiz();

  if (loading) return <div className="p-8 text-white text-center">IA gerando questão personalizada...</div>;

  if (fetchError) return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-[#f87171] font-semibold">Não foi possível carregar a questão.</p>
      <p className="text-[#9ca3af] text-sm">Verifique se o backend está rodando na porta 5001.</p>
      <button onClick={retry} className="px-6 py-2 rounded-xl border border-[#4ade80] text-[#4ade80] text-sm hover:bg-[#4ade80] hover:text-black transition-colors cursor-pointer bg-transparent">
        Tentar novamente
      </button>
    </div>
  );

  return (
    <div className={s.page}>

      <div className={s.quizCard}>

        <div className={s.quizHeader}>
          <span className={s.subjectBadge}>{currentSubject || 'Geral'}</span>
          {xpGained !== null && (
            <span className="text-[#4ade80] font-bold animate-bounce">+{xpGained} XP!</span>
          )}
        </div>

        <div className={s.questionRow}>
          <p className={s.questionText}>{question?.question}</p>
          <div className={s.navButtons}>
            <button className={s.buttonPrevQuestion} onClick={goToPrev} disabled={historyIndex === 0} style={{ opacity: historyIndex === 0 ? 0.35 : 1 }}>←</button>
            <button className={s.buttonNextQuestion} onClick={goToNext}>→</button>
          </div>
        </div>

        <div className={s.optionsList}>
          {question?.options?.map((opt, i) => {
            let cls = s.optionDefault;
            if (selected === i) cls = s.optionSelected;
            if (feedback) {
              if (i === question.correct_index) cls = "w-full text-left px-4 py-3 rounded-xl border-2 border-[#4ade80] text-white bg-[#1a3d2b]";
              else if (selected === i)          cls = "w-full text-left px-4 py-3 rounded-xl border-2 border-[#f87171] text-white bg-[#3d1a1a]";
              else                              cls = s.optionDisabled;
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={!!feedback}>
                {opt}
              </button>
            );
          })}
          {(!question?.options || question.options.length === 0) && (
            <div className="text-center py-8 text-[#9ca3af] italic">Ocorreu um erro ao carregar as opções.</div>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {feedback && (
            <div className={feedback.correct ? s.feedbackSuccess : s.feedbackError}>
              <p><strong>{feedback.correct ? 'Correto!' : 'Ops!'}</strong> {feedback.msg}</p>
            </div>
          )}
          <button
            className={`${s.nextBtn} ${!feedback ? 'invisible pointer-events-none' : ''}`}
            onClick={goToNext}
          >
            Próxima Questão IA →
          </button>
        </div>

      </div>

      <NextTopicsCard topics={nextTopics} onSelectTopic={selectTopic} />

      <div className={s.statsCard}>
        <div className={s.statItem}>
          <span className={s.statValue}>{progress?.xp ?? 0}</span>
          <span className={s.statLabel}>XP Total</span>
        </div>
        <div className={s.statDivider} />
        <div className={s.statItem}>
          <span className="text-[#4ade80] font-bold text-xl">{sessionCorrect}</span>
          <span className={s.statLabel}>Acertos</span>
        </div>
        <div className={s.statDivider} />
        <div className={s.statItem}>
          <span className="text-[#f87171] font-bold text-xl">{sessionWrong}</span>
          <span className={s.statLabel}>Erros</span>
        </div>
        <div className={s.statDivider} />
        <div className={s.statItem}>
          <span className="text-[#facc15] font-bold text-xl">{progress?.streak ?? 0}</span>
          <span className={s.statLabel}>Sequência</span>
        </div>
      </div>

    </div>
  );
}
