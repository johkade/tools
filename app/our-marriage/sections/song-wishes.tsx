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
  {
    title: "Bohemian Rhapsody",
    author: "Bekki & Johannes",
    created_at: "2024-01-27T18:55:02.265663+00:00",
    local: true,
  },
]

export interface SongWishesProps {
  locale: "en" | "de"
  guests: string[]
}

export const SongWishes = ({ locale, guests }: SongWishesProps) => {
  const [value, setValue] = useState("")
  const animatedParent = useRef<HTMLDivElement>(null)

  const onSubmitWish = async () => {
    if (!value || wishes.find((w) => w.title === value)) return

    const author = guests.map((s) => capitalizeFirst(s)).join(" & ")

    setWishes((prev) => [
      {
        title: value,
        author,
        created_at: new Date().toISOString(),
        local: true,
      },
      ...prev,
    ])
    setValue("")

    try {
      await addSong({ author, title: value })
    } catch (error) {
      console.log(error)
    }
  }

  const [wishes, setWishes] = useState(initialWishes)

  useHotKey(onSubmitWish, ["Enter", "CommandEnter"])

  useEffect(() => {
    animatedParent.current && autoAnimate(animatedParent.current)
  }, [animatedParent])

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const data = await getLatestSongs()
        if (!Array.isArray(data.data)) {
          throw new Error("Invalid data detected on client")
        }
        const newArr: typeof wishes = []

        for (const wish of data.data) {
          if (
            typeof wish.title === "string" &&
            typeof wish.author === "string"
          ) {
            newArr.push({
              author: wish.author,
              title: wish.title,
              local: false,
              created_at: wish.created_at,
            })
          }
        }
        setWishes([...newArr])
      } catch (error) {
        console.log(error)
      }
    }

    fetchAndSet()
    const timer = setInterval(fetchAndSet, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center my-10">
      <SectionTitle
        title={translations.sectionTitle[locale]}
        className="mb-4 text-center"
      />
      <div className="flex flex-row self-stretch gap-4 md:self-center md:min-w-[520px]">
        <input
          type="text"
          className="flex flex-1 focus:ring ring-[#7e766777] outline-none px-3 py-2 rounded-xl bg-background text-foreground-default placeholder:text-foreground-secondary text-3xl"
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

      <SectionTitle
        small
        title={translations.recentWishes[locale]}
        className="mb-2 mt-4"
      />
      <div
        className="flex flex-col gap-1 self-stretch md:self-center md:min-w-[520px]"
        ref={animatedParent}
      >
        {wishes.map((w, index) => {
          if (index >= 4) return null
          const number = index + 1
          const opacity = { 1: 1, 2: 0.8, 3: 0.75, 4: 0.6, 5: 0 }[number]
          return (
            <div
              key={w.title}
              className="flex flex-row gap-2 px-5 py-2 bg-background rounded-xl items-center"
              style={{ opacity }}
            >
              <HeartIcons />
              <div>
                <Typo size="3xl">{w.title}</Typo>
                <Typo size="lg" color="secondary">
                  {locale === "de" ? "von" : "from"} {w.author}
                </Typo>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

async function addSong(data: { title: string; author: string }) {
  const resp = await fetch("/api/wishes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (resp.status !== 200) throw new Error("FAILED")

  return resp.json()
}

async function getLatestSongs() {
  const resp = await fetch("/api/wishes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  if (resp.status !== 200) throw new Error("FAILED")

  return resp.json()
}
