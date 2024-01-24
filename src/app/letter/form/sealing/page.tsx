'use client'

import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block } from 'konsta/react'

export const SealingForm: React.FC = () => {
  return (
    <div className="text-black">
      <Block>
        <p className="text-center text-3xl leading-10">🎉 짠! 완성됐어요! ✨</p>
        <br />
        <p className="text-center text-lg break-al leading-6">
          편지를 이미지로 저장하거나 <br />
          SNS로 공유해보세요!
        </p>
      </Block>
    </div>
  )
}
