import Image from "next/image"
import { CaretRightIcon } from "./caret-right-icon"
import { ContactForm } from "./contact-form"
import { LocationIcon } from "./location-icon"
import { SectionTitle } from "./section-title"
import { SongWishes } from "./song-wishes"

const translations = {
  title: { default: "31.08.2024 - save the date" },
  subTitle: { default: "A day to remember" },
  intro: {
    default:
      "Wir freuen uns, euch am 31.08.2024 in der Bleaml alm in Fichtelberg begrüßen zu dürfen, um gemeinsam mit euch unsere Hochzeit zu feiern. Ihr findet alle wichtigen Infos unten.",
  },
  location: {
    sectionTitle: {
      default: "Wo is die Feier?",
    },
  },
  songs: {
    sectionTitle: {
      default: "Songwünsche abgeben",
    },
  },
} as const

export default function OurMarriage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F4CE94] pb-10">
      <div className="flex relative flex-col items-center h-[300px] sm:h-[350px] md:h-[400px] md:py-4 lg:py-8">
        <Image
          className="absolute w-[120%] mx-auto h-full border border-red-500 blur-lg"
          src="/sunset_love.jpeg"
          alt="Image of Bekki and Johny standing in front of a sunset (how romantic)"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="flex relative w-full md:max-w-[600px] h-full">
          <Image
            className="flex relative md:rounded-2xl"
            src="/sunset_love.jpeg"
            alt="Image of Bekki and Johny standing in front of a sunset (how romantic)"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <div className="w-full max-w-[600px] self-center min-h-10 mt-8 px-6">
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-serif text-amber-950">
            {translations.title.default}
          </h1>
          <p className="text-base text-amber-950 font-serif">
            {translations.subTitle.default}
          </p>
        </div>

        <p className="text-base text-amber-950 font-serif mb-10">
          {translations.intro.default}
        </p>

        <SectionTitle
          title={translations.location.sectionTitle.default}
          className="mb-4"
        />
        <a
          target="_blank"
          className="group flex flex-row items-center gap-2"
          href="https://www.google.com/maps/place/Wirtshaus+zur+Bleaml+Alm/@50.0131302,11.8380752,19z/data=!3m1!4b1!4m6!3m5!1s0x47a1a8e0c785a561:0xe72bab9998fb96ff!8m2!3d50.0131302!4d11.8387203!16s%2Fg%2F1tlgwz8z?entry=ttu"
        >
          <LocationIcon />

          <p className="text-base text-[#312614] font-serif underline">
            Bleaml Alm, Neubau / Fichtelberg
          </p>
          <CaretRightIcon className="opacity-0 group-hover:opacity-100" />
        </a>
        <SongWishes />
        <ContactForm />
      </div>
    </main>
  )
}
