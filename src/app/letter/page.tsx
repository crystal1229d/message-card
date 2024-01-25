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
    from,
    to,
    resetLetter,
    generateAIImage,
  } = useLetterFormStore()

  const splineRef = useRef<SplineApp | null>(null)
  const onStartWriting = () => {
    splineRef.current?.setVariable('isWriting', true)
  }

  // TODO: 분리
  const captureSectionRef = useRef<HTMLDivElement>(null)
  const captureLetter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('event : ', event)
    console.log('ref : ', captureSectionRef)
    console.log('current : ', captureSectionRef.current)
    if (captureSectionRef.current === null) return
    toPng(captureSectionRef.current)
      .then((url) => {
        // download(url, 'my_letter.png')
        console.log('url : ', url)
        let link = document.createElement('a')
        link.download = 'my_letter.png'
        link.href = encodeURI(url)
        link.click()
        link.remove()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // TODO: 분리
  const shareOnSns = async () => {
    // 이미지 공유 : 이미지파일생성 -> 업로드 -> 공유 -> 삭제
    const { Kakao } = window

    if (captureSectionRef.current === null) return

    try {
      // 1. 이미지파일 생성
      const url = await toPng(captureSectionRef.current)

      // base64 data => Blob
      const blobBin = atob(url.split(',')[1])
      let array = []
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i))
      }
      const blob = new Blob([new Uint8Array(array)], { type: 'image/png' })

      // Blob => File object
      const file = new File([blob], 'my_letter.png', {
        type: 'image/png',
      })
      const imageFile = [file]

      // 2. 업로드 (카카오서버)
      const uploadedImage = await Kakao.Share.uploadImage({
        file: imageFile,
      })
      const uploadedImageUrl = uploadedImage.infos.original.url

      // 3. 공유
      Kakao.Share.sendScrap({
        requestUrl: 'http://localhost:3000', // const { location } = window; requestUrl: location.href
        templateId: 103472,
        templateArgs: {
          THUMB: uploadedImageUrl,
          TITLE: '편지가 도착했어요!',
          CONTENT: `${from} / ${to}`,
        },
      })

      // 4. 삭제 (카카오서버)
      Kakao.Share.deleteImage({
        uploadedImageUrl,
      })
    } catch (error) {
      console.log(error)
    }
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
            className="no-scrollbar w-[800px] h-[620px] grid grid-cols-2 grid-rows-1 !relative rounded-2xl"
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
                shareOnSns={shareOnSns}
                captureLetter={captureLetter}
              />
            </div>
          </Block>
        </App>
      )}
    </>
  )
}
