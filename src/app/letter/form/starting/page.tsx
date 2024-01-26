'use client'

import { Button } from 'konsta/react'

interface ButtonsProps {
  letterFormStep: number
  setLetterFormStep: (letterFormStep: number) => void
}

export const StartingForm: React.FC<ButtonsProps> = ({
  letterFormStep,
  setLetterFormStep,
}) => {
  const handleClickNext = () => {
    if (letterFormStep < 4) setLetterFormStep(letterFormStep + 1)
  }

  return (
    <div className="flex justify-center items-center absolute left-[45%] bottom-[20%]">
      <Button
        tonalIos
        rounded
        className="h-[60px] w-[200px] text-lg tracking-widest backdrop-blur-sm hover:brightness-75 cursor-pointer"
        onClick={handleClickNext}
      >
        편지쓰기
      </Button>
    </div>
  )
}
