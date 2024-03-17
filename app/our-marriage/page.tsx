import { Separator } from "../components/separator"
import { AreYouIn } from "./sections/are-you-in"
import { Banner } from "./sections/banner"
import { ContactForm } from "./sections/contact-form"
import { DressCode } from "./sections/dress-code"
import { FoodChoice } from "./sections/food-choice"
import { Intro } from "./sections/intro"
import { Location } from "./sections/location"
import { NotFound } from "./sections/not-found"
import { SongWishes } from "./sections/song-wishes"

type SearchParams = {
  guests: string | undefined
  locale: "de" | "en"
  [key: string]: string | string[] | undefined
}

export default function OurMarriage(props: { searchParams?: SearchParams }) {
  const guests = getGuests(props.searchParams)
  const locale = props.searchParams?.locale ?? "de"

  if (!guests?.length)
    return (
      <main className="flex min-h-screen flex-col bg-void pb-10">
        <Banner />
        <div className="w-full max-w-[600px] self-center min-h-10 mt-8 px-6">
          <NotFound />
        </div>
      </main>
    )
  return (
    <main className="flex min-h-screen flex-col bg-void pb-10">
      <Banner />
      <div className="w-full max-w-[600px] self-center min-h-10 mt-8 px-6">
        <Intro guests={guests} locale={locale} />
        <Separator />
        <AreYouIn guests={guests} locale={locale} />
        <Separator />
        <FoodChoice guests={guests} locale={locale} />
        <Separator />
        <Location locale={locale} />
        <Separator />
        <SongWishes guests={guests} locale={locale} />
        <Separator />
        <DressCode guests={guests} locale={locale} />
        <Separator />
        <ContactForm locale={locale} guests={guests} />
      </div>
    </main>
  )
}

function getGuests(params: SearchParams | undefined) {
  if (!params?.guests) return null
  return params.guests.split("-")
}
