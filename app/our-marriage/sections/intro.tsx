import { Typo } from "@/app/components/typo"
import { capitalizeFirst } from "@/utils/misc"

const translations = {
  intro: {
    de: "Wir freuen uns, euch am 31.08.2024 in der Bleaml Alm in Fichtelberg begrüßen zu dürfen, um gemeinsam mit euch unsere Hochzeit zu feiern. Ihr findet alle wichtigen Infos unten.",
    en: "We are pleased to welcome you on 31.08.2024 at Bleaml Alm in Fichtelberg to celebrate our wedding together with you. You will find all important information below.",
  },
} as const

export interface IntroProps {
  guests: string[]
  locale: "de" | "en"
}

export const Intro = ({ guests, locale }: IntroProps) => {
  return (
    <div className="mb-10">
      <Typo as="h1" size="6xl" className="text-center">
        {getTitle(guests, locale)}
      </Typo>

      <Typo size="4xl" className="text-center">
        {translations.intro[locale]}
      </Typo>
    </div>
  )
}

function getGender(name: string) {
  if (["thomas"].includes(name.toLowerCase())) return "male"

  return "female"
}
function getTitle(guests: string[], locale: "de" | "en") {
  const isSingle = guests.length <= 1
  const name1 = capitalizeFirst(guests[0])
  const name2 = capitalizeFirst(guests[1])
  const gender1 = getGender(name1)
  const gender2 = getGender(name2)

  if (isSingle) {
    if (gender1 === "female") {
      return locale === "de" ? `Liebe ${name1}!` : `Dear ${name1}!`
    } else {
      return locale === "de" ? `Lieber ${name1}!` : `Dear ${name1}!`
    }
  } else {
    let greeting = ""

    if (gender1 === "female") {
      greeting += locale === "de" ? `Liebe ${name1},` : `Dear ${name1},`
    } else {
      greeting += locale === "de" ? `Lieber ${name1},` : `Dear ${name1},`
    }

    if (gender2 === "female") {
      greeting += locale === "de" ? ` liebe ${name2}!` : ` dear ${name2}!`
    } else {
      greeting += locale === "de" ? ` lieber ${name2}!` : ` dear ${name2}!`
    }

    return greeting
  }
}
