"use client"
import { useState } from "react"
import { CaretRightIcon } from "./caret-right-icon"
import { SectionTitle } from "./section-title"

const translations = {
  sectionTitle: {
    default: "Du hast Fragen?",
  },
  inputPlaceholder: {
    default:
      "Vielleicht hast du eine Unverträglichkeit oder wolltest uns nur mitteilen, wie sehr du dich freust?",
  },
} as const

export const ContactForm = () => {
  const [value, setValue] = useState("")
  const onSubmit = () => {
    if (!value) return
    setValue("")
  }

  return (
    <div className="flex flex-col">
      <SectionTitle
        title={translations.sectionTitle.default}
        className="mb-4 mt-10"
      />
      <div className="flex flex-col gap-4">
        <textarea
          className="flex focus:ring ring-[#7e766777] flex-1 outline-none px-3 py-2 rounded-md bg-[#f3e4cb] text-amber-950 min-h-[180px] placeholder-amber-950/50"
          value={value}
          placeholder={translations.inputPlaceholder.default}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="flex outline-none focus:ring ring-[#7e766777] rounded-md bg-[#f3e4cb] border-0 px-2 py-1 items-center justify-center self-end"
        >
          <div className="flex flex-row gap-2 text-[#44341c]">
            Send
            <CaretRightIcon />
          </div>
        </button>
      </div>
    </div>
  )
}
