'use client'

import {
  imageColors,
  imageStyles,
  letterKeywords,
} from '@/src/lib/constants/letter'
import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block, BlockTitle, Button, List, ListInput } from 'konsta/react'

export const DrawingForm = () => {
  const letterFormState = useLetterFormStore()

  return (
    <div className="h-full overflow-auto no-scrollbar">
      <BlockTitle className="text-primary text-2xl mb-2 ml-[33%]">
        AI 이미지 설정
      </BlockTitle>
      <BlockTitle className="text-black !text-xs sm:!text-sm">
        AI 이미지 키워드 선택
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {letterKeywords.map(({ name, value }) => (
            <Button
              large
              key={value}
              onClick={() => letterFormState.setImageKeyword(value)}
              className={`${
                letterFormState.imageKeyword === value
                  ? 'border border-primary'
                  : ''
              } bg-white !text-black shadow-md text-2xs sm:text-sm break-keep`}
            >
              {name}
            </Button>
          ))}
        </div>
      </Block>
      <BlockTitle className="text-black !text-xs sm:!text-sm">
        AI 이미지 중심색 선택
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {imageColors.map(({ name, value, bgRgba }) => (
            <Button
              large
              key={`image_${bgRgba}`}
              onClick={() => letterFormState.setImageColor(value)}
              className={`${
                letterFormState.imageColor === value
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
        AI 이미지 스타일 선택
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {imageStyles.map(({ name, value }) => (
            <Button
              large
              key={value}
              onClick={() => letterFormState.setImageStyle(value)}
              className={`${
                letterFormState.imageStyle === value
                  ? 'border border-primary'
                  : ''
              } bg-white !text-black shadow-md text-2xs sm:text-sm break-keep`}
            >
              {name}
            </Button>
          ))}
        </div>
      </Block>
      <BlockTitle className="text-black !text-xs sm:!text-sm">
        AI 이미지 프롬프트 설정
      </BlockTitle>
      <List strongIos insetIos>
        <ListInput
          outline
          type="textarea"
          label="이미지 설명"
          placeholder="생성하고 싶은 이미지에 대해 영어로 적어주세요."
          inputClassName="!h-36 resize-none !text-2xs sm:!text-sm leading-relaxed"
          info={`현재 ${letterFormState.imageDescription.length}자 / 200자`}
          onChange={(event) => {
            // * 메세지 길이 200자로 제한
            if (event.target.value.length > 200) {
              event.target.value = event.target.value.slice(0, 200)
              return
            }
            letterFormState.setImageDescription(event.target.value)
          }}
        />
      </List>
    </div>
  )
}
