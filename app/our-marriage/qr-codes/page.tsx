import Image from "next/image"
import { VISITOR_GROUPS } from "../visitors"
import { Typo } from "@/app/components/typo"
const visitors = VISITOR_GROUPS
const QR_BASE = "https://qr.ticketbro.tools/?payload="
const URL_BASE = "https://bekki-and-johannes.vercel.app/our-marriage?guests="

export default function QRCodes(props: {}) {
  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center bg-void py-10 gap-8">
      {visitors.map((group) => {
        const visitorsJoined = group.visitors.map((v) => v.givenName).join("-")
        const url = `${URL_BASE}${visitorsJoined}&locale=${
          group.locale ?? "de"
        }`
        return (
          <div
            key={visitorsJoined}
            className="flex flex-col gap-2 items-center"
          >
            <Typo size="lg" font="bold">
              {visitorsJoined}
            </Typo>
            <Image
              width={90}
              height={90}
              alt={group.visitors.join(", ")}
              src={`${QR_BASE}${encodeURIComponent(url)}`}
            />
          </div>
        )
      })}
    </main>
  )
}
