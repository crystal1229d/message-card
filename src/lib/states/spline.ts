import { RefObject } from 'react'
import { create } from 'zustand'
import { Application as SplineApp } from '@splinetool/runtime'

interface LetterSplineState {
  isRendered: boolean
  isWriting: boolean
  isDrawing: boolean
  isImageGenerating: boolean
  isSealing: boolean
}

const initialLetterSplineState = {
  isRendered: false,
  isWriting: false,
  isDrawing: false,
  isImageGenerating: false,
  isSealing: false,
}

export interface LetterSplineActions extends LetterSplineState {
  setIsRendered: (isRendered: boolean) => void
  setIsWriting: (
    isWritng: boolean,
    splineRef: RefObject<SplineApp | null>,
  ) => void
  setIsDrawing: (isDrawing: boolean) => void
  setIsImageGenerating: (isImageGenerating: boolean) => void
  setIsSealing: (isSealing: boolean) => void
}

const useLetterSplineStore = create<LetterSplineState & LetterSplineActions>(
  (set) => ({
    ...initialLetterSplineState,
    setIsRendered: (isRendered) => set({ isRendered }),
    setIsWriting: (isWriting, splineRef) => {
      set({ isWriting })
      splineRef.current?.setVariable('isWriting', isWriting)
    },
    setIsDrawing: (isDrawing) => set({ isDrawing }),
    setIsImageGenerating: (isImageGenerating) => set({ isImageGenerating }),
    setIsSealing: (isSealing) => set({ isSealing }),
  }),
)

export default useLetterSplineStore
