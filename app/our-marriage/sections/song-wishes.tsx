"use client"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { CaretRightIcon } from "../../components/caret-right-icon"
import { SectionTitle } from "../../components/section-title"
import { useHotKey } from "@/utils/use-hot-key"
import { Typo } from "../../components/typo"
import autoAnimate from "@formkit/auto-animate"
import { HeartIcons } from "../../components/heart-icons"
import { capitalizeFirst } from "@/utils/misc"
import { showToast } from "@/utils/toast"

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
    de: "Lied eingeben",
    en: "Wish for a song",
  },
  sent: [
    { de: "Was für ein Hit 🧨", en: "What a friggin' banger 🧨" },
    {
      de: "Wir können's nicht erwarten, dass der Song kommt! 💃",
      en: "I can't wait 'til this comes on! 💃",
    },
    { de: "Ein echter Ohrwurm! 🎵", en: "A real earworm! 🎵" },
    { de: "Zieh die Tanzschuhe an! 💃", en: "Put on your dancing shoes! 💃" },
    { de: "Ich liebe diesen Song! 🎶", en: "I love this song! 🎶" },
    {
      de: "Die Melodie ist so mitreißend! 🎼",
      en: "The melody is so catchy! 🎼",
    },
    {
      de: "Der geht mir einfach nicht aus dem Kopf! 🧠",
      en: "It just can't get out of my head! 🧠",
    },
    { de: "Der Beat ist unglaublich! 🔥", en: "The beat is incredible! 🔥" },
    {
      de: "Das Lied bringt mich immer zum Lächeln! 😊",
      en: "This song always brings a smile to my face! 😊",
    },
    {
      de: "Ich schwanke zwischen tanzen und weinen! 😂",
      en: "I'm torn between dancing and crying! 😂",
    },
    {
      de: "Wenn dieser Song eine Person wäre, würde ich sie heiraten! 💍",
      en: "If this song were a person, I'd marry it! 💍",
    },
    {
      de: "Mein innerer Tanzbär ist erwacht! 🐻",
      en: "My inner dancing bear has awakened! 🐻",
    },
    {
      de: "Ich glaube, ich habe gerade meinen neuen Lieblingssong gefunden! 🎵",
      en: "I think I just found my new favorite song! 🎵",
    },
    {
      de: "Wenn ich ein Superheld wäre, wäre dieser Song mein Thema! 🦸‍♂️",
      en: "If I were a superhero, this song would be my theme! 🦸‍♂️",
    },
    {
      de: "Dieses Lied macht mich zum Tanzflächen-Tycoon! 💼",
      en: "This song turns me into a dance floor tycoon! 💼",
    },
    {
      de: "Dieser Song hat mehr Ohrwürmer als ein Regenwald! 🐛",
      en: "This song has more earworms than a rainforest! 🐛",
    },
    {
      de: "Dieser Song ist heißer als eine Tasse Kaffee! ☕🔥",
      en: "This song is hotter than a cup of coffee! ☕🔥",
    },
    {
      de: "Ich schwitze schon, und der Song hat noch nicht einmal angefangen! 💦",
      en: "I'm already sweating and the song hasn't even started yet! 💦",
    },
    {
      de: "Dieses Lied ist so sexy, es sollte einen Warnhinweis haben! ⚠️😏",
      en: "This song is so sexy, it should come with a warning label! ⚠️😏",
    },
    {
      de: "Ich fühle mich wie ein heißer Tanzkuchen, und dieser Song ist der Zuckerguss! 🍰💃",
      en: "I feel like a hot dancing cake, and this song is the icing on top! 🍰💃",
    },
    {
      de: "Dieser Song ist wie eine heiße Umarmung für meine Ohren! 🤗🔥",
      en: "This song is like a hot hug for my ears! 🤗🔥",
    },
    {
      de: "Dieses Lied macht mich wilder als eine Horde Tanzenbären! 🐻💃",
      en: "This song makes me wilder than a pack of dancing bears! 🐻💃",
    },
    {
      de: "Ich glaube, ich muss nach diesem Lied eine kalte Dusche nehmen! 🚿❄️",
      en: "I think I'll need a cold shower after this song! 🚿❄️",
    },
  ],
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
    const songIndex = randomIntFromInterval(0, translations.sent.length - 1)
    showToast(translations.sent[songIndex][locale])
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
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
