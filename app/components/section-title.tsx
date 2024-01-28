import { cn } from "@/utils/styling"
import { Typo } from "./typo"

export interface SectionTitleProps {
  title: string
  small?: boolean
  className?: string
}

export const SectionTitle = ({
  title,
  className,

  small,
}: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <Typo as="h3" size={small ? "4xl" : "5xl"}>
        {title}
      </Typo>
    </div>
  )
}
