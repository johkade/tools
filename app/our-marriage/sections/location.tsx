import { Typo } from "@/app/components/typo"
import { CaretRightIcon } from "../../components/caret-right-icon"
import { LocationIcon } from "../../components/location-icon"
import { SectionTitle } from "../../components/section-title"

const mapsUrl =
  "https://www.google.com/maps/place/Wirtshaus+zur+Bleaml+Alm/@50.0131302,11.8380752,19z/data=!3m1!4b1!4m6!3m5!1s0x47a1a8e0c785a561:0xe72bab9998fb96ff!8m2!3d50.0131302!4d11.8387203!16s%2Fg%2F1tlgwz8z?entry=ttu"

const translations = {
  location: {
    sectionTitle: {
      de: "Wo is die Feier?",
      en: "Where do we celebrate?",
    },
  },
} as const

export interface LocationProps {
  locale: "de" | "en"
}

export const Location = ({ locale }: LocationProps) => {
  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.location.sectionTitle[locale]}
        className="mb-4 text-center"
      />
      <a
        target="_blank"
        className="group flex flex-col justify-center items-center gap-2 bg-background hover:ring ring-gray-400/40 p-4 rounded-3xl"
        href={mapsUrl}
      >
        <LocationIcon className="group-hover:translate-y-[-4px] transition-all" />

        <Typo
          size="3xl"
          className="group-hover:translate-y-[-4px] transition-all delay-100"
        >
          Bleaml Alm, Neubau / Fichtelberg
        </Typo>
      </a>
    </div>
  )
}
