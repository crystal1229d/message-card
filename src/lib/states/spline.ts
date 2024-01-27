import { create } from 'zustand'

interface LetterSplineState {
  isSplineRendered: boolean
  isLightOn: boolean
  // isWriting: boolean
}

const initialLetterSplineState = {
  isSplineRendered: false,
  isLightOn: false,
  // isWriting: false,
}

export interface LetterSplineActions extends LetterSplineState {
  setIsSplineRendered: (isSplineRendered: boolean) => void
  setIsLightOn: (isLightOn: boolean) => void
  // setIsWriting: (
  //   isWritng: boolean,
  //   splineRef: RefObject<SplineApp | null>,
  // ) => void
}

const useLetterSplineStore = create<LetterSplineState & LetterSplineActions>(
  (set, get) => ({
    ...initialLetterSplineState,
    setIsSplineRendered: (isSplineRendered) => set({ isSplineRendered }),
    setIsLightOn: (isLightOn) => set({ isLightOn }),
    // setIsWriting: (isWriting, splineRef) => {
    //   set({ isWriting })
    //   splineRef.current?.setVariable('isWriting', isWriting)
    // },
  }),
)

export default useLetterSplineStore
