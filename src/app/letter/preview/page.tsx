import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block } from 'konsta/react'
import Image from 'next/image'

export const Preview = () => {
  const { to, from, image, message } = useLetterFormStore()

  return (
    <Block
      strong
      inset
      outline
      className="border-r-2 border-solid border-slate-400"
    >
      <div
        className={`w-full h-full box-border grid grid-cols-1 grid-rows-[45%_3%_5%_27%_3%] gap-4`}
      >
        {image ? (
          <Image src={image} alt="my letter" />
        ) : (
          <div className="bg-slate-300"></div>
        )}
        <p className="border-t-4 border-dashed border-slate-300 min-w-[10px]"></p>
        <p className="text-slate-500">{to}</p>
        <p className="text-black whitespace-pre-wrap">{message}</p>
        <p className="text-slate-500">{from}</p>
      </div>
    </Block>
  )
}
