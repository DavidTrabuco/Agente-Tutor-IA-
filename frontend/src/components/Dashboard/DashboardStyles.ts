export const TelaPrincipalStyles = {
  page:            "h-full overflow-hidden flex flex-col gap-3 p-4 bg-[#181818]",

  // Greeting card
  greetingCard:    "flex items-center gap-4 bg-[#252525] rounded-2xl p-5 transform hover:scale-[1.02] transition-transform",
  greetingAvatar:  "w-14 h-14 rounded-full bg-[#2e2e2e] flex items-center justify-center text-[#9ca3af] text-2xl flex-shrink-0",
  greetingContent: "flex flex-col gap-1",
  greetingTitle:   "text-white text-lg font-semibold m-0",
  greetingSubtitle:"text-[#9ca3af] text-sm leading-relaxed m-0",

  // Stats row
  statsRow:        "grid grid-cols-3 gap-3",
  statCard:        "flex flex-col items-center gap-2 bg-[#252525] rounded-2xl p-5 transform hover:scale-[1.02] transition-transform",
  statIcon:        "text-xl",
  statValue:       "text-white text-3xl font-bold m-0",
  statLabel:       "text-[#6b7280] text-xs text-center m-0",

  // Skills map
  skillsMapCard:   "flex-1 min-h-1 p-3 bg-[#252525] rounded-2xl flex flex-col",
  skillsMapTitle:  "text-[#6b7280] text-xs font-bold tracking-widest uppercase mb-2 shrink-0",
  skillsMapList:   "flex-1 flex flex-col justify-between p-4",
  skillRow:        "flex items-center gap-3",
  skillName:       "text-white text-xm w-35 p-2 font-bold S",
  skillBars:       "flex-1 flex gap-1",
  skillBar:        "h-1.5 flex-1 rounded-sm",

  // Subjects section
  subjectsSection: "flex flex-col gap-2",
  sectionHeading:  "text-[#6b7280] text-xs font-bold tracking-widest uppercase m-0",
  subjectsGrid:    "grid grid-cols-2 gap-2",
  subjectCard:     "flex flex-col gap-2 bg-[#252525] rounded-2xl p-3 transform hover:scale-[1.01] transition-transform",
  subjectHeader:   "flex items-center gap-2",
  subjectIcon:     "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0",
  subjectInfo:     "flex flex-col gap-0.5",
  subjectName:     "text-white text-xs font-semibold m-0",
  subjectPercent:  "text-[#9ca3af] text-xs m-0",
  progressBg:      "w-full h-1 bg-[#333] rounded-full",
  progressFill:    "h-1 rounded-full",
  subjectsEmpty:   "p-4 bg-[#252525] rounded-2xl text-center text-[#9ca3af] text-sm italic",

  // Loading
  loading:         "p-8 text-white",

  // Difficulties card
  difficultiesCard:  "shrink-0 p-3 bg-[#2a1a1a] rounded-2xl border border-[#451a1a]",
  difficultiesTitle: "text-[#f87171] text-xs font-bold uppercase tracking-wider mb-1",
  difficultiesText:  "text-white text-xs",
}
