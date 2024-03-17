"use client"
import { Typo } from "@/app/components/typo"
import { capitalizeFirst } from "@/utils/misc"
import { cn } from "@/utils/styling"
import { showToast } from "@/utils/toast"
import { useState } from "react"
import { CaretRightIcon } from "../../components/caret-right-icon"
import { SectionTitle } from "../../components/section-title"

const translations = {
  sectionTitle: {
    single: { de: "Du hast Fragen?", en: "You've got questions?" },
    multiple: { de: "Ihr habt Fragen?", en: "You've got questions?" },
  },
  sendButton: {
    de: "Senden",
    en: "Send",
  },
  sent: {
    de: "Mit Liebe gesendet 💗",
    en: "Sent w/ love 💗",
  },
  inputPlaceholder: {
    single: {
      de: "Vielleicht hast du eine Unverträglichkeit oder wolltest uns nur mitteilen, wie sehr du dich freust?",
      en: "Maybe you're vegetarian or just want to tell us how much you're looking forward to partying with us?",
    },
    multiple: {
      de: "Vielleicht habt ihr eine Unverträglichkeit oder wolltet uns nur mitteilen, wie sehr ihr euch freut?",
      en: "Maybe you're vegetarian or just want to tell us how much you're looking forward to partying with us?",
    },
  },
} as const

export const ContactForm = ({
  locale,
  guests,
}: {
  locale: "de" | "en"
  guests: string[]
}) => {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const amount = guests.length > 1 ? "multiple" : "single"

  const onSubmit = async () => {
    if (!value) return

    try {
      setIsLoading(true)
      const author = guests.map((s) => capitalizeFirst(s)).join(" & ")
      await sendMessage({ author, text: value })
      await new Promise((resolve) => {
        setTimeout(resolve, 400)
      })
      showToast(translations.sent[locale])
      setValue("")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.sectionTitle[amount][locale]}
        className="mb-4 text-center"
      />
      <div className="flex flex-col gap-4 md:min-w-[520px] self-stretch md:self-center max-w-full">
        <textarea
          className="flex focus:ring ring-[#7e766777] flex-1 outline-none px-4 py-3 rounded-xl bg-background text-foreground-default min-h-[180px] placeholder-foreground-secondary text-3xl"
          value={value}
          placeholder={translations.inputPlaceholder[amount][locale]}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className={cn(
            "flex outline-none focus:ring ring-[#7e766777] rounded-md bg-background border-0 px-2 py-1 items-center justify-center self-end",
            isLoading && "opacity-30"
          )}
          disabled={isLoading}
        >
          <div className="flex flex-row items-center gap-2 text-[#44341c]">
            <Typo size="2xl">{translations.sendButton[locale]}</Typo>
            <CaretRightIcon className="scale-75" />
          </div>
        </button>
      </div>
    </div>
  )
}

async function sendMessage(data: { text: string; author: string }) {
  const resp = await fetch("/api/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (resp.status !== 200) throw new Error("FAILED")

  return resp.json()
}
