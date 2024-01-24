'use client'

import React, { useRef } from 'react'
import { App, Block } from 'konsta/react'
import { Application as SplineApp } from '@splinetool/runtime'
// import { LetterFormSpline } from '@/src/components/LetterFormSpline'
import useLetterFormStore from '@/src/lib/states/letter-form'
import { Preview } from './preview/page'
import { LetterForm } from './form/page'
import { Buttons } from './buttons/page'
import { toPng } from 'html-to-image'

export default function LetterPage() {
  const {
    letterFormStep,
    setLetterFormStep,
    resetLetter,
    generateAIImage,
    shareOnSNS,
    downloadLetterAsImage,
  } = useLetterFormStore()

  const splineRef = useRef<SplineApp | null>(null)
  const onStartWriting = () => {
    splineRef.current?.setVariable('isWriting', true)
  }

  const captureSectionRef = useRef<HTMLDivElement>(null)
  const captureLetter = () => {
    if (captureSectionRef.current === null) return
    toPng(captureSectionRef.current)
      .then((url) => {
        let link = document.createElement('a')
        link.download = 'my_letter.png'
        link.href = url
        link.click()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {/* <LetterFormSpline splineRef={splineRef} /> */}
      {letterFormStep !== 5 && (
        <App
          theme="ios"
          dark={false}
          className="!min-h-full flex justify-center items-center absolute top-0"
        >
          <Block
            strong
            inset
            outline
            className="no-scrollbar w-[750px] h-[550px] grid grid-cols-2 grid-rows-1 !relative rounded-2xl"
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
                onClickStart={onStartWriting}
                generateAIImage={generateAIImage}
                shareOnSns={shareOnSNS}
                downloadAsImage={downloadLetterAsImage}
                captureLetter={captureLetter}
              />
            </div>
          </Block>
        </App>
      )}
    </>
  )
}
