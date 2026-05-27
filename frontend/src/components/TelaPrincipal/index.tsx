import { NavLink } from "react-router-dom"
import { TelaPrincipalStyles as s } from "./TelaPrincipal"

interface Feature {
  id: number
  titulo: string
  descricao: string
}

const ComoFunciona: Feature[] = [
  {
    id: 1,
    titulo: "Chat com o Tutor",
    descricao: "Faça perguntas sobre qualquer conteúdo e receba respostas diretas, sem precisar procurar em vários lugares ao mesmo tempo.",
  },
  {
    id: 2,
    titulo: "Questionário de Nivelamento",
    descricao: "Ao entrar, você responde um questionário rápido que identifica seu nível atual e orienta quais temas focar primeiro.",
  },
  {
    id: 3,
    titulo: "Quizzes por Tema",
    descricao: "Pratique os conteúdos com exercícios e veja, ao final de cada quiz, quais questões errou e quais acertou.",
  },
  {
    id: 4,
    titulo: "Painel de Progresso",
    descricao: "Acompanhe seu desempenho ao longo do tempo: temas estudados, acertos, erros e os pontos que ainda precisam de atenção.",
  },
]

export default function TelaPrincipal() {

  return (
    <div className={s.container}>
      <div className={s.hero}>
        <h1 className={s.heroTitle}>TutorIA</h1>
        <p className={s.heroSubtitle}>
          Desenvolvido como protótipo acadêmico para auxiliar estudantes a estudar de forma organizada,
          com acompanhamento de progresso e exercícios práticos.
        </p>
        <div className={s.heroButtons}>
          <NavLink to="/signup" className={s.btnPrimary}>Criar conta</NavLink>
          <NavLink to="/login" className={s.btnOutline}>Entrar</NavLink>
        </div>
      </div>

      <div className={s.featuresSection}>
        <span className={s.featuresTitle}>O que você encontra aqui</span>
        <div className={s.featuresGrid}>
          {ComoFunciona.map((f) => (
            <div key={f.id} className={s.featureCard}>
              <p className={s.featureTitle}>{f.titulo}</p>
              <p className={s.featureText}>{f.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      <p className={s.footerNote}>Projeto acadêmico — A3 · Desenvolvido por estudantes</p>
    </div>
  )
}
