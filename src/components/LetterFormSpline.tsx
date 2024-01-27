'use client'

import Spline, { SplineEvent } from '@splinetool/react-spline'
import { Application as SplineApp } from '@splinetool/runtime'
import { SCENE } from '../lib/constants/spline'
import useLetterSplineStore from '../lib/states/spline'

export interface LetterFormSplineProps {
  splineRef: React.MutableRefObject<SplineApp | null>
}

export const LetterFormSpline: React.FC<LetterFormSplineProps> = ({
  splineRef,
}) => {
  const { setIsSplineRendered, isLightOn } = useLetterSplineStore()

  const handleLoad = (spline: SplineApp) => {
    if (spline) splineRef.current = spline
  }
  const handleMouseUp = (event: SplineEvent) => {}
  const handleMouseDown = (event: SplineEvent) => {
    // if (event.target.name === 'lamp button') {
    //   splineRef.current?.setVariable('isLightOn', !isLightOn)
    // }
  }
  const handleMouseMove = () => setIsSplineRendered(true)

  return (
    <Spline
      className="flex items-center justify-center"
      scene={SCENE}
      onLoad={handleLoad}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    />
  )
}
