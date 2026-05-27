export const TelaPrincipalStyles = {
  page:            "flex flex-col gap-4 p-4 bg-[#181818]",

  // Greeting card
  greetingCard:    "flex items-center gap-4 bg-[#252525] rounded-2xl p-5 transform hover:scale-[1.02] transition-transform",
  greetingAvatar:  "w-14 h-14 rounded-full bg-[#2e2e2e] flex items-center justify-center text-[#9ca3af] text-2xl flex-shrink-0",
  greetingContent: "flex flex-col gap-1",
  greetingTitle:   "text-white text-lg font-semibold m-0",
  greetingSubtitle:"text-[#9ca3af] text-sm leading-relaxed m-0",

  
  statsRow:        "grid grid-cols-3 gap-3",
  statCard:        "flex flex-col items-center gap-2 bg-[#252525] rounded-lg p-5 transform hover:scale-[1.01] transition-transform",
  statIcon:        "text-xl",
  statValue:       "text-white text-3xl font-bold m-0",
  statLabel:       "text-[#6b7280] text-xs text-center m-0",

 
  skillsMapCard:   "p-6 bg-[#252525] rounded-xl",
  skillsMapTitle:  "text-[#6b7280] text-xs font-bold tracking-widest uppercase mb-4",
  skillsMapList:   "space-y-4",
  skillRow:        "flex items-center gap-4",
  skillName:       "text-white text-xs w-20",
  skillBars:       "flex-1 flex gap-1",
  skillBar:        "h-2 flex-1 rounded-sm",

 
  subjectsSection: "flex flex-col gap-3",
  sectionHeading:  "text-[#6b7280] text-xs font-bold tracking-widest uppercase m-0",
  subjectsGrid:    "grid grid-cols-2 gap-3",
  subjectCard:     "flex flex-col gap-3 bg-[#252525] rounded-lg p-4 transform hover:scale-[1.02] transition-transform",
  subjectHeader:   "flex items-center gap-3",
  subjectIcon:     "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0",
  subjectInfo:     "flex flex-col gap-0.5",
  subjectName:     "text-white text-sm font-semibold m-0",
  subjectPercent:  "text-[#9ca3af] text-xs m-0",
  progressBg:      "w-full h-1.5 bg-[#333] rounded-full",
  progressFill:    "h-1.5 rounded-full",
  subjectsEmpty:   "p-8 bg-[#252525] rounded-2xl text-center text-[#9ca3af] text-sm italic",

  // Loading
  loading:         "p-8 text-white",

  // Difficulties card
  difficultiesCard:  "p-4 bg-[#2a1a1a] rounded-m border border-[#451a1a]",
  difficultiesTitle: "text-[#f87171] text-xs font-bold uppercase tracking-wider mb-2",
  difficultiesText:  "text-white text-sm",
}
