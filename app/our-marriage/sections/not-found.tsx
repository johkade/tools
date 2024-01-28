import { Typo } from "@/app/components/typo"

export const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col gap-1 mb-8 items-center">
        <Typo as="h1" size="5xl" className="text-center">
          {"Oh, how'd you get here?"}
        </Typo>
        <Typo size="3xl" className="text-center" multiline>
          {
            "Sorry, but we couldn't detect you're identity - that shouldn't have happened..."
          }
        </Typo>
      </div>
    </div>
  )
}
