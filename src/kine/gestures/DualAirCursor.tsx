"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useKine } from './KineProvider'

type Landmark = { x: number; y: number; z: number }

const vector = (a: Landmark, b: Landmark) => ({
  x: b.x - a.x,
  y: b.y - a.y,
  z: b.z - a.z,
})

const length = (v: Landmark) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)

const normalized = (v: Landmark) => {
  const len = length(v)
  if (len === 0) return { x: 0, y: 0, z: 0 }
  return { x: v.x / len, y: v.y / len, z: v.z / len }
}

const dot = (a: Landmark, b: Landmark) => a.x * b.x + a.y * b.y + a.z * b.z

const nailVisible = (
  hand: Landmark[],
  mcpIdx: number,
  pipIdx: number,
  dipIdx: number,
  tipIdx: number,
) => {
  const mcp = hand[mcpIdx]
  const pip = hand[pipIdx]
  const dip = hand[dipIdx]
  const tip = hand[tipIdx]
  if (!mcp || !pip || !dip || !tip) return false
  const vecA = normalized(vector(mcp, pip))
  const vecB = normalized(vector(pip, dip))
  const vecC = normalized(vector(dip, tip))
  const straightness = Math.min(dot(vecA, vecB), dot(vecB, vecC))
  return straightness > 0.95 && tip.z < pip.z - 0.02
}

interface DualAirCursorProps {
  onSwipeDown?: () => void
  onSwipeUp?: () => void
  dualStrokeColor?: [string, string]
  verticalThreshold?: number
  minFrames?: number
  cooldownMs?: number
  reverseBlockMs?: number
  minimumFingerSeparation?: number
  blockAfterSwipeMs?: number
}

export const DualAirCursor: React.FC<DualAirCursorProps> = ({
  onSwipeDown,
  onSwipeUp,
  dualStrokeColor = ['#10b981', '#3b82f6'],
  verticalThreshold = 0.35,
  minFrames = 12,
  cooldownMs = 800,
  reverseBlockMs = 400,
  minimumFingerSeparation = 0.04,
  blockAfterSwipeMs = 2000,
}) => {
  const { landmarksRef, isWebcamActive } = useKine()
  const xOneSpring = useSpring(0, { stiffness: 1000, damping: 50 })
  const yOneSpring = useSpring(0, { stiffness: 1000, damping: 50 })
  const xTwoSpring = useSpring(0, { stiffness: 1000, damping: 50 })
  const yTwoSpring = useSpring(0, { stiffness: 1000, damping: 50 })
  const opacitySpring = useSpring(0, { stiffness: 200, damping: 50 })
  const historyRef = useRef<number[]>([])
  const cooldownRef = useRef(false)
  const blockedDirectionRef = useRef<1 | -1 | null>(null)
  const blockUntilRef = useRef(0)
  const blockAllUntilRef = useRef(0)
  const [blockProgress, setBlockProgress] = useState(0)
  const [fingerColors, setFingerColors] = useState({
    left: '#3b82f6',
    right: '#3b82f6',
  })
  const onSwipeDownRef = useRef(onSwipeDown)
  const onSwipeUpRef = useRef(onSwipeUp)

  useEffect(() => {
    onSwipeDownRef.current = onSwipeDown
    onSwipeUpRef.current = onSwipeUp
  }, [onSwipeDown, onSwipeUp])

  useEffect(() => {
    if (!isWebcamActive) return undefined

    let animationFrameId: number

    const loop = () => {
      const landmarks = landmarksRef.current
      if (landmarks && landmarks.length > 0) {
        const firstHand = landmarks[0]
        let leftIndex = firstHand[8]
        let rightIndex = firstHand[12]

        if (landmarks.length >= 2) {
          const secondHand = landmarks[1]
          rightIndex = secondHand[8]
        }

        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000

        const targetOneX = (1 - leftIndex.x) * windowWidth
        const targetOneY = leftIndex.y * windowHeight
        const targetTwoX = (1 - rightIndex.x) * windowWidth
        const targetTwoY = rightIndex.y * windowHeight

        xOneSpring.set(targetOneX)
        yOneSpring.set(targetOneY)
        xTwoSpring.set(targetTwoX)
        yTwoSpring.set(targetTwoY)
        opacitySpring.set(1)

        const averageY = (leftIndex.y + rightIndex.y) / 2
        const fingerDistance = Math.hypot(leftIndex.x - rightIndex.x, leftIndex.y - rightIndex.y)
        const hasTwoFingers = fingerDistance >= minimumFingerSeparation
        if (!hasTwoFingers) {
          historyRef.current = []
        } else {
              const history = historyRef.current
          history.push(averageY)
          if (history.length > minFrames) {
            history.shift()
          }
          const leftNail = nailVisible(firstHand, 5, 6, 7, 8)
          const rightHand = landmarks.length >= 2 ? landmarks[1] : firstHand
          const rightNail = nailVisible(rightHand, 5, 6, 7, 8)
          const nextColors = {
            left: leftNail ? '#ffffff' : '#3b82f6',
            right: rightNail ? '#ffffff' : '#3b82f6',
          }
          setFingerColors((prev) =>
            prev.left === nextColors.left && prev.right === nextColors.right ? prev : nextColors,
          )

          const now = performance.now()
          const blockRemaining = blockAllUntilRef.current - now
          if (blockRemaining > 0) {
            const progress = Math.min(Math.max(blockRemaining / blockAfterSwipeMs, 0), 1)
            setBlockProgress((prev) => (Math.abs(prev - progress) > 0.01 ? progress : prev))
            animationFrameId = requestAnimationFrame(loop)
            return
          }
          setBlockProgress((prev) => (prev > 0 ? 0 : prev))

          if (!cooldownRef.current && history.length === minFrames) {
            const delta = history[history.length - 1] - history[0]
            if (Math.abs(delta) > verticalThreshold) {
              const direction: 1 | -1 = delta > 0 ? 1 : -1
              if (blockedDirectionRef.current === direction && blockUntilRef.current > now) {
                // still blocked after a recent reverse swipe
              } else {
                if (delta > 0) {
                  onSwipeDownRef.current?.()
                } else {
                  onSwipeUpRef.current?.()
                }
              }
              blockedDirectionRef.current = direction === 1 ? -1 : 1
              blockUntilRef.current = now + reverseBlockMs
              cooldownRef.current = true
              historyRef.current = []
              window.setTimeout(() => {
                cooldownRef.current = false
              }, cooldownMs)
              blockAllUntilRef.current = now + blockAfterSwipeMs
            }
          }
        }
      } else {
        opacitySpring.set(0)
        historyRef.current = []
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [cooldownMs, historyRef, isWebcamActive, landmarksRef, minFrames, opacitySpring, verticalThreshold, xOneSpring, xTwoSpring, yOneSpring, yTwoSpring, blockAfterSwipeMs])

  if (!isWebcamActive) return null

  const cursorStyle = (color: string) => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderRadius: '9999px',
    border: '2px solid white',
    background: color,
    pointerEvents: 'none' as const,
    zIndex: 99999,
    translateX: '-50%',
    translateY: '-50%',
  })

  const cooldownRatio = Math.min(Math.max(1 - blockProgress, 0), 1)
  const indicatorRadius = 12
  const circumference = 2 * Math.PI * indicatorRadius
  const dashOffset = circumference * (1 - cooldownRatio)

  const isBlocked = blockProgress > 0
  return (
    <>
      <div style={{ opacity: isBlocked ? 0.3 : 1 }}>
        <motion.div
          aria-hidden
          style={{
            ...cursorStyle(dualStrokeColor[0]),
            x: xOneSpring,
            y: yOneSpring,
            opacity: opacitySpring,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
      <div style={{ opacity: isBlocked ? 0.3 : 1 }}>
        <motion.div
          aria-hidden
          style={{
            ...cursorStyle(dualStrokeColor[1]),
            x: xTwoSpring,
            y: yTwoSpring,
            opacity: opacitySpring,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
      {blockProgress > 0 && (
        <div
          aria-hidden
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 48,
            height: 48,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 100000,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <svg width={40} height={40} role="presentation">
            <circle
              cx={20}
              cy={20}
              r={indicatorRadius}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={3}
              fill="none"
            />
            <circle
              cx={20}
              cy={20}
              r={indicatorRadius}
              stroke="url(#coolgrad)"
              strokeWidth={3}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="coolgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </>
  )
}
