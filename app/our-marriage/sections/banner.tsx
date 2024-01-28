import { Typo } from "@/app/components/typo"
import Image from "next/image"

export const Banner = () => {
  return (
    <div className="flex relative flex-col items-center h-[300px] sm:h-[350px] md:h-[400px] md:py-4 lg:py-8">
      <Image
        className="absolute w-[120%] mx-auto h-full border border-red-500 blur-lg"
        src="/sunset_love.jpeg"
        alt="Image of Bekki and Johny standing in front of a sunset (how romantic)"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="flex relative w-full md:max-w-[600px] h-full">
        <Image
          className="flex relative md:rounded-2xl"
          src="/sunset_love.jpeg"
          alt="Image of Bekki and Johny standing in front of a sunset (how romantic)"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute left-[50%] translate-x-[-50%] bottom-2">
          <Typo size="4xl" color="white" className="text-center">
            Save the date
          </Typo>
          <Typo size="4xl" color="white" className="text-center">
            31.08.2024
          </Typo>
        </div>
      </div>
    </div>
  )
}
