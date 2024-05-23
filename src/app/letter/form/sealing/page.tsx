'use client'

import { Block } from 'konsta/react'

export default function SealingForm() {
  return (
    <div className="h-full flex items-center justify-center text-black">
      <Block>
        <p className="text-center text-3xl leading-10">🎉 짠! 완성됐어요! ✨</p>
        <br />
        <p className="text-center text-lg break-al leading-7">
          <br />
          완성된 편지를 <br />
          카카오톡으로 공유하거나
          <br />
          이미지로 저장해보세요!
          <br />
        </p>
      </Block>
    </div>
  )
}
