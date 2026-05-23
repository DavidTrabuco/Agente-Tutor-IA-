import { useState, useEffect, useRef } from 'react'
import { ChatBotStyles as s } from '../../styles/ChatBotStyles'
import { useTutor } from '../../hooks/useTutor'

export default function ChatBot() {
  const [mode, setMode] = useState<'tutor' | 'professor'>('tutor')
  const { messages, loading, sendMessage, clearHistory } = useTutor(mode)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    if (!input.trim() || loading) return
    sendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={s.page}>

      <div className={s.tutorCard}>
        <div className={s.tutorAvatar}>✦</div>
        <div className={s.tutorInfo}>
          <p className={s.tutorName}>Tutor IA</p>
          <div className={s.tutorStatusRow}>
            <span className={s.onlineDot} />
            <span className={s.onlineText}>
              {mode === 'tutor' ? 'Modo Tutor (Explicações)' : 'Modo Professor (Socrático)'}
            </span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => { setMode(mode === 'tutor' ? 'professor' : 'tutor'); clearHistory(); }}
              className={`${s.actionBtn} ${s.modeBtn}`}
            >
              🔄 {mode === 'tutor' ? 'Modo Professor' : 'Modo Tutor'}
            </button>
            <button
              onClick={clearHistory}
              className={`${s.actionBtn} ${s.clearBtn}`}
            >
              🗑️ Limpar
            </button>
          </div>
        </div>

      <div className={s.messagesCard}>
        <div className={s.botRow}>
          <div className={s.botAvatar}>✦</div>
          <div className={s.botBubble}>
            <p className={s.botText}>Olá! Sou seu Tutor IA da UNIFACS. Como posso te ajudar hoje?</p>
          </div>
        </div>

        {messages.map((msg, i) =>
          msg.role === 'assistant' ? (
            <div key={i} className={s.botRow}>
              <div className={s.botAvatar}>✦</div>
              <div className={s.botBubble}>
                <p className={s.botText}>{msg.content}</p>
              </div>
            </div>
          ) : (
            <div key={i} className={s.userRow}>
              <div className={s.userBubble}>
                <p className={s.userText}>{msg.content}</p>
              </div>
            </div>
          )
        )}

        {loading && (
          <div className={s.botRow}>
            <div className={s.botAvatar}>✦</div>
            <div className={s.botBubble}>
              <p className={s.botText}>Digitando...</p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className={s.inputRow}>
        <input
          className={s.textInput}
          type="text"
          placeholder="Digite sua dúvida..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className={s.sendBtn} onClick={handleSend} disabled={loading}>
          →
        </button>
      </div>

    </div>
  )
}
