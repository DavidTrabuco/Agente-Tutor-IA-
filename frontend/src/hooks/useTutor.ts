import { useState } from "react";
import { useAuth } from "../context/AuthContext";

type Message = { role: "user" | "assistant"; content: string }

export function useTutor(subject = "Algoritmos", mode = "tutor") {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(userText: string) {
    const updatedHistory: Message[] = [
      ...messages,
      { role: "user", content: userText },
    ];
    setMessages(updatedHistory);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: updatedHistory, 
          subject,
          mode,
          user_id: user?.id || "1"
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      console.error("Erro ao chamar o backend:", err);
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    setMessages([]);
  }

  return { messages, loading, sendMessage, clearHistory };
}

