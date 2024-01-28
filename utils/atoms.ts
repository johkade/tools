export type UIIcon = React.VFC<React.SVGProps<SVGSVGElement>>

export type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"

export type ForegroundColor =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "error"
  | "success"
  | "danger"
  | "white"
  | "black"
  | "neutral"

export type Themed<T extends any> = T | { dark: T; light: T }
export type ThemedColor = Themed<string>
export type ThemedIcon = Themed<UIIcon>
export type ThemeColor =
  | "gray"
  | "primary"
  | "accent"
  | "black"
  | "white"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"

export type ColorNumber =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950"
export type ColorSet = Record<ColorNumber, string>
export type ColorGroup = { name: string; color: string }[]

export interface Stylable {
  style?: React.CSSProperties
  className?: string
}
export type Unstylable<T> = Omit<T, "style" | "className">

export interface WithChildren {
  children?: React.ReactNode
}

export function getThemedString<T extends string>(
  themedSomething: Themed<T>,
  theme: "dark" | "light" = "dark"
) {
  if (typeof themedSomething === "string") return themedSomething
  return themedSomething[theme]
}
