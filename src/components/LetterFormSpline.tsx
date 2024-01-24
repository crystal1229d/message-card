'use client'

import Spline, { SplineEvent } from '@splinetool/react-spline'
import { Application as SplineApp } from '@splinetool/runtime'
import { SCENE } from '../lib/constants/spline'

export interface LetterFormSplineProps {
  splineRef: React.MutableRefObject<SplineApp | null>
}

export const LetterFormSpline = (props: LetterFormSplineProps) => {
  const { splineRef } = props

  const handleLoad = (spline: SplineApp) => {
    if (spline) splineRef.current = spline
  }
  const handleMouseUp = (event: SplineEvent) => {}
  const handleMouseDown = (event: SplineEvent) => {}
  const handleMouseMove = () => {}

  // const handleIsWriting = (state: boolean) => {
  //     splineRef.current?.setVariable('isWriting', state);
  // }

  return (
    <Spline
      scene={SCENE}
      onLoad={handleLoad}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    />
  )
}
