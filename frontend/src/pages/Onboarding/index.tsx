import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { OnboardingStyles as s } from '../../styles/OnboardingStyles';

const STEPS = [
  {
    id: 'education',
    title: 'Qual seu nível de ensino?',
    description: 'Isso ajuda a adaptar a complexidade das explicações.',
    options: [
      { id: 'Ensino Fundamental', label: 'Ensino Fundamental', icon: '🎒' },
      { id: 'Ensino Médio', label: 'Ensino Médio', icon: '🏫' },
      { id: 'Faculdade', label: 'Faculdade / Superior', icon: '🎓' },
      { id: 'Curso Técnico', label: 'Curso Técnico', icon: '🛠️' },
    ]
  },
  {
    id: 'interests',
    title: 'Qual área da computação mais te interessa?',
    description: 'Selecione as áreas que você deseja dominar.',
    multi: true,
    options: [
      { id: 'Inteligência Artificial', label: 'Inteligência Artificial', icon: '🤖' },
      { id: 'Desenvolvimento Web', label: 'Desenvolvimento Web', icon: '🌐' },
      { id: 'Backend', label: 'Backend', icon: '⚙️' },
      { id: 'Frontend', label: 'Frontend', icon: '🎨' },
      { id: 'Cibersegurança', label: 'Cibersegurança', icon: '🛡️' },
      { id: 'Games', label: 'Games', icon: '🎮' },
      { id: 'Ciência de Dados', label: 'Dados', icon: '📊' },
      { id: 'Cloud Computing', label: 'Cloud', icon: '☁️' },
      { id: 'Mobile', label: 'Mobile', icon: '📱' },
      { id: 'Redes', label: 'Redes', icon: '🔌' },
    ]
  },
  {
    id: 'difficulties',
    title: 'Com quais assuntos você possui mais dificuldade?',
    description: 'O TutorIA focará mais nesses temas para te ajudar.',
    multi: true,
    options: [
      { id: 'Recursividade', label: 'Recursividade', icon: '🔄' },
      { id: 'Ponteiros', label: 'Ponteiros', icon: '📍' },
      { id: 'Estrutura de Dados', label: 'Estrutura de Dados', icon: '🏗️' },
      { id: 'SQL', label: 'SQL', icon: '💾' },
      { id: 'Redes', label: 'Redes', icon: '🌐' },
      { id: 'Álgebra Linear', label: 'Álgebra Linear', icon: '📉' },
      { id: 'APIs', label: 'APIs', icon: '🔌' },
      { id: 'Algoritmos', label: 'Algoritmos', icon: '🧠' },
    ]
  },
  {
    id: 'learning_style',
    title: 'Como você aprende melhor?',
    description: 'O TutorIA usará o método mais eficiente para você.',
    options: [
      { id: 'Visual', label: 'Explicações visuais', icon: '🖼️' },
      { id: 'Prático', label: 'Exercícios práticos', icon: '⌨️' },
      { id: 'Teórico', label: 'Textos detalhados', icon: '📚' },
      { id: 'Rápido', label: 'Resumos rápidos', icon: '⚡' },
    ]
  },
  {
    id: 'goal',
    title: 'Qual seu objetivo principal?',
    description: 'Focaremos em resultados que importam para você.',
    options: [
      { id: 'Conseguir estágio', label: 'Conseguir estágio', icon: '💼' },
      { id: 'Melhorar notas', label: 'Melhorar notas', icon: '📈' },
      { id: 'Aprender programação', label: 'Aprender programação', icon: '🚀' },
      { id: 'Criar projetos', label: 'Criar projetos', icon: '🏗️' },
      { id: 'Trabalhar com IA', label: 'Trabalhar com IA', icon: '🤖' },
      { id: 'Virar Full Stack', label: 'Virar desenvolvedor Full Stack', icon: '🌟' },
    ]
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const step = STEPS[currentStep];

  const handleSelect = (optionId: string) => {
    if (step.multi) {
      const current = answers[step.id] || [];
      const updated = current.includes(optionId)
        ? current.filter((id: string) => id !== optionId)
        : [...current, optionId];
      setAnswers({ ...answers, [step.id]: updated });
    } else {
      setAnswers({ ...answers, [step.id]: optionId });
    }
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        await updateUser({
          education_level: answers.education,
          interests: answers.interests,
          difficulties: answers.difficulties,
          learning_style: answers.learning_style,
          goal: answers.goal,
          onboarded: true
        });
        navigate('/');
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
      }
    }
  };

  const isSelected = (optionId: string) => {
    if (step.multi) {
      return (answers[step.id] || []).includes(optionId);
    }
    return answers[step.id] === optionId;
  };

  const canContinue = step.multi 
    ? (answers[step.id] || []).length > 0 
    : !!answers[step.id];

  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.stepIndicator}>
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`${s.stepDot} ${i === currentStep ? s.stepDotActive : s.stepDotInactive}`} 
            />
          ))}
        </div>

        <h1 className={s.title}>{step.title}</h1>
        <p className={s.description}>{step.description}</p>

        <div className={s.optionsGrid}>
          {step.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`${s.optionButton} ${isSelected(opt.id) ? s.optionButtonSelected : s.optionButtonUnselected}`}
            >
              <span className={s.icon}>{opt.icon}</span>
              <span className={s.label}>{opt.label}</span>
            </button>
          ))}
        </div>

        <div className={s.footer}>
          <button 
            className={s.backButton}
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
          >
            Voltar
          </button>
          <button
            className={s.nextButton}
            disabled={!canContinue}
            onClick={handleNext}
          >
            {currentStep === STEPS.length - 1 ? 'Começar' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  );
}
