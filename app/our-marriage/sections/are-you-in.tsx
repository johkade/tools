"use client"
import { useEffect, useRef, useState } from "react"
import { SectionTitle } from "../../components/section-title"
import { cn } from "@/utils/styling"
import autoAnimate from "@formkit/auto-animate"
import { showToast } from "@/utils/toast"

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
  toasts: {
    single: {
      yes: [
        {
          de: "Hurra! Wir können es kaum erwarten, mit dir zu feiern! 🎉🥳",
          en: "Hooray! We can't wait to celebrate with you! 🎉🥳",
        },
        {
          de: "Fantastisch! Deine Anwesenheit macht unsere Hochzeit so viel cooler! ❄️😎",
          en: "Fantastic! Your presence makes our wedding so much cooler! ❄️😎",
        },
        {
          de: "Genial! Deine Zusage hat uns so sehr gefreut, dass wir fast den Kuchen vergessen haben. 🎂😄",
          en: "Brilliant! Your RSVP made us so happy, we almost forgot about the cake. 🎂😄",
        },
        {
          de: "Fantabulös! Deine Teilnahme lässt unsere Herzen vor Freude hüpfen! 💖🎈",
          en: "Fantabulous! Your attendance makes our hearts leap with joy! 💖🎈",
        },
        {
          de: "Yesss! Du bist wie das Sahnehäubchen auf unserem Hochzeitskuchen! 🍰🎉",
          en: "Yesss! You're like the icing on our wedding cake! 🍰🎉",
        },
      ],
      no: [
        {
          de: "Schade, dass du nicht dabei sein kannst. Wir werden jetzt einen Stuhl haben, der leer aussieht. 😔🪑",
          en: "Too bad you can't make it. Now we'll have one chair that looks lonely. 😔🪑",
        },
        {
          de: "Was?! Ohne dich wird die Party so lahm sein, dass selbst die Tischdecke gähnen wird. 😴🎊",
          en: "What?! Without you, the party will be so dull that even the tablecloth will yawn. 😴🎊",
        },
        {
          de: "Oh nein! Ohne dich wird die Stimmung so traurig sein, dass selbst die Blumen anfangen werden zu welken. 🥀😢",
          en: "Oh no! Without you, the mood will be so sad that even the flowers will start to wilt. 🥀😢",
        },
        {
          de: "Oh schade! Deine Absage ist wie eine Regenwolke über unserer Hochzeit. ☁️🌧️",
          en: "Oh darn! Your decline is like a raincloud over our wedding. ☁️🌧️",
        },
        {
          de: "Ach, wie schade! Ohne dich wird unsere Hochzeit so unvollständig sein wie ein Buch ohne Seiten. 📚🚫",
          en: "Oh, what a shame! Without you, our wedding will be as incomplete as a book without pages. 📚🚫",
        },
      ],
    },
    multiple: {
      yes: [
        {
          de: "Hurra! Wir können es kaum erwarten, mit euch zu feiern! 🎉🥳",
          en: "Hooray! We can't wait to celebrate with you! 🎉🥳",
        },
        {
          de: "Fantastisch! Eure Anwesenheit macht unsere Hochzeit so viel cooler! ❄️😎",
          en: "Fantastic! Your presence makes our wedding so much cooler! ❄️😎",
        },
        {
          de: "Genial! Eure Zusage hat uns so sehr gefreut, dass wir fast den Kuchen vergessen haben. 🎂😄",
          en: "Brilliant! Your RSVP made us so happy, we almost forgot about the cake. 🎂😄",
        },
        {
          de: "Fantabulös! Eure Teilnahme lässt unsere Herzen vor Freude hüpfen! 💖🎈",
          en: "Fantabulous! Your attendance makes our hearts leap with joy! 💖🎈",
        },
        {
          de: "Yesss! Ihr seid wie das Sahnehäubchen auf unserem Hochzeitskuchen! 🍰🎉",
          en: "Yesss! You're like the icing on our wedding cake! 🍰🎉",
        },
      ],
      no: [
        {
          de: "Schade, dass ihr nicht dabei sein könnt. Wir werden jetzt einen Stuhl haben, der leer aussieht. 😔🪑",
          en: "Too bad you can't make it. Now we'll have one chair that looks lonely. 😔🪑",
        },
        {
          de: "Was?! Ohne euch wird die Party so lahm sein, dass selbst die Tischdecke gähnen wird. 😴🎊",
          en: "What?! Without you, the party will be so dull that even the tablecloth will yawn. 😴🎊",
        },
        {
          de: "Oh nein! Ohne euch wird die Stimmung so traurig sein, dass selbst die Blumen anfangen werden zu welken. 🥀😢",
          en: "Oh no! Without you, the mood will be so sad that even the flowers will start to wilt. 🥀😢",
        },
        {
          de: "Oh schade! Eure Absage ist wie eine Regenwolke über unserer Hochzeit. ☁️🌧️",
          en: "Oh darn! Your decline is like a raincloud over our wedding. ☁️🌧️",
        },
        {
          de: "Ach, wie schade! Ohne euch wird unsere Hochzeit so unvollständig sein wie ein Buch ohne Seiten. 📚🚫",
          en: "Oh, what a shame! Without you, our wedding will be as incomplete as a book without pages. 📚🚫",
        },
      ],
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
          "flex flex-row gap-4 transition-all py-6 px-10 bg-background rounded-3xl",
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
            const message =
              translations.toasts[amount].yes[randomIntFromInterval(0, 4)][
                locale
              ]
            if (typeof message === "string") showToast(message)

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
            const message =
              translations.toasts[amount].no[randomIntFromInterval(0, 4)][
                locale
              ]
            if (typeof message === "string") showToast(message)
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

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
