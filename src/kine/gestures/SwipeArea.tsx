"use client"

import React, { useEffect, useRef } from 'react'
import { useKine } from './KineProvider'

interface SwipeAreaProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  velocityThreshold?: number
  verticalVelocityThreshold?: number
  className?: string
}

export const SwipeArea: React.FC<SwipeAreaProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  velocityThreshold = 0.15,
  verticalVelocityThreshold = 0.1,
  className = '',
}) => {
  const { landmarksRef, isWebcamActive } = useKine()
  const historyRef = useRef<number[]>([])
  const verticalHistoryRef = useRef<number[]>([])
  const cooldownRef = useRef(false)
  const onSwipeLeftRef = useRef(onSwipeLeft)
  const onSwipeRightRef = useRef(onSwipeRight)
  const onSwipeUpRef = useRef(onSwipeUp)
  const onSwipeDownRef = useRef(onSwipeDown)

  useEffect(() => {
    onSwipeLeftRef.current = onSwipeLeft
  }, [onSwipeLeft])

  useEffect(() => {
    onSwipeRightRef.current = onSwipeRight
  }, [onSwipeRight])

  useEffect(() => {
    onSwipeUpRef.current = onSwipeUp
  }, [onSwipeUp])

  useEffect(() => {
    onSwipeDownRef.current = onSwipeDown
  }, [onSwipeDown])

  useEffect(() => {
    if (!isWebcamActive) return undefined

    let animationFrameId: number

    const loop = () => {
      if (cooldownRef.current) {
        animationFrameId = requestAnimationFrame(loop)
        return
      }

      const landmarks = landmarksRef.current
      if (landmarks && landmarks.length > 0) {
        const palm = landmarks[0][0]
        const currentX = palm.x
        const currentY = palm.y
        const history = historyRef.current
        const verticalHistory = verticalHistoryRef.current

        history.push(currentX)
        verticalHistory.push(currentY)
        if (history.length > 15) {
          history.shift()
        }
        if (verticalHistory.length > 15) {
          verticalHistory.shift()
        }

        if (history.length === 15) {
          const oldestX = history[0]
          const newestX = history[14]
          const deltaX = newestX - oldestX
          const oldestY = verticalHistory[0]
          const newestY = verticalHistory[14]
          const deltaY = newestY - oldestY

          if (Math.abs(deltaX) > velocityThreshold) {
            if (deltaX > 0) {
              onSwipeLeftRef.current?.()
            } else {
              onSwipeRightRef.current?.()
            }

            cooldownRef.current = true
            historyRef.current = []
            verticalHistoryRef.current = []
            window.setTimeout(() => {
              cooldownRef.current = false
            }, 800)
          } else if (Math.abs(deltaY) > verticalVelocityThreshold) {
            if (deltaY > 0) {
              onSwipeDownRef.current?.()
            } else {
              onSwipeUpRef.current?.()
            }

            cooldownRef.current = true
            historyRef.current = []
            verticalHistoryRef.current = []
            window.setTimeout(() => {
              cooldownRef.current = false
            }, 800)
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isWebcamActive, landmarksRef, velocityThreshold])

  return (
    <div className={`swipeAreaRoot ${className}`}>{children}</div>
  )
}
