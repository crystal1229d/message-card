'use client'

import { StartingForm } from './starting/page'
import { WritingForm } from './writing/page'
import { ColoringForm } from './coloring/page'
import { DrawingForm } from './drawing/page'
import { SealingForm } from './sealing/page'

interface LetterFormProps {
  letterFormStep: number
}

export const LetterForm: React.FC<LetterFormProps> = ({ letterFormStep }) => {
  const pageByStep: { [key: number]: React.JSX.Element } = {
    1: <StartingForm />,
    2: <WritingForm />,
    3: <ColoringForm />,
    4: <DrawingForm />,
    5: <></>,
    6: <SealingForm />,
  }

  return <>{pageByStep[letterFormStep]}</>
}
