import { letterColors, paperColors } from '@/src/lib/constants/letter'
import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block } from 'konsta/react'
import Image from 'next/image'
import React from 'react'

// interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {}
interface PreviewProps {
  captureSectionRef: React.RefObject<HTMLDivElement>
}

// export const Preview = React.forwardRef<HTMLDivElement>((captureSectionRef) => {
export const Preview = ({ captureSectionRef }: PreviewProps) => {
  const { to, from, image, message, paperColor, letterColor } =
    useLetterFormStore()

  const selectedPaperColor = paperColors.find(
    (color) => color.value === paperColor,
  )

  const selectedLetterColor = letterColors.find(
    (color) => color.value === letterColor,
  )

  return (
    <Block
      strong
      inset
      outline
      className={`m-0 border-r-2 border-solid border-slate-400`}
    >
      <div
        ref={captureSectionRef}
        style={{ backgroundColor: `${selectedPaperColor?.hex}` }}
        className={`w-full h-full p-2 rounded-lg box-border grid grid-cols-1 grid-rows-[60%_5%_20%_5%] gap-3`}
      >
        {image ? (
          // <div
          //   style={{ backgroundImage: `url('${image}')` }}
          //   className="rounded-md bg-cover"
          // ></div>
          // <img src={image} alt="my letter" className="rounded-m h-fit" />
          <Image width={300} height={281} src={image} alt="my letter" />
        ) : (
          <div className="bg-slate-300 rounded-md"></div>
        )}
        <p
          style={{ color: `${selectedLetterColor?.hex}` }}
          className="underline decoration-1 decoration-wavy underline-offset-2"
        >
          {to}
        </p>
        <p
          style={{ color: `${selectedLetterColor?.hex}` }}
          className="whitespace-pre-wrap"
        >
          {message}
        </p>
        <p
          style={{ color: `${selectedLetterColor?.hex}` }}
          className="underline decoration-1 decoration-wavy underline-offset-2"
        >
          {from}
        </p>
      </div>
    </Block>
  )
}
