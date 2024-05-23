'use client'

import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block, BlockTitle, List, ListInput } from 'konsta/react'

export default function WritingForm() {
  const letterFormState = useLetterFormStore()

  return (
    <div>
      <BlockTitle className="text-primary text-2xl ml-[35%]">
        편지 작성
      </BlockTitle>
      <Block>
        <List strongIos insetIos>
          <ListInput
            outline
            id="message-to"
            label="받는 분"
            type="text"
            value={letterFormState.to}
            placeholder="OO에게"
            className="max-w-xs sm:max-w-none"
            inputClassName="!text-2xs sm:!text-xs md:!text-sm"
            onChange={(event) => {
              if (event.target.value.length > 20) {
                event.target.value = event.target.value.slice(0, 20)
                letterFormState.setTo(event.target.value)
                return
              }
              letterFormState.setTo(event.target.value)
            }}
            info={`현재 ${letterFormState.to.length}자 / 20자`}
          />
          <ListInput
            outline
            id="message-from"
            label="보내는 분"
            type="text"
            value={letterFormState.from}
            placeholder="OO드림"
            className="max-w-xs sm:max-w-none"
            inputClassName="!text-2xs sm:!text-xs md:!text-sm"
            onChange={(event) => {
              if (event.target.value.length > 20) {
                event.target.value = event.target.value.slice(0, 20)
                letterFormState.setFrom(event.target.value)
                return
              }
              letterFormState.setFrom(event.target.value)
            }}
            info={`현재 ${letterFormState.from.length}자 / 20자`}
          />
          <ListInput
            outline
            id="message"
            type="textarea"
            label="메시지"
            value={letterFormState.message}
            placeholder="메시지를 작성해주세요"
            inputClassName="!h-32 resize-none max-w-xs sm:max-w-none !text-2xs sm:!text-xs md:!text-sm leading-relaxed"
            info={`현재 ${letterFormState.message.length}자 / 80자`}
            onChange={(event) => {
              // * 메세지 길이 60자로 제한
              if (event.target.value.length > 60) {
                event.target.value = event.target.value.slice(0, 60)
                return
              }

              // * 메세지가 5줄이 넘어가면 6번째줄 부터 메세지 삭제
              if (event.target.value.split('\n').length > 5) {
                event.target.value = event.target.value
                  .split('\n')
                  .slice(0, 6)
                  .join('\n')
                letterFormState.setMessage(event.target.value)
                return
              }

              // * 한 줄에 15자가 넘어가는 줄이 있으면 그 줄 15자까지만 입력
              if (
                event.target.value
                  .split('\n')
                  .some((line: string) => line.length > 15)
              ) {
                event.target.value = event.target.value
                  .split('\n')
                  .map((line: string) => line.slice(0, 15))
                  .join('\n')
                letterFormState.setMessage(event.target.value)
                return
              }
              letterFormState.setMessage(event.target.value)
            }}
          />
        </List>
      </Block>
    </div>
  )
}
