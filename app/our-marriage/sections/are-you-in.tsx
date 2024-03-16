"use client"
import { useEffect, useRef, useState } from "react"
import { SectionTitle } from "../../components/section-title"
import { cn } from "@/utils/styling"
import autoAnimate from "@formkit/auto-animate"

const translations = {
  areYouIn: {
    sectionTitle: {
      multiple: {
        de: "Seid ihr dabei?",
        en: "Are you in?",
      },
      single: {
        de: "Bist du dabei?",
        en: "Are you in?",
      },
    },
    yes: {
      de: "Natürlich",
      en: "Absolutely, mate!",
    },
    no: {
      de: "Leider nein",
      en: "Sadly, no",
    },
  },
} as const

export interface AreYouInProps {
  locale: "de" | "en"
  guests: string[]
}

export const AreYouIn = ({ locale, guests }: AreYouInProps) => {
  const [isIn, setIsIn] = useState<"yes" | "no" | null>(null)
  const animatedParent = useRef<HTMLDivElement>(null)

  const by = guests.join("-")

  const amount = guests.length > 1 ? "multiple" : "single"

  useEffect(() => {
    getAreYouIn(by)
      .then((data) => setIsIn(data === null ? null : data ? "yes" : "no"))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    animatedParent.current && autoAnimate(animatedParent.current)
  }, [animatedParent])

  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.areYouIn.sectionTitle[amount][locale]}
        className="mb-4 text-center"
      />
      <div
        className={cn(
          "flex flex-row gap-4 transition-all",
          isIn === "yes"
            ? "translate-x-16"
            : isIn === "no"
            ? "-translate-x-16"
            : ""
        )}
        ref={animatedParent}
      >
        <button
          onClick={() => {
            if (isIn === "yes") return
            sendAreYouIn(by, true).catch(() => {})
            setIsIn("yes")
          }}
          className={cn(
            "flex flex-col text-3xl text-foreground-default border-2 border-border-dark rounded-2xl px-3 py-2 bg-[#ebd892] transition-all",
            isIn === "yes"
              ? "scale-125"
              : isIn === "no"
              ? "scale-75 opacity-75"
              : ""
          )}
        >
          {translations.areYouIn.yes[locale]}
        </button>
        <button
          onClick={() => {
            if (isIn === "no") return
            sendAreYouIn(by, false).catch(() => {})
            setIsIn("no")
          }}
          className={cn(
            "flex flex-col text-3xl text-foreground-default border-2 border-border-dark rounded-2xl px-3 py-2 bg-[#e49f7d] transition-all",
            isIn === "yes"
              ? "scale-75 opacity-75"
              : isIn === "no"
              ? "scale-125"
              : ""
          )}
        >
          {translations.areYouIn.no[locale]}
        </button>
      </div>
    </div>
  )
}

async function getAreYouIn(by: string) {
  const resp = await fetch(`/api/are-you-in?by=${by}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  if (resp.status !== 200) throw new Error("FAILED")

  const data = await resp.json()
  try {
    return data.data[0].isIn
  } catch (error) {
    return null
  }
}

async function sendAreYouIn(by: string, isIn: boolean) {
  const resp = await fetch(`/api/are-you-in`, {
    method: "POST",
    body: JSON.stringify({ isIn, by }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  if (resp.status !== 200) throw new Error("FAILED")

  return
}
