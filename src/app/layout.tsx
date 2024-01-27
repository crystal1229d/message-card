import type { Metadata } from 'next'
import KakaoScript from '../components/common/KakaoScript'
import './globals.css'

declare global {
  interface Window {
    Kakao: any
  }
}

export const metadata: Metadata = {
  title: 'AI 메세지카드',
  description: '메세지카드를 작성해서 공유해보세요!',
  abstract: '메세지 카드를 보내보세요!',
  keywords: [
    '기념일',
    '인사',
    '감사',
    '사과',
    '안부',
    '메세지',
    '카드',
    '편지',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* {<script defer src="https://developers.kakao.com/sdk/js/kakao.js" />} */}
      </head>
      <body>{children}</body>
      <KakaoScript />
    </html>
  )
}
