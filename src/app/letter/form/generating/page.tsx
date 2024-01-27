'use client'

import { Block } from 'konsta/react'

export const GeneratingForm: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center text-black">
      <Block>
        <p className="text-center text-lg leading-10">
          🖼️ 그림을 그리는 중이예요 🎨
        </p>
        <br />
        <p className="text-center text-md break-al leading-7">
          <br />
          나만의 그림을 <br />
          그리는 중이예요
          <br />
          조금만 기다려 주세요
          <br />
        </p>
      </Block>
    </div>
  )
}
