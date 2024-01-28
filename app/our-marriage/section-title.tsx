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
  if (small)
    return (
      <div className={`flex flex-col ${className ?? ""}`}>
        <h3 className="text-md font-serif text-amber-950/80">{title}</h3>
      </div>
    )
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <h3 className="text-lg font-serif text-amber-950">{title}</h3>
    </div>
  )
}
