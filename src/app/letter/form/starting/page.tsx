'use client'

import { Block, Button } from 'konsta/react'

interface ButtonsProps {
  letterFormStep: number
  isLightOn: boolean
  setLetterFormStep: (letterFormStep: number) => void
}

export const StartingForm: React.FC<ButtonsProps> = ({
  letterFormStep,
  isLightOn,
  setLetterFormStep,
}) => {
  const handleClickNext = () => {
    if (letterFormStep < 4) setLetterFormStep(letterFormStep + 1)
  }
  return (
    <div className="flex justify-center items-center absolute left-[45%] bottom-[20%]">
      <Button
        rounded
        className="h-[60px] w-[300px] bg-primary text-lg tracking-widest backdrop-blur-sm hover:brightness-75 cursor-pointer"
        onClick={handleClickNext}
      >
        편지쓰기
      </Button>
    </div>
  )
}
