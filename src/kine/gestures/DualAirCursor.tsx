"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
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

const fingerStraight = (hand: Landmark[], mcpIdx: number, pipIdx: number, dipIdx: number, tipIdx: number) => {
  const mcp = hand[mcpIdx]
  const pip = hand[pipIdx]
  const dip = hand[dipIdx]
  const tip = hand[tipIdx]
  if (!mcp || !pip || !dip || !tip) return false
  const vecA = normalized(vector(mcp, pip))
  const vecB = normalized(vector(pip, dip))
  const vecC = normalized(vector(dip, tip))
  const straightness = Math.min(dot(vecA, vecB), dot(vecB, vecC))
  return straightness > 0.95
}

const fingerRegistry = [
  { name: 'Thumb', indexes: [1, 2, 3, 4] },
  { name: 'Index', indexes: [5, 6, 7, 8] },
  { name: 'Middle', indexes: [9, 10, 11, 12] },
  { name: 'Ring', indexes: [13, 14, 15, 16] },
  { name: 'Pinky', indexes: [17, 18, 19, 20] },
]

interface DualAirCursorProps {
  onSwipeDown?: () => void
  onSwipeUp?: () => void
  cooldownMs?: number
  reverseBlockMs?: number
  minimumFingerSeparation?: number
  blockAfterSwipeMs?: number
}

export const DualAirCursor: React.FC<DualAirCursorProps> = ({
  onSwipeDown,
  onSwipeUp,
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
  const cooldownRef = useRef(false)
  const blockedDirectionRef = useRef<1 | -1 | null>(null)
  const blockUntilRef = useRef(0)
  const blockAllUntilRef = useRef(0)
  const [blockProgress, setBlockProgress] = useState(0)
  const bothBentRef = useRef(false)
  const handLostRef = useRef(true)
  const readyRef = useRef(false)
  const onSwipeDownRef = useRef(onSwipeDown)
  const onSwipeUpRef = useRef(onSwipeUp)
  const [fingerColors, setFingerColors] = useState({
    left: '#3b82f6',
    right: '#3b82f6',
  })
  const [jointLines, setJointLines] = useState<[{ x: number; y: number }, { x: number; y: number }][]>([])
  const [fingerStatus, setFingerStatus] = useState<{
    name: string
    straight: boolean
    undetected?: boolean
  }[]>([])
  const [activeCursors, setActiveCursors] = useState({ left: false, right: false })
  const [lastEvent, setLastEvent] = useState<string>('')

  useEffect(() => {
    onSwipeDownRef.current = onSwipeDown
    onSwipeUpRef.current = onSwipeUp
  }, [onSwipeDown, onSwipeUp])

  const undetectedFingerStatus = useMemo(
    () => fingerRegistry.map(({ name }) => ({ name, straight: false, undetected: true })),
    [],
  )

  useEffect(() => {
    if (!isWebcamActive) return undefined

    let animationFrameId: number

    const loop = () => {
      const landmarks = landmarksRef.current
      if (!landmarks || landmarks.length === 0) {
        opacitySpring.set(0)
        readyRef.current = false
        bothBentRef.current = false
        handLostRef.current = true
        setActiveCursors({ left: false, right: false })
        setJointLines([])
        setFingerStatus(undetectedFingerStatus)
        animationFrameId = requestAnimationFrame(loop)
        return
      }

      const firstHand = landmarks[0]
      const indexPoint = firstHand[8]
      const middlePoint = firstHand[12]

      const justRegained = handLostRef.current
      handLostRef.current = false
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000

      const targetOneX = (1 - indexPoint.x) * windowWidth
      const targetOneY = indexPoint.y * windowHeight
      const targetTwoX = (1 - middlePoint.x) * windowWidth
      const targetTwoY = middlePoint.y * windowHeight

      xOneSpring.set(targetOneX)
      yOneSpring.set(targetOneY)
      xTwoSpring.set(targetTwoX)
      yTwoSpring.set(targetTwoY)
      opacitySpring.set(1)

      const statuses = fingerRegistry.map(({ name, indexes }) => ({
        name,
        straight: fingerStraight(firstHand, indexes[0], indexes[1], indexes[2], indexes[3]),
        undetected: false,
      }))
      setFingerStatus(statuses)
      const indexStatus = statuses.find((f) => f.name === 'Index')
      const middleStatus = statuses.find((f) => f.name === 'Middle')
      const indexActive = Boolean(indexStatus?.straight)
      const middleActive = Boolean(middleStatus?.straight)
      const nextColors = {
        left: indexActive ? '#ffffff' : '#3b82f6',
        right: middleActive ? '#ffffff' : '#3b82f6',
      }
      setFingerColors((prev) =>
        prev.left === nextColors.left && prev.right === nextColors.right ? prev : nextColors,
      )
      const readyToSwipe = indexActive && middleActive
      setActiveCursors({ left: indexActive, right: middleActive })

      const fingerDistance = Math.hypot(indexPoint.x - middlePoint.x, indexPoint.y - middlePoint.y)
      const hasTwoFingers = fingerDistance >= minimumFingerSeparation
      if (!hasTwoFingers) {
        setJointLines([])
        readyRef.current = readyToSwipe
        animationFrameId = requestAnimationFrame(loop)
        bothBentRef.current = false
        return
      }

      const joints: [{ x: number; y: number }, { x: number; y: number }][] = []
      const fingers = [
        [0, 1, 2, 3, 4],
        [0, 5, 6, 7, 8],
        [0, 9, 10, 11, 12],
        [0, 13, 14, 15, 16],
        [0, 17, 18, 19, 20],
      ]
      fingers.forEach((indexes) => {
        for (let i = 0; i < indexes.length - 1; i += 1) {
          const from = firstHand[indexes[i]]
          const to = firstHand[indexes[i + 1]]
          if (from && to) {
            joints.push([
              { x: (1 - from.x) * windowWidth, y: from.y * windowHeight },
              { x: (1 - to.x) * windowWidth, y: to.y * windowHeight },
            ])
          }
        }
      })
      setJointLines(joints)

      const previousReady = readyRef.current
      const wasBothBent = bothBentRef.current && !justRegained
      if (!indexActive && !middleActive && !justRegained) {
        bothBentRef.current = true
      }
      if (readyToSwipe !== previousReady) {
        const now = performance.now()
        const direction: 1 | -1 = readyToSwipe ? -1 : 1
        const blockRemaining = blockAllUntilRef.current - now
        if (blockRemaining > 0) {
          const progress = Math.min(Math.max(blockRemaining / blockAfterSwipeMs, 0), 1)
          setBlockProgress((prev) => (Math.abs(prev - progress) > 0.01 ? progress : prev))
          readyRef.current = readyToSwipe
        } else {
          if (!cooldownRef.current) {
            if (blockedDirectionRef.current !== direction || blockUntilRef.current <= now) {
              if (direction === 1) {
                onSwipeDownRef.current?.()
                setLastEvent('Swipe Down')
              } else if (wasBothBent) {
                onSwipeUpRef.current?.()
                setLastEvent('Swipe Up')
                bothBentRef.current = false
              }
            }
          }
          blockedDirectionRef.current = direction === 1 ? -1 : 1
          blockUntilRef.current = now + reverseBlockMs
          cooldownRef.current = true
          window.setTimeout(() => {
            cooldownRef.current = false
          }, cooldownMs)
          blockAllUntilRef.current = now + blockAfterSwipeMs
          setBlockProgress(1)
          readyRef.current = readyToSwipe
        }
      } else {
        const blockRemaining = blockAllUntilRef.current - performance.now()
        if (blockRemaining > 0) {
          const progress = Math.min(Math.max(blockRemaining / blockAfterSwipeMs, 0), 1)
          setBlockProgress((prev) => (Math.abs(prev - progress) > 0.01 ? progress : prev))
        } else {
          setBlockProgress((prev) => (prev > 0 ? 0 : prev))
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [cooldownMs, isWebcamActive, landmarksRef, opacitySpring, reverseBlockMs, xOneSpring, xTwoSpring, yOneSpring, yTwoSpring, blockAfterSwipeMs])

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
  const leftColor = fingerColors.left
  const rightColor = fingerColors.right
  return (
    <>
      {activeCursors.left && (
        <div style={{ opacity: isBlocked ? 0.3 : 1 }}>
          <motion.div
            aria-hidden
            style={{
              ...cursorStyle(leftColor),
              x: xOneSpring,
              y: yOneSpring,
              opacity: opacitySpring,
            }}
            transition={{ duration: 0.15 }}
          />
        </div>
      )}
      {activeCursors.right && (
        <div style={{ opacity: isBlocked ? 0.3 : 1 }}>
          <motion.div
            aria-hidden
            style={{
              ...cursorStyle(rightColor),
              x: xTwoSpring,
              y: yTwoSpring,
              opacity: opacitySpring,
            }}
            transition={{ duration: 0.15 }}
          />
        </div>
      )}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 100000,
        }}
      >
        {jointLines.map((joint, index) => (
          <line
            key={index}
            x1={joint[0].x}
            y1={joint[0].y}
            x2={joint[1].x}
            y2={joint[1].y}
            stroke="#ffffff"
            strokeWidth={2}
          />
        ))}
      </svg>
      {fingerStatus.length > 0 && (
        <div
          style={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 12,
            padding: '8px 12px',
            color: '#f8fafc',
            fontSize: 12,
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span>Active casors: {(activeCursors.left ? 1 : 0) + (activeCursors.right ? 1 : 0)}</span>
          <span>Last event: {lastEvent || '—'}</span>
          {fingerStatus.map((finger) => (
            <span key={finger.name}>
              {finger.name}:{' '}
              {finger.undetected ? 'undetected' : finger.straight ? 'straight' : 'bent'}
            </span>
          ))}
        </div>
      )}
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
