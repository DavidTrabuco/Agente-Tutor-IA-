export const QuizStyles = {
  page:            "flex flex-col gap-4 p-4 bg-[#181818]",
  quizCard:        "flex flex-col gap-5 bg-[#252525] rounded-2xl p-6",

  
  progressBg:      "w-full h-1 bg-[#333] rounded-full",
  progressFill:    "h-1 bg-[#4ade80] rounded-full",

  
  quizHeader:      "flex items-center justify-between",
  subjectBadge:    "px-3 py-1 rounded-full border border-[#4ade80] text-[#4ade80] text-xs font-medium",
  questionCounter: "text-[#9ca3af] text-sm",

  
  questionText:    "text-white font-semibold text-base leading-snug m-0",

  
  optionsList:     "flex flex-col gap-2",
  optionDefault:   "w-full text-left px-4 py-4 rounded-xl border border-[#3a3a3a] text-[#9ca3af] text-sm hover:border-[#555] hover:text-white transition-colors cursor-pointer bg-transparent",
  optionSelected:  "w-full text-left px-4 py-4 rounded-xl border border-white text-white text-sm font-medium cursor-pointer bg-transparent",
  optionDisabled:  "w-full text-left px-4 py-4 rounded-xl border border-[#2a2a2a] text-[#444] text-sm cursor-default bg-transparent",

  
  feedbackError:   "flex items-start gap-2 bg-[#2d0e0e] border border-[#5a1a1a] rounded-xl p-4 text-[#fca5a5] text-sm leading-relaxed",
  feedbackSuccess: "flex items-start gap-2 bg-[#0d2218] border border-[#1a4a30] rounded-xl p-4 text-[#4ade80] text-sm leading-relaxed",

 
  nextBtn:         "w-full py-4 rounded-xl border border-[#3a3a3a] text-white text-sm font-semibold text-center hover:border-[#666] transition-colors cursor-pointer bg-transparent",
}
