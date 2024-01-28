'use client'

import React, { useRef } from 'react'
import { App, Block } from 'konsta/react'
import { Application as SplineApp } from '@splinetool/runtime'
import { LetterFormSpline } from '@/src/components/LetterFormSpline'
import useLetterFormStore from '@/src/lib/states/letter-form'
import { Preview } from './preview/page'
import { LetterForm } from './form/page'
import { StartingForm } from './form/starting/page'
import useLetterSplineStore from '@/src/lib/states/spline'
import { Buttons } from './buttons/page'

export default function LetterPage() {
  const {
    letterFormStep,
    setLetterFormStep,
    resetLetter,
    generateAIImage,
    exportToImage,
    shareOnSns,
  } = useLetterFormStore()

  const splineRef = useRef<SplineApp | null>(null)
  const { isSplineRendered } = useLetterSplineStore()
  const isLightOn = Boolean(splineRef.current?.getVariable('isLightOn'))

  const captureSectionRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {letterFormStep === 1 && (
        <>
          <LetterFormSpline splineRef={splineRef} />
          {isSplineRendered && (
            <StartingForm
              letterFormStep={letterFormStep}
              isLightOn={isLightOn}
              setLetterFormStep={setLetterFormStep}
            />
          )}
        </>
      )}
      {letterFormStep !== 1 && (
        <App
          theme="ios"
          dark={false}
          className="!min-h-full flex justify-center items-center absolute top-0"
        >
          <Block
            strong
            inset
            outline
            className="no-scrollbar w-[800px] h-[650px] grid grid-cols-2 grid-rows-1 !relative rounded-2xl"
          >
            <Preview captureSectionRef={captureSectionRef} />
            <div
              className={`h-full bg-violet-50 rounded-md ${letterFormStep === 6 ? 'flex flex-col justify-between' : 'grid grid-cols-1 grid-rows-[80%_20%]'} backdrop-blur-lg`}
            >
              <LetterForm letterFormStep={letterFormStep} />
              <Buttons
                letterFormStep={letterFormStep}
                setLetterFormStep={setLetterFormStep}
                resetLetter={resetLetter}
                generateAIImage={generateAIImage}
                shareOnSns={() => shareOnSns(captureSectionRef)}
                captureLetter={() => exportToImage(captureSectionRef)}
              />
            </div>
          </Block>
        </App>
      )}
    </>
  )
}
