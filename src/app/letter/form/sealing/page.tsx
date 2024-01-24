'use client'

import useLetterFormStore from '@/src/lib/states/letter-form'
import { Block } from 'konsta/react'

export const SealingForm: React.FC = () => {
  return (
    <div className="text-black">
      <Block>편지를 이미지로 저장하거나 SNS로 공유해보세요!</Block>
    </div>
  )
}
