export const OnboardingStyles = {
  container: "min-h-screen flex items-center justify-center bg-[#181818] p-4",
  card: "w-full max-w-2xl bg-[#252525] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#333]",
  stepIndicator: "flex gap-2 mb-8 justify-center",
  stepDot: "h-2 rounded-full transition-all duration-300",
  stepDotActive: "w-8 bg-[#4ade80]",
  stepDotInactive: "w-2 bg-[#4b5563]",
  
  title: "text-white text-3xl font-bold mb-2",
  description: "text-[#9ca3af] mb-8",
  
  optionsGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  optionButton: "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left",
  optionButtonSelected: "border-[#4ade80] bg-[#1a3d2b] text-white",
  optionButtonUnselected: "border-[#333] bg-[#1a1a1a] text-[#9ca3af] hover:border-[#4b5563]",
  
  icon: "text-2xl",
  label: "font-semibold",
  
  footer: "flex justify-between items-center mt-12",
  backButton: "text-[#9ca3af] hover:text-white font-medium transition-colors",
  nextButton: "bg-[#4ade80] hover:bg-[#22c55e] text-[#181818] px-8 py-3 rounded-xl font-bold transition-all transform active:scale-0.95 disabled:opacity-50 disabled:cursor-not-allowed",
}
