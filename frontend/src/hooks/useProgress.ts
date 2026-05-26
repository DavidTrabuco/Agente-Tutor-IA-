import { useState, useEffect } from 'react';
import { useAuth } from './useLogin';

export interface ProgressData {
  xp: number;
  streak: number;
  time_studied: string;
  subjects: Array<{ name: string; percent: number }>;
  difficulties: string[];
}

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5001/progress/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setProgress(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erro ao carregar progresso:", err);
          setLoading(false);
        });
    }
  }, [user]);

  return { progress, loading };
}
