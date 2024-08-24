"use client"
import { Typo } from "@/app/components/typo"
import { cn } from "@/utils/styling"
import { showToast } from "@/utils/toast"
import autoAnimate from "@formkit/auto-animate"
import { useEffect, useRef, useState } from "react"
import { SectionTitle } from "../../components/section-title"

const translations = {
  foodChoice: {
    sectionTitle: {
      multiple: {
        de: "'Season everything with love'",
        en: "'Season everything with love'",
      },
      single: {
        de: "'Season everything with love'",
        en: "'Season everything with love'",
      },
    },
    subTitle: {
      multiple: {
        de: "Ihr könnt euer Gericht vor Ort auswählen. zur Auswahl stehen Fleisch, Fisch und Veggie.",
        en: "Select your meal on site, you can choose between meat, fish and veggie.",
      },
      single: {
        de: "Du kannst dein Gericht vor Ort auswählen. zur Auswahl stehen Fleisch, Fisch und Veggie",
        en: "Select your meal on site, you can choose between meat, fish and veggie.",
      },
    },
  },
  toasts: [
    {
      de: "Gute Wahl - das wird bestimmt lecker!",
      en: "Great choice - that'll be yums!",
    },
  ],
} as const

export interface FoodChoiceProps {
  locale: "de" | "en"
  guests: string[]
}

export const FoodChoice = ({ locale, guests }: FoodChoiceProps) => {
  const [food, setFood] = useState<null | string[]>(null)
  const animatedParent = useRef<HTMLDivElement>(null)

  const by = guests.join("-")

  const amount = guests.length > 1 ? "multiple" : "single"
  const maxAmount = guests.length

  useEffect(() => {
    getFoodChoices(by)
      .then((data) => setFood(data))
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    animatedParent.current && autoAnimate(animatedParent.current)
  }, [animatedParent])

  const onSelect = (foodItem: "meat" | "fish" | "veggie") => {
    const message = translations.toasts[randomIntFromInterval(0, 0)][locale]
    if (typeof message === "string") showToast(message)

    const newChoices = !food
      ? [foodItem]
      : [...food, foodItem].slice(-maxAmount)

    sendFoodChoices(by, newChoices).catch(() => {})
    setFood(newChoices)
  }

  const meatAmount = food?.filter((f) => f === "meat")?.length ?? 0
  const fishAmount = food?.filter((f) => f === "fish")?.length ?? 0
  const veggieAmount = food?.filter((f) => f === "veggie")?.length ?? 0

  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.foodChoice.sectionTitle[amount][locale]}
        className="mb-4 text-center"
      />
      <Typo size="3xl" className="mb-4 text-center">
        {translations.foodChoice.subTitle[amount][locale]}
      </Typo>
      <div className="bg-background rounded-3xl flex flex-col">
        <div className={cn("flex flex-row gap-4 pt-4 px-6")}>
          <button
            onClick={() => onSelect("meat")}
            className={cn(
              "flex flex-col text-2xl text-foreground-default border-2 border-border-dark rounded-2xl px-3 pb-1 pt-2 bg-[#ebd892] hover:opacity-80 transition-all"
            )}
          >
            🥩
          </button>
          <button
            onClick={() => onSelect("fish")}
            className={cn(
              "flex flex-col text-2xl text-foreground-default border-2 border-border-dark rounded-2xl px-3 pb-1 pt-2 bg-[#ebd892] hover:opacity-80 transition-all"
            )}
          >
            🐟
          </button>
          <button
            onClick={() => onSelect("veggie")}
            className={cn(
              "flex flex-col text-2xl text-foreground-default border-2 border-border-dark rounded-2xl px-3 pb-1 pt-2 bg-[#ebd892] hover:opacity-80 transition-all"
            )}
          >
            🥦
          </button>
        </div>
        <div
          className={cn("flex flex-row pb-2 px-3 rounded-3xl")}
          ref={animatedParent}
        >
          <div className="flex-1 items-center">
            <Typo
              size="4xl"
              className={cn("text-center", !meatAmount && "opacity-0")}
            >
              {Array.from({ length: meatAmount || 1 })
                .fill("X")
                .join("")}
            </Typo>
          </div>
          <div className="flex-1 items-center">
            <Typo
              size="4xl"
              className={cn("text-center", !fishAmount && "opacity-0")}
            >
              {Array.from({ length: fishAmount || 1 })
                .fill("X")
                .join("")}
            </Typo>
          </div>
          <div className="flex-1 items-center">
            <Typo
              size="4xl"
              className={cn("text-center", !veggieAmount && "opacity-0")}
            >
              {Array.from({ length: veggieAmount || 1 })
                .fill("X")
                .join("")}
            </Typo>
          </div>
        </div>
      </div>
    </div>
  )
}

async function getFoodChoices(by: string) {
  const resp = await fetch(`/api/food?by=${by}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  if (resp.status !== 200) throw new Error("FAILED")

  const data = await resp.json()
  try {
    return data.data[0].food.split(",")
  } catch (error) {
    return null
  }
}

async function sendFoodChoices(by: string, food: string[]) {
  const resp = await fetch(`/api/food`, {
    method: "POST",
    body: JSON.stringify({ food: food.join(","), by }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  if (resp.status !== 200) throw new Error("FAILED")

  return
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
