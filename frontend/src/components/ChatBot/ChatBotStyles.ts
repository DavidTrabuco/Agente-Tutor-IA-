export const ChatBotStyles = {
  page:           "flex flex-col gap-4 p-4 bg-[#181818]",

  // Tutor header card
  tutorCard:      "flex items-center gap-3 bg-[#252525] rounded-2xl p-4",
  tutorAvatar:    "w-10 h-10 rounded-full bg-[#1a3d2b] flex items-center justify-center text-[#4ade80] font-bold text-sm flex-shrink-0",
  tutorInfo:      "flex flex-col gap-0.5",
  tutorName:      "text-white font-semibold text-sm m-0",
  tutorStatusRow: "flex items-center gap-1.5",
  onlineDot:      "w-2 h-2 rounded-full bg-[#4ade80] flex-shrink-0",
  onlineText:     "text-[#4ade80] text-xs",

  // Action buttons
  actionBtn:      "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border border-[#333] flex items-center gap-1.5",
  modeBtn:        "bg-[#1a3d2b] text-[#4ade80] border-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white",
  clearBtn:       "bg-[#3d1a1a] text-[#f87171] border-[#6b2121] hover:bg-[#6b2121] hover:text-white",

  // Messages area
  messagesCard:   "flex flex-col gap-5 bg-[#252525] rounded-2xl p-5",
  botRow:         "flex items-end gap-3",
  botAvatar:      "w-8 h-8 rounded-full bg-[#1a3d2b] flex items-center justify-center text-[#4ade80] text-xs flex-shrink-0",
  botBubble:      "flex flex-col gap-1 max-w-sm",
  botText:        "bg-[#2e2e2e] text-[#e5e7eb] text-sm px-4 py-3 rounded-2xl leading-relaxed m-0",
  messageTime:    "text-[#6b7280] text-xs px-1",
  botMessage:     "flex items-end gap-3",

  userRow:        "flex items-end gap-3 justify-end",
  userBubble:     "flex flex-col items-end gap-1 max-w-sm",
  userText:       "bg-[#2d6a4f] text-white text-sm px-4 py-3 rounded-2xl leading-relaxed m-0",
  userAvatar:     "w-8 h-8 rounded-full bg-[#2e2e2e] flex items-center justify-center text-[#9ca3af] text-xs flex-shrink-0",

  // Input area
  inputRow:       "flex items-center gap-3 bg-[#252525] rounded-2xl px-4 py-3",
  textInput:      "flex-1 bg-transparent text-[#d1d5db] text-sm placeholder:text-[#4b5563] outline-none border-none",
  sendBtn:        "w-8 h-8 rounded-lg border border-[#3a3a3a] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#555] transition-colors cursor-pointer bg-transparent flex-shrink-0",
}
