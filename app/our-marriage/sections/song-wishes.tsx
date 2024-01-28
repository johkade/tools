"use client"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { CaretRightIcon } from "../../components/caret-right-icon"
import { SectionTitle } from "../../components/section-title"
import { useHotKey } from "@/utils/use-hot-key"
import { Typo } from "../../components/typo"
import autoAnimate from "@formkit/auto-animate"
import { HeartIcons } from "../../components/heart-icons"
import { capitalizeFirst } from "@/utils/misc"

const translations = {
  sectionTitle: {
    de: "Songwünsche abgeben",
    en: "Suggest a song",
  },
  recentWishes: {
    de: "Zuletzt gewünscht:",
    en: "Recently added:",
  },
  inputPlaceholder: {
    de: "Lied/Link eingeben",
    en: "Wish for a song",
  },
} as const

const initialWishes = [
  { name: "Twist and Shout by The Beatles", author: "Bekki & Johannes" },
  { name: "Dancing Queen by ABBA", author: "Bekki & Johannes" },
  { name: "Superstition by Stevie Wonder", author: "Bekki & Johannes" },
  { name: "Sweet Caroline by Neil Diamond", author: "Bekki & Johannes" },
]

export interface SongWishesProps {
  locale: "en" | "de"
  guests: string[]
}

export const SongWishes = ({ locale, guests }: SongWishesProps) => {
  const [value, setValue] = useState("")
  const animatedParent = useRef<HTMLDivElement>(null)

  const onSubmitWish = () => {
    if (!value || wishes.find((w) => w.name === value)) return
    setWishes((prev) => [
      ...prev,
      {
        name: value,
        author: guests.map((s) => capitalizeFirst(s)).join(" & "),
      },
    ])
    setValue("")
  }

  const [wishes, setWishes] = useState(initialWishes)

  useHotKey(onSubmitWish, ["Enter", "CommandEnter"])

  useEffect(() => {
    animatedParent.current && autoAnimate(animatedParent.current)
  }, [animatedParent])

  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.sectionTitle[locale]}
        className="mb-4 text-center"
      />
      <div className="flex flex-row gap-4 min-w-[400px] max-w-screen">
        <input
          type="text"
          className="flex focus:ring ring-[#7e766777] flex-1 outline-none px-3 py-2 rounded-xl bg-background text-foreground-default placeholder:text-foreground-secondary text-3xl"
          value={value}
          placeholder={translations.inputPlaceholder[locale]}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmitWish}
          className="flex outline-none focus:ring ring-[#7e766777] rounded-xl bg-background border-0 w-[50px] items-center justify-center"
        >
          <CaretRightIcon />
        </button>
      </div>
      <div>
        <SectionTitle
          small
          title={translations.recentWishes[locale]}
          className="mb-2 mt-4"
        />
        <div className="flex flex-col-reverse gap-1" ref={animatedParent}>
          {wishes.map((w, index) => {
            if (index < wishes.length - 4) return null
            const number = wishes.length - index
            const opacity = { 1: 1, 2: 0.8, 3: 0.75, 4: 0.6 }[number]
            return (
              <div
                key={w.name}
                className="flex flex-row gap-2 px-5 py-2 bg-background rounded-xl items-center min-w-[320px]"
                style={{ opacity }}
              >
                <HeartIcons />
                <div>
                  <Typo size="3xl">{w.name}</Typo>
                  <Typo size="lg" color="secondary">
                    from {w.author}
                  </Typo>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
