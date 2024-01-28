import { FontSize, ForegroundColor, Stylable } from "@/utils/atoms"
import { cn } from "@/utils/styling"
import { cva } from "class-variance-authority"
import { CSSProperties } from "react"

const typoVariants = cva("text-start", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
      "8xl": "text-8xl",
    },
    lineHeight: {
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    },
    spacing: {
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
    },
    font: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-foreground",
      primary: "text-foreground-primary",
      secondary: "text-foreground-secondary",
      tertiary: "text-foreground-tertiary",
      error: "text-foreground-error",
      success: "text-foreground-success",
      disabled: "text-foreground-disabled",
      neutral: "text-foreground-neutral",
      white: "text-white",
      black: "text-black",
      danger: "text-foreground-danger",
    },
  },
  defaultVariants: {
    size: "base",
    font: "regular",
    color: "default",
  },
})

export interface TypoProps extends Stylable {
  font?: "light" | "regular" | "medium" | "semibold" | "bold"
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
  size?: FontSize
  lineHeight?: "snug" | "normal" | "relaxed"
  color?: ForegroundColor
  spacing?: "tight" | "normal" | "wide"
  numberOfLines?: number
  multiline?: boolean
  children?: React.ReactNode
}

export const Typo = ({
  size = "base",
  font = "regular",
  as: Comp = "p",
  color = "default",
  lineHeight = "snug",
  spacing = "normal",
  numberOfLines = 1,
  multiline,
  className,
  children,
  style,
}: TypoProps) => {
  return (
    <Comp
      className={cn(
        typoVariants({ size, lineHeight, spacing, font, color, className }),
        !multiline && numberOfLines >= 1
          ? `line-clamp-${numberOfLines} break-words overflow-hidden px-2`
          : "overflow-hidden"
      )}
      style={style as CSSProperties}
    >
      {children}
    </Comp>
  )
}

Typo.displayName = "Typo"
