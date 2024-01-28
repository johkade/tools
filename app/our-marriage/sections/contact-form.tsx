"use client"
import { useState } from "react"
import { CaretRightIcon } from "../../components/caret-right-icon"
import { SectionTitle } from "../../components/section-title"
import { Typo } from "@/app/components/typo"

const translations = {
  sectionTitle: {
    de: "Du hast Fragen?",
    en: "You've got questions?",
  },
  sendButton: {
    de: "Senden",
    en: "Send",
  },
  inputPlaceholder: {
    de: "Vielleicht hast du eine Unverträglichkeit oder wolltest uns nur mitteilen, wie sehr du dich freust?",
    en: "Maybe you're vegetarian or just want to tell us how much you're looking forward to partying with us?",
  },
} as const

export const ContactForm = ({ locale }: { locale: "de" | "en" }) => {
  const [value, setValue] = useState("")
  const onSubmit = () => {
    if (!value) return
    setValue("")
  }

  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.sectionTitle[locale]}
        className="mb-4 text-center"
      />
      <div className="flex flex-col gap-4 min-w-[520px] max-w-full">
        <textarea
          className="flex focus:ring ring-[#7e766777] flex-1 outline-none px-4 py-3 rounded-xl bg-background text-foreground-default min-h-[180px] placeholder-foreground-secondary text-3xl"
          value={value}
          placeholder={translations.inputPlaceholder[locale]}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="flex outline-none focus:ring ring-[#7e766777] rounded-md bg-background border-0 px-2 py-1 items-center justify-center self-end"
        >
          <div className="flex flex-row gap-2 text-[#44341c]">
            <Typo>{translations.sendButton[locale]}</Typo>
            <CaretRightIcon className="scale-75" />
          </div>
        </button>
      </div>
    </div>
  )
}
