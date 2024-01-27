export type LetterFormSteps = 1 | 2 | 3 | 4 | 5 | 6

export const letterFormSteps: {
  name: string
  value: LetterFormSteps
}[] = [
  {
    name: '온보딩',
    value: 1,
  },
  {
    name: '편지 작성',
    value: 2,
  },
  {
    name: '편지지 꾸미기',
    value: 3,
  },
  {
    name: 'AI 이미지 설정',
    value: 4,
  },
  {
    name: 'AI 이미지 생성',
    value: 5,
  },
  {
    name: '편지 보내기',
    value: 6,
  },
]
