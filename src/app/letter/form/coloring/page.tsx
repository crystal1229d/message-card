'use client'

import { letterColors, paperColors } from '@/src/lib/constants/letter'
import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block, BlockTitle, Button } from 'konsta/react'

export const ColoringForm = () => {
  const letterFormState = useLetterFormStore()

  return (
    <div className="h-full overflow-auto no-scrollbar">
      <BlockTitle className="text-primary text-2xl mb-2 ml-[33%]">
        편지지 꾸미기
      </BlockTitle>
      <BlockTitle className="text-black !text-xs sm:!text-sm">
        편지지 색상 선택
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {paperColors.map(({ name, value, bgRgba }) => (
            <Button
              large
              key={`paper_${bgRgba}`}
              onClick={() => letterFormState.setPaperColor(value)}
              className={`${
                letterFormState.paperColor === value
                  ? 'border border-primary'
                  : ''
              } bg-white !text-black shadow-md flex gap-2 text-2xs sm:text-sm`}
            >
              <span
                className={
                  value === 'white'
                    ? 'border-2 border-solid border-slate-300'
                    : ''
                }
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: bgRgba,
                }}
              />
              <span>{name}</span>
            </Button>
          ))}
        </div>
      </Block>
      <BlockTitle className="text-black !text-xs sm:!text-sm">
        글자 색상 선택
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {letterColors.map(({ name, value, bgRgba }) => (
            <Button
              large
              key={`letter_${bgRgba}`}
              onClick={() => letterFormState.setLetterColor(value)}
              className={`${
                letterFormState.letterColor === value
                  ? 'border border-primary'
                  : ''
              } bg-white !text-black shadow-md flex gap-2 text-2xs sm:text-sm`}
            >
              <span
                className={
                  value === 'white'
                    ? 'border-2 border-solid border-slate-300'
                    : ''
                }
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: bgRgba,
                }}
              />
              <span>{name}</span>
            </Button>
          ))}
        </div>
      </Block>
    </div>
  )
}
