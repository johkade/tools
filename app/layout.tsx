import type { Metadata } from "next"
import "./globals.css"
import { fancyFont } from "@/utils/fonts"

const font = fancyFont

export const metadata: Metadata = {
  title: "Bekki und Johannes heiraten",
  description: "Infos und mehr für unsere Hochzeit am 31.08.2024",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={font.className}>{children}</body>
    </html>
  )
}
