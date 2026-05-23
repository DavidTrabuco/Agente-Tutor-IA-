import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { QuizStyles as s } from '../../styles/QuizStyles';

interface Question {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export default function Quiz() {
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; msg: string } | null>(null);
  const [xpGained, setXpGained] = useState<number | null>(null);

  const fetchQuestion = async () => {
    setLoading(true);
    setSelected(null);
    setFeedback(null);
    setXpGained(null);
    try {
      const res = await fetch('http://localhost:5001/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subject: user?.interests?.[0] || 'Algoritmos',
          user_id: user?.id 
        })
      });
      const data = await res.json();
      setQuestion(data);
    } catch (err) {
      console.error("Erro ao gerar questão:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = async (index: number) => {
    if (feedback || !question) return;
    
    const correct = index === question.correct_index;
    setSelected(index);
    setFeedback({ correct, msg: question.explanation });

    try {
      const res = await fetch('http://localhost:5001/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          correct,
          subject: user?.interests?.[0] || 'Algoritmos'
        })
      });
      await res.json();
      setXpGained(correct ? 50 : 10);
    } catch (err) {
      console.error("Erro ao salvar resposta:", err);
    }
  };

  if (loading) return <div className="p-8 text-white text-center">IA gerando questão personalizada...</div>;

  return (
    <div className={s.page}>
      <div className={s.quizCard}>
        <div className={s.quizHeader}>
          <span className={s.subjectBadge}>{user?.interests?.[0] || 'Geral'}</span>
          {xpGained !== null && (
            <span className="text-[#4ade80] font-bold animate-bounce">+{xpGained} XP!</span>
          )}
        </div>

        <p className={s.questionText}>{question?.question}</p>

        <div className={s.optionsList}>
          {question?.options?.map((opt, i) => {
            let className = s.optionDefault;
            if (selected === i) className = s.optionSelected;
            if (feedback) {
              if (i === question.correct_index) className = "w-full text-left px-4 py-4 rounded-xl border-2 border-[#4ade80] text-white bg-[#1a3d2b]";
              else if (selected === i) className = "w-full text-left px-4 py-4 rounded-xl border-2 border-[#f87171] text-white bg-[#3d1a1a]";
              else className = s.optionDisabled;
            }

            return (
              <button 
                key={i} 
                className={className}
                onClick={() => handleAnswer(i)}
                disabled={!!feedback}
              >
                {opt}
              </button>
            );
          })}
          
          {(!question?.options || question.options.length === 0) && !loading && (
            <div className="text-center py-8 text-[#9ca3af] italic">
              Ocorreu um erro ao carregar as opções. Tente novamente.
            </div>
          )}
        </div>

        {feedback && (
          <div className={feedback.correct ? s.feedbackSuccess : s.feedbackError}>
            <p><strong>{feedback.correct ? 'Correto!' : 'Ops!'}</strong> {feedback.msg}</p>
          </div>
        )}

        {feedback && (
          <button className={s.nextBtn} onClick={fetchQuestion}>
            Próxima Questão IA →
          </button>
        )}
      </div>
    </div>
  );
}
