import { Block, Button } from 'konsta/react'

interface ButtonsProps {
  onClickStart: () => void
  letterFormStep: number
  setLetterFormStep: (letterFormStep: number) => void
  resetLetter: () => void
  generateAIImage: () => void
  shareOnSns: () => void
  captureLetter: () => void
}

export const Buttons: React.FC<ButtonsProps> = ({
  letterFormStep,
  setLetterFormStep,
  resetLetter,
  onClickStart,
  generateAIImage,
  shareOnSns,
  captureLetter,
}) => {
  const handleClickNext = () => {
    if (letterFormStep < 4) setLetterFormStep(letterFormStep + 1)
  }
  const handleClickPrev = () => {
    if (letterFormStep > 1) setLetterFormStep(letterFormStep - 1)
  }
  const handleStart = () => {
    onClickStart()
    handleClickNext()
  }
  const handleGenerateImage = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    generateAIImage()
  }
  const handleClickReset = () => {
    if (letterFormStep > 1) resetLetter()
  }

  return (
    <Block
      className={`grid ${letterFormStep > 1 && letterFormStep < 5 && 'grid-cols-2 grid-rows-1 gap-[40%]'} ${letterFormStep === 6 && 'grid-cols-1 grid-rows-3 gap-2'}`}
    >
      {letterFormStep === 1 && (
        <Button
          large
          className="h-[60px] text-lg tracking-widest bg-primary hover:brightness-125 cursor-pointer"
          onClick={handleStart}
        >
          편지쓰기
        </Button>
      )}
      {letterFormStep > 1 && letterFormStep < 5 && (
        <Button
          tonalIos
          rounded
          className="h-[60px] text-lg tracking-widest backdrop-blur-sm hover:brightness-75 cursor-pointer"
          onClick={handleClickPrev}
        >
          뒤로
        </Button>
      )}
      {letterFormStep > 1 && letterFormStep < 4 && (
        <Button
          rounded
          className="h-[60px] text-lg tracking-widest hover:brightness-125 cursor-pointer"
          onClick={handleClickNext}
        >
          다음
        </Button>
      )}
      {letterFormStep === 4 && (
        <Button
          rounded
          className="h-[60px] text-lg tracking-widest bg-primary hover:brightness-125 cursor-pointer"
          onClick={handleGenerateImage}
        >
          이미지 생성
        </Button>
      )}
      {letterFormStep === 6 && (
        <>
          <Button
            rounded
            className="h-[60px] text-lg tracking-widest bg-primary hover:brightness-125 cursor-pointer"
            onClick={shareOnSns}
          >
            카카오톡 공유
          </Button>
          <Button
            rounded
            className="h-[60px] text-lg tracking-widest bg-primary hover:brightness-125 cursor-pointer"
            onClick={captureLetter}
          >
            이미지로 저장
          </Button>
          <Button
            rounded
            className="h-[60px] text-lg tracking-widest bg-primary hover:brightness-125 cursor-pointer"
            onClick={handleClickReset}
          >
            새로 작성
          </Button>
        </>
      )}
    </Block>
  )
}
