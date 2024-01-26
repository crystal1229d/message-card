export type SelectableKeyword =
  | 'New Year'
  | 'Thanksgiving'
  | 'Christmas'
  | 'Birthday'
  | 'Graduation'
  | 'Parents Day'
  | 'Thanks'
  | 'Apologize'
  | 'Congratulation'

export type SelectablePaperColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'pink'
  | 'green'
  | 'blue'
  | 'purple'
  | 'white'
  | 'black'

export type SelectableLetterColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'pink'
  | 'green'
  | 'blue'
  | 'purple'
  | 'white'
  | 'black'

export type SelectableImageColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'pink'
  | 'green'
  | 'blue'
  | 'purple'
  | 'white'
  | 'black'

export type SelectableStyle =
  | 'Water Color'
  | 'Oil Painting'
  | 'Pop Art'
  | 'Posterization'
  | 'Sketch'
  | 'Cartoon'
  | 'Pen Drawing'
  | 'Vintage Retro'
  | 'Simple Minimalist'

export const letterKeywords: {
  name: string
  value: SelectableKeyword
}[] = [
  {
    name: '새해',
    value: 'New Year',
  },
  {
    name: '추석',
    value: 'Thanksgiving',
  },
  {
    name: '크리스마스',
    value: 'Christmas',
  },
  {
    name: '생일',
    value: 'Birthday',
  },
  {
    name: '졸업',
    value: 'Graduation',
  },
  {
    name: '부모의날',
    value: 'Parents Day',
  },
  {
    name: '감사',
    value: 'Thanks',
  },
  {
    name: '사과',
    value: 'Apologize',
  },
  {
    name: '축하',
    value: 'Congratulation',
  },
]

export const paperColors: {
  name: string
  value: SelectablePaperColor
  bgRgba?: string
  hex?: string
}[] = [
  {
    name: '빨간색',
    value: 'red',
    bgRgba: 'rgba(255,0,0,0.5)',
    hex: '#E57373',
  },
  {
    name: '주황색',
    value: 'orange',
    bgRgba: 'rgba(255,165,0,0.5)',
    hex: '#FFD54F',
  },
  {
    name: '노란색',
    value: 'yellow',
    bgRgba: 'rgba(255,255,0,0.5)',
    hex: '#FFF9C4',
  },
  {
    name: '분홍색',
    value: 'pink',
    bgRgba: 'rgba(255,192,203,0.5)',
    hex: '#FCE4EC',
  },
  {
    name: '초록색',
    value: 'green',
    bgRgba: 'rgba(0,128,0,0.5)',
    hex: '#81C784',
  },
  {
    name: '파란색',
    value: 'blue',
    bgRgba: 'rgba(0,0,255,0.5)',
    hex: '#81D4FA',
  },
  {
    name: '보라색',
    value: 'purple',
    bgRgba: 'rgba(128,0,128,0.5)',
    hex: '#D1C4E9',
  },
  {
    name: '검정색',
    value: 'black',
    bgRgba: 'rgba(0,0,0,0.5)',
    hex: '#6F6F6F',
  },
  {
    name: '하얀색',
    value: 'white',
    bgRgba: 'rgba(255,255,255,0.5)',
    hex: '#FFFFFF',
  },
]

export const letterColors: {
  name: string
  value: SelectableLetterColor
  bgRgba?: string
  hex?: string
}[] = [
  {
    name: '빨간색',
    value: 'red',
    bgRgba: 'rgba(255,0,0,0.5)',
    hex: '#E53935',
  },
  {
    name: '주황색',
    value: 'orange',
    bgRgba: 'rgba(255,165,0,0.5)',
    hex: '#FF6F00',
  },
  {
    name: '노란색',
    value: 'yellow',
    bgRgba: 'rgba(255,255,0,0.5)',
    hex: '#FFEB3B',
  },
  {
    name: '분홍색',
    value: 'pink',
    bgRgba: 'rgba(255,192,203,0.5)',
    hex: '#F06292',
  },
  {
    name: '초록색',
    value: 'green',
    bgRgba: 'rgba(0,128,0,0.5)',
    hex: '#43A047',
  },
  {
    name: '파란색',
    value: 'blue',
    bgRgba: 'rgba(0,0,255,0.5)',
    hex: '#1976D2',
  },
  {
    name: '보라색',
    value: 'purple',
    bgRgba: 'rgba(128,0,128,0.5)',
    hex: '#8E24AA',
  },
  {
    name: '검정색',
    value: 'black',
    bgRgba: 'rgba(0,0,0,0.5)',
    hex: '#212121',
  },
  {
    name: '하얀색',
    value: 'white',
    bgRgba: 'rgba(255,255,255,0.5)',
    hex: '#F5F5F5',
  },
]

export const imageColors: {
  name: string
  value: SelectableImageColor
  bgRgba?: string
}[] = [
  {
    name: '빨간색',
    value: 'red',
    bgRgba: 'rgba(255,0,0,0.5)',
  },
  {
    name: '주황색',
    value: 'orange',
    bgRgba: 'rgba(255,165,0,0.5)',
  },
  {
    name: '노란색',
    value: 'yellow',
    bgRgba: 'rgba(255,255,0,0.5)',
  },
  {
    name: '분홍색',
    value: 'pink',
    bgRgba: 'rgba(255,192,203,0.5)',
  },
  {
    name: '초록색',
    value: 'green',
    bgRgba: 'rgba(0,128,0,0.5)',
  },
  {
    name: '파란색',
    value: 'blue',
    bgRgba: 'rgba(0,0,255,0.5)',
  },
  {
    name: '보라색',
    value: 'purple',
    bgRgba: 'rgba(128,0,128,0.5)',
  },
  {
    name: '검정색',
    value: 'black',
    bgRgba: 'rgba(0,0,0,0.5)',
  },
  {
    name: '하얀색',
    value: 'white',
    bgRgba: 'rgba(255,255,255,0.5)',
  },
]

export const imageStyles: {
  name: string
  value: SelectableStyle
}[] = [
  {
    name: '수채화',
    value: 'Water Color',
  },
  {
    name: '유화',
    value: 'Oil Painting',
  },
  {
    name: '팝아트',
    value: 'Pop Art',
  },
  {
    name: '포스터',
    value: 'Posterization',
  },
  {
    name: '스케치',
    value: 'Sketch',
  },
  {
    name: '카툰',
    value: 'Cartoon',
  },
  {
    name: '펜 드로잉',
    value: 'Pen Drawing',
  },
  {
    name: '레트로',
    value: 'Vintage Retro',
  },
  {
    name: '심플',
    value: 'Simple Minimalist',
  },
]
