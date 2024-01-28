import localFont from "next/font/local"

export const fancyFont = localFont({
  src: [
    {
      path: "../public/fonts/Tangerine-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/Tangerine-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-fancy",
})
