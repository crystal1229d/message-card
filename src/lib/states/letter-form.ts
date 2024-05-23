import { MutableRefObject } from 'react'
import { LetterFormSteps } from '../constants/form'
import {
  SelectableImageColor,
  SelectableKeyword,
  SelectableLetterColor,
  SelectablePaperColor,
  SelectableStyle,
} from '../constants/letter'
import { create } from 'zustand'
import { toPng } from 'html-to-image'

interface LetterFormState {
  letterFormStep: number

  from: string
  to: string
  message: string
  image: string
  paperColor: string
  letterColor: string

  imageKeyword: string
  imageColor: string
  imageStyle: string
  imageDescription: string
}

const initialLetterFormState = {
  letterFormStep: 1 as LetterFormSteps,

  from: '',
  to: '',
  message: '',
  image: '',
  paperColor: 'white' as SelectablePaperColor,
  letterColor: 'black' as SelectableLetterColor,

  imageKeyword: 'Christmas' as SelectableKeyword,
  imageColor: 'red' as SelectableImageColor,
  imageStyle: 'Water Color' as SelectableStyle,
  imageDescription: '',
}

export interface LetterFormActions extends LetterFormState {
  setLetterFormStep: (letterFormStep: number) => void

  setFrom: (from: string) => void
  setTo: (to: string) => void
  setMessage: (message: string) => void
  setImage: (message: string) => void
  setPaperColor: (paperColor: string) => void
  setLetterColor: (letterColor: string) => void

  setImageKeyword: (imageKeyword: string) => void
  setImageColor: (imageColor: string) => void
  setImageStyle: (imageStyle: string) => void
  setImageDescription: (imageDescription: string) => void
  resetLetter: () => void

  generateAIImage: () => void
  exportToImage: (ref: MutableRefObject<HTMLDivElement | null>) => void
  shareOnSns: (ref: MutableRefObject<HTMLDivElement | null>) => void
}

const useLetterFormStore = create<LetterFormState & LetterFormActions>(
  (set, get) => ({
    ...initialLetterFormState,
    setLetterFormStep: (letterFormStep) => set({ letterFormStep }),

    setFrom: (from) => set({ from }),
    setTo: (to) => set({ to }),
    setMessage: (message) => set({ message }),
    setImage: (image) => set({ image }),
    setPaperColor: (paperColor) => set({ paperColor }),
    setLetterColor: (letterColor) => set({ letterColor }),

    setImageKeyword: (imageKeyword) => set({ imageKeyword }),
    setImageColor: (imageColor) => set({ imageColor }),
    setImageStyle: (imageStyle) => set({ imageStyle }),
    setImageDescription: (imageDescription) => set({ imageDescription }),

    resetLetter: () => {
      set(initialLetterFormState)
      set({ letterFormStep: 2 })
    },

    generateAIImage: async () => {
      set({ letterFormStep: 5 })
      try {
        const response = await fetch('/api/letter/create-image', {
          method: 'POST',
          body: JSON.stringify({
            keyword: get().imageKeyword,
            color: get().imageColor,
            style: get().imageStyle,
            additionalDescription: get().imageDescription,
          }),
        })
        const res = await response.json()
        if (res.images.length > 0) set({ image: res.images[0].image })
      } catch (e) {
        console.log(e)
      } finally {
        set({ letterFormStep: 6 })
      }
    },
    exportToImage: (ref) => {
      if (ref.current === null) return
      toPng(ref.current, { cacheBust: false })
        .then((url) => {
          let link = document.createElement('a')
          link.download = 'my_letter.png'
          link.href = url
          link.click()
          link.remove()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    shareOnSns: async (ref) => {
      // 이미지 공유 : 이미지파일생성 -> 업로드 -> 공유 -> 삭제
      const { Kakao } = window

      if (ref.current === null) return

      try {
        // 1. 이미지파일 생성
        const url = await toPng(ref.current)

        // base64 data => Blob
        const blobBin = atob(url.split(',')[1])
        let array = []
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i))
        }
        const blob = new Blob([new Uint8Array(array)], { type: 'image/png' })

        // Blob => File object
        const file = new File([blob], 'my_letter.png', {
          type: 'image/png',
        })
        const imageFile = [file]

        // 2. 업로드 (카카오서버)
        const uploadedImage = await Kakao.Share.uploadImage({
          file: imageFile,
        })
        const uploadedImageUrl = uploadedImage.infos.original.url

        // 3. 공유
        Kakao.Share.sendScrap({
          requestUrl: 'http://localhost:3000', // const { location } = window; requestUrl: location.href
          templateId: 103472,
          templateArgs: {
            THUMB: uploadedImageUrl,
            TITLE: '편지가 도착했어요!',
            CONTENT: `${get().from} / ${get().to}`,
          },
        })

        // 4. 삭제 (카카오서버)
        Kakao.Share.deleteImage({
          uploadedImageUrl,
        })
      } catch (error) {
        console.log(error)
      }
    },
  }),
)

export default useLetterFormStore
