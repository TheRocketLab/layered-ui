"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useKine } from './KineProvider'

interface AirCursorProps {
  depthClickThreshold?: number
  activeColor?: string
  idleColor?: string
  visible?: boolean
}

export const AirCursor: React.FC<AirCursorProps> = ({
  depthClickThreshold = -0.05,
  activeColor = '#10b981',
  idleColor = '#000000',
  visible = true,
}) => {
  const { landmarksRef, isWebcamActive } = useKine()
  const [isClicking, setIsClicking] = useState(false)
  const clickDebounceRef = useRef(false)

  const xSpring = useSpring(0, { stiffness: 300, damping: 20 })
  const ySpring = useSpring(0, { stiffness: 300, damping: 20 })
  const opacitySpring = useSpring(0, { stiffness: 300, damping: 20 })

  useEffect(() => {
    if (!isWebcamActive) return undefined

    let animationFrameId: number

    const loop = () => {
      const landmarks = landmarksRef.current
      if (landmarks && landmarks.length > 0) {
        opacitySpring.set(1)
        const indexTip = landmarks[0][8]

        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000

        const targetX = (1 - indexTip.x) * windowWidth
        const targetY = indexTip.y * windowHeight

        xSpring.set(targetX)
        ySpring.set(targetY)

        const isCloseEnough = indexTip.z < depthClickThreshold
        if (isCloseEnough) {
          setIsClicking((currentIsClicking) => {
            if (!currentIsClicking) {
              if (!clickDebounceRef.current) {
                clickDebounceRef.current = true
                const el = document.elementFromPoint(targetX, targetY)
                if (el && el instanceof HTMLElement) {
                  el.click()
                }
                setTimeout(() => {
                  clickDebounceRef.current = false
                }, 500)
              }
              return true
            }
            return currentIsClicking
          })
        } else {
          setIsClicking((currentIsClicking) => (currentIsClicking ? false : currentIsClicking))
        }
      } else {
        opacitySpring.set(0)
        setIsClicking((currentIsClicking) => (currentIsClicking ? false : currentIsClicking))
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isWebcamActive, landmarksRef, xSpring, ySpring, opacitySpring])

  if (!isWebcamActive || !visible) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: xSpring,
        y: ySpring,
        opacity: opacitySpring,
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: isClicking ? activeColor : idleColor,
        border: '2px solid white',
        pointerEvents: 'none',
        zIndex: 99999,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isClicking ? 0.8 : 1,
      }}
      transition={{ duration: 0.15 }}
    />
  )
}
