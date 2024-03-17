import { Typo } from "@/app/components/typo"
import { LocationIcon } from "../../components/location-icon"
import { SectionTitle } from "../../components/section-title"
import { CaretRightIcon } from "@/app/components/caret-right-icon"

const WEATHER_URL =
  "https://www.wetteronline.de/wetter/fichtelberg-bayern/neubau"

const translations = {
  dressCode: {
    sectionTitle: {
      single: { de: "Was soll ich anziehen?", en: "What should I wear?" },
      multiple: { de: "Was sollen wir anziehen?", en: "What should we wear?" },
    },
    weatherForecast: { de: "Wetterbericht", en: "Weather forecast" },
    line1: {
      single: {
        de: "🌺 Sommerlich-schick. ",
        en: "👙 We’re happy if you wear clothes - even more if it is a casual-chic summer attire.",
      },
      multiple: {
        de: "🌺 Sommerlich-schick. ",
        en: "👙 We’re happy if you wear clothes - even more if it is a casual-chic summer attire.",
      },
    },
    line2: {
      single: {
        de: "👠 Normale Schuhe für den Hinweg zur Alm oder einen Spaziergang. ",
        en: "👠 An extra pair of normal shoes might be good for a short walk.",
      },
      multiple: {
        de: "👠 Normale Schuhe für den Hinweg zur Alm oder einen Spaziergang. ",
        en: "👠 An extra pair of normal shoes might be good for a short walk.",
      },
    },
    line3: {
      single: {
        de: "⛅️ Feurig-heiß oder feucht-fröhlich? - Hier geht's zum Wetterbericht.",
        en: "⛅️ Hot and spicy or rainy and moist? - check the weather here.",
      },
      multiple: {
        de: "⛅️ Feurig-heiß oder feucht-fröhlich? - Hier geht's zum Wetterbericht.",
        en: "⛅️ Hot and spicy or rainy and moist? - check the weather here.",
      },
    },
  },
} as const

export interface LocationProps {
  locale: "de" | "en"
  guests: string[]
}

export const DressCode = ({ locale, guests }: LocationProps) => {
  const amount = guests.length > 1 ? "multiple" : "single"
  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.dressCode.sectionTitle[amount][locale]}
        className="mb-4 text-center"
      />
      <div className="flex flex-col gap-2 rounded-2xl bg-background p-4">
        <Typo size="3xl" className="text-center">
          {translations.dressCode.line1[amount][locale]}
        </Typo>
        <div className="w-6 my-2 h-[1px] bg-border-dark self-center" />
        <Typo size="3xl" className="text-center">
          {translations.dressCode.line2[amount][locale]}
        </Typo>
        <div className="w-6 my-2 h-[1px] bg-border-dark self-center" />
        <Typo size="3xl" className="text-center">
          {translations.dressCode.line3[amount][locale]}
        </Typo>
        <a
          href={WEATHER_URL}
          target="_blank"
          className="py-2 px-3 mt-3 rounded-xl border-2 border-border-dark self-center flex flex-row items-center gap-2 hover:bg-void hover:scale-95 transition-all"
        >
          <Typo size="3xl">
            {translations.dressCode.weatherForecast[locale]}
          </Typo>
          <CaretRightIcon />
        </a>
      </div>
    </div>
  )
}
