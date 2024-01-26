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
  // setIsWriting: (
  //   isWritng: boolean,
  //   splineRef: RefObject<SplineApp | null>,
  // ) => void
  // setIsDrawing: (
  //   isDrawing: boolean,
  //   splineRef: RefObject<SplineApp | null>,
  // ) => void
  // setIsImageGenerating: (
  //   isImageGenerating: boolean,
  //   splineRef: RefObject<SplineApp | null>,
  // ) => void
  // setIsSealing: (
  //   isSealing: boolean,
  //   splineRef: RefObject<SplineApp | null>,
  // ) => void
  setStatesBasedOnLetterFormStep: (
    letterFormStep: number,
    splineRef: RefObject<SplineApp | null>,
  ) => void
}

const useLetterSplineStore = create<LetterSplineState & LetterSplineActions>(
  (set, get) => ({
    ...initialLetterSplineState,
    setIsRendered: (isRendered) => set({ isRendered }),
    // setIsWriting: (isWriting, splineRef) => {
    //   set({ isWriting })
    //   splineRef.current?.setVariable('isWriting', isWriting)
    // },
    // setIsDrawing: (isDrawing, splineRef) => {
    //   set({ isDrawing })
    //   splineRef.current?.setVariable('isDrawing', isDrawing)
    // },
    // setIsImageGenerating: (isImageGenerating, splineRef) => {
    //   set({ isImageGenerating })
    //   splineRef.current?.setVariable('isImageGenerating', isImageGenerating)
    // },
    // setIsSealing: (isSealing, splineRef) => {
    //   set({ isSealing })
    //   splineRef.current?.setVariable('isSealing', isSealing)
    // },
    setStatesBasedOnLetterFormStep: (letterFormStep, splineRef) => {
      switch (letterFormStep) {
        case 1:
          set({
            isWriting: false,
            isDrawing: false,
            isImageGenerating: false,
            isSealing: false,
          })
          break
        case 2:
          set({
            isWriting: true,
            isDrawing: false,
            isImageGenerating: false,
            isSealing: false,
          })
          break
        case 4:
          set({
            isWriting: false,
            isDrawing: true,
            isImageGenerating: false,
            isSealing: false,
          })
          break
        case 5:
          set({
            isWriting: false,
            isDrawing: false,
            isImageGenerating: true,
            isSealing: false,
          })
          break
        case 6:
          set({
            isWriting: false,
            isDrawing: false,
            isImageGenerating: false,
            isSealing: true,
          })
          break
        default:
          break
      }

      splineRef.current?.setVariable('isWriting', get().isWriting)
      splineRef.current?.setVariable('isDrawing', get().isDrawing)
      splineRef.current?.setVariable(
        'isImageGenerating',
        get().isImageGenerating,
      )
      splineRef.current?.setVariable('isSealing', get().isSealing)
    },
  }),
)

export default useLetterSplineStore
