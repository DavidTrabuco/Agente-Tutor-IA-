import { useQuestionario } from '../../hooks/useQuestionario';
import { OnboardingStyles as s } from './QuestionarioStyles';


export default function Onboarding() {
  const {
    step,
    currentStep,
    totalSteps,
    isLastStep,
    canContinue,
    handleSelect,
    handleNext,
    handleBack,
    isSelected
  } = useQuestionario();


 

return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.stepIndicator}>
          {Array.from({ length: totalSteps }).map((_, i) => (
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
            onClick={handleBack}
            style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
          >
            Voltar
          </button>
          <button
            className={s.nextButton}
            disabled={!canContinue}
            onClick={handleNext}
          >
            {isLastStep ? 'Começar' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  );
}
