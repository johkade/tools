"use client"
import { MouseEvent, useState } from "react"
import { CaretRightIcon } from "./caret-right-icon"
import { SectionTitle } from "./section-title"
import { useHotKey } from "@/utils/use-hot-key"

const translations = {
  sectionTitle: {
    default: "Songwünsche abgeben",
  },
  recentWishes: {
    default: "Zuletzt gewünscht",
  },
  inputPlaceholder: {
    default: "Lied/Link eingeben",
  },
} as const

const initialWishes = [
  { name: "Twist and Shout by The Beatles" },
  { name: "Dancing Queen by ABBA" },
  { name: "Superstition by Stevie Wonder" },
  { name: "Sweet Caroline by Neil Diamond" },
]

export const SongWishes = () => {
  const [value, setValue] = useState("")

  const onSubmitWish = () => {
    if (!value || wishes.find((w) => w.name === value)) return
    setWishes((prev) => [...prev, { name: value }])
    setValue("")
  }

  const [wishes, setWishes] = useState(initialWishes)

  useHotKey(onSubmitWish, ["Enter", "CommandEnter"])

  return (
    <div className="flex flex-col">
      <SectionTitle
        title={translations.sectionTitle.default}
        className="mb-4 mt-10"
      />
      <div className="flex flex-row gap-4">
        <input
          type="text"
          className="flex focus:ring ring-[#7e766777] flex-1 outline-none px-3 py-2 rounded-md bg-[#f3e4cb] text-amber-950 placeholder-amber-950/50"
          value={value}
          placeholder={translations.inputPlaceholder.default}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmitWish}
          className="flex outline-none focus:ring ring-[#7e766777] rounded-md bg-[#f3e4cb] border-0 h-10 w-10 items-center justify-center"
        >
          <CaretRightIcon />
        </button>
      </div>
      <SectionTitle
        small
        title={translations.recentWishes.default}
        className="mb-2 mt-2"
      />
      <div className="flex flex-col gap-1">
        {wishes.map((w, index) => {
          if (index < wishes.length - 4) return null
          return (
            <p key={index} className="text-sm font-serif text-amber-950/80">
              ● {w.name}
            </p>
          )
        })}
      </div>
    </div>
  )
}
