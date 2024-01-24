'use client'

import { Block, BlockTitle } from 'konsta/react'
import Image from 'next/image'
import titleImage from '../../../../../public/images/main.png'

export const StartingForm: React.FC = () => {
  return (
    <div>
      <BlockTitle className="text-primary text-2xl mb-2 ml-[28%]">
        AI 메세지카드 만들기
      </BlockTitle>
      <Block className="no-scrollbar">
        <Image src={titleImage} alt="letters" />
      </Block>
    </div>
  )
}
