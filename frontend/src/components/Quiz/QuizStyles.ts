export const QuizStyles = {
  page:            "h-full overflow-hidden flex flex-col gap-3 p-4 bg-[#181818]",
  quizCard:        "flex flex-col gap-2 bg-[#252525] rounded-2xl p-4",

  
  progressBg:      "w-full h-1 bg-[#333] rounded-full",
  progressFill:    "h-1 bg-[#4ade80] rounded-full",

  
  quizHeader:      "flex items-center justify-between shrink-0",
  subjectBadge:    "px-3 py-1 rounded-full border border-[#4ade80] text-[#4ade80] text-xs font-medium",
  questionCounter: "text-[#9ca3af] text-sm",

  
  questionRow:     "flex items-start justify-between gap-3 shrink-0",
  questionText:    "text-white font-semibold text-base leading-snug m-1 flex-1",

  
  optionsList:     "flex flex-col gap-1.5",
  optionDefault:   "w-full text-left px-4 py-3 rounded-xl border border-[#3a3a3a] text-[#9ca3af] text-sm hover:border-[#555] hover:text-white transition-colors cursor-pointer bg-transparent",
  optionSelected:  "w-full text-left px-4 py-3 rounded-xl border border-white text-white text-sm font-medium cursor-pointer bg-transparent",
  optionDisabled:  "w-full text-left px-4 py-3 rounded-xl border border-[#2a2a2a] text-[#444] text-sm cursor-default bg-transparent",

  
  feedbackError:   "flex items-start gap-2 bg-[#2d0e0e] border border-[#5a1a1a] rounded-xl p-4 text-[#fca5a5] text-sm leading-relaxed",
  feedbackSuccess: "flex items-start gap-2 bg-[#0d2218] border border-[#1a4a30] rounded-xl p-4 text-[#4ade80] text-sm leading-relaxed",

 
  nextBtn:         "w-full py-4 rounded-xl border border-[#3a3a3a] text-white text-sm font-semibold text-center hover:border-[#666] transition-colors cursor-pointer bg-transparent",

  navButtons:          "flex gap-1 shrink-0 items-center",
  buttonPrevQuestion:  "px-6 py-3 rounded-lg border border-[#3a3a3a] text-[#9ca3af] text-xs hover:border-[#555] hover:text-white transition-colors cursor-pointer bg-transparent",
  buttonNextQuestion:  "px-6 py-3 rounded-lg border border-[#4ade80] text-[#4ade80] text-xs hover:bg-[#4ade80] hover:text-black transition-colors cursor-pointer bg-transparent",

  statsCard:       "flex bg-[#252525] rounded-2xl p-5 gap-0",
  statItem:        "flex-1 flex flex-col items-center gap-1",
  statValue:       "text-white font-bold text-xl",
  statLabel:       "text-[#9ca3af] text-xs",
  statDivider:     "w-px bg-[#333] my-1",

  nextTopicsCard:      "flex flex-col gap-2 bg-[#252525] rounded-2xl p-4 max-h-44 overflow-y-auto",
  nextTopicsTitle:     "text-white font-semibold text-sm shrink-0",
  nextTopicItem:       "flex items-center justify-between px-3 py-2 rounded-xl bg-[#1e1e1e] border border-[#2e2e2e]",
  nextTopicName:       "text-white text-sm font-medium",
  nextTopicReason:     "text-[#9ca3af] text-xs",
  nextTopicBadgeHigh:  "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#3d1a1a] text-[#f87171]",
  nextTopicBadgeMid:   "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2a1a3d] text-[#a855f7]",
  nextTopicBadgeLow:   "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1a2a3d] text-[#60a5fa]",
}
