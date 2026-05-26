import { useState, useEffect, useRef } from "react";
import { useAuth } from "./useLogin";
import { useProgress } from "./useProgress";

interface Question {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

interface QuestionEntry {
  question: Question;
  selected: number | null;
  feedback: { correct: boolean; msg: string } | null;
}

export interface Topic {
  topic: string;
  reason: string;
  priority: 'high' | 'mid' | 'low';
}

export default function useQuiz() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const [history, setHistory] = useState<QuestionEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [currentSubject, setCurrentSubject] = useState<string>("");

  const historyIndexRef = useRef(historyIndex);
  historyIndexRef.current = historyIndex;

  const currentEntry = history[historyIndex] ?? null;
  const question = currentEntry?.question ?? null;
  const selected = currentEntry?.selected ?? null;
  const feedback = currentEntry?.feedback ?? null;

  const fetchQuestion = async (subject?: string) => {
    const resolvedSubject = subject ?? (currentSubject || user?.interests?.[0] || "Algoritmos");
    setLoading(true);
    setFetchError(false);
    setXpGained(null);
    try {
      const res = await fetch("http://localhost:5001/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: resolvedSubject, user_id: user?.id }),
      });
      const data = await res.json();
      if (!data.options || data.options.length === 0) throw new Error("Resposta inválida");
      const newEntry: QuestionEntry = { question: data, selected: null, feedback: null };
      const idx = historyIndexRef.current;
      setHistory(prev => [...prev.slice(0, idx + 1), newEntry]);
      setHistoryIndex(idx + 1);
    } catch (err) {
      console.error("Erro ao gerar questão:", err);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const subject = user.interests?.[0] || "Algoritmos";
      setCurrentSubject(subject);
      fetchQuestion(subject);
    }
  }, [user?.id]);

  const retry = () => fetchQuestion(currentSubject || user?.interests?.[0] || "Algoritmos");

  const selectTopic = (subject: string) => {
    setCurrentSubject(subject);
    fetchQuestion(subject);
  };

  const handleAnswer = async (index: number) => {
    if (feedback || !question) return;

    const correct = index === question.correct_index;
    const newFeedback = { correct, msg: question.explanation };

    setHistory(prev => {
      const updated = [...prev];
      updated[historyIndex] = { ...updated[historyIndex], selected: index, feedback: newFeedback };
      return updated;
    });

    if (correct) setSessionCorrect(c => c + 1);
    else setSessionWrong(c => c + 1);

    try {
      const res = await fetch("http://localhost:5001/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user?.id, correct, subject: currentSubject }),
      });
      await res.json();
      setXpGained(correct ? 50 : 10);
    } catch (err) {
      console.error("Erro ao salvar resposta:", err);
    }
  };

  const goToPrev = () => {
    if (historyIndex > 0) { setHistoryIndex(i => i - 1); setXpGained(null); }
  };

  const goToNext = () => {
    if (historyIndex < history.length - 1) { setHistoryIndex(i => i + 1); setXpGained(null); }
    else fetchQuestion();
  };

  const difficulties = progress?.difficulties || user?.difficulties || [];
  const interests = progress?.subjects?.map(s => s.name) || user?.interests || [];

  const nextTopics: Topic[] = (() => {
    const suggestions: Topic[] = [];
    if (sessionWrong > 0)
      suggestions.push({ topic: currentSubject, reason: 'Você errou questões aqui', priority: 'high' });
    difficulties
      .filter(d => d !== currentSubject)
      .forEach(d => suggestions.push({ topic: d, reason: 'Sua dificuldade cadastrada', priority: 'mid' }));
    interests
      .filter(i => i !== currentSubject && !difficulties.includes(i))
      .forEach(i => suggestions.push({ topic: i, reason: 'Baseado nos seus interesses', priority: 'low' }));
    return suggestions;
  })();

  return {
    progress,
    question, selected, feedback,
    loading, fetchError,
    xpGained,
    sessionCorrect, sessionWrong,
    historyIndex, currentSubject,
    nextTopics,
    handleAnswer, goToPrev, goToNext, selectTopic, retry,
  };
}
