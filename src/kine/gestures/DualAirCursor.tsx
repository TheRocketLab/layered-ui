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

const HAND_LIMIT = 2
const PRIMARY_FINGERS = ['index', 'middle'] as const
const PRIMARY_FINGER_INDEXES: Record<typeof PRIMARY_FINGERS[number], number[]> = {
  index: [5, 6, 7, 8],
  middle: [9, 10, 11, 12],
}
const TIP_INDEXES: Record<typeof PRIMARY_FINGERS[number], number> = {
  index: 8,
  middle: 12,
}
const HAND_COLORS = ['#3b82f6', '#22d3ee']
const trackedFingerKeys = Array.from({ length: HAND_LIMIT }, (_, handId) =>
  PRIMARY_FINGERS.map((finger) => ({
    handId,
    finger,
    key: `hand${handId}-${finger}`,
  })),
).flat()

type FingerStatus = {
  name: string
  straight: boolean
  undetected?: boolean
}

type HandTrackMeta = {
  bothBent: boolean
  ready: boolean
  present: boolean
  isLeft: boolean
}

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
  const cursorSpringConfig = { stiffness: 1000, damping: 50 }
  const cursorSprings = trackedFingerKeys.map(() => ({
    x: useSpring(0, cursorSpringConfig),
    y: useSpring(0, cursorSpringConfig),
  }))
  const cursorSpringsRef = useRef(cursorSprings)
  cursorSpringsRef.current = cursorSprings
  const opacitySpring = useSpring(0, { stiffness: 200, damping: 50 })
  const cooldownRef = useRef(false)
  const blockedDirectionRef = useRef<1 | -1 | null>(null)
  const blockUntilRef = useRef(0)
  const blockAllUntilRef = useRef(0)
  const [blockProgress, setBlockProgress] = useState(0)
  const handMetaRef = useRef<HandTrackMeta[]>(
    Array.from({ length: HAND_LIMIT }, () => ({ bothBent: false, ready: false, present: false, isLeft: false })),
  )
  const leftHandIdRef = useRef(-1)
  const readyRef = useRef(false)
  const onSwipeDownRef = useRef(onSwipeDown)
  const onSwipeUpRef = useRef(onSwipeUp)
  const [jointLines, setJointLines] = useState<[{ x: number; y: number }, { x: number; y: number }][]>([])
  const [fingerStatus, setFingerStatus] = useState<FingerStatus[]>([])
  const [activeCursorKeys, setActiveCursorKeys] = useState<string[]>([])
  const [lastEvent, setLastEvent] = useState<string>('')
  const [handLabels, setHandLabels] = useState<{ handId: number; label: string; x: number; y: number }[]>([])

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
        handMetaRef.current = Array.from({ length: HAND_LIMIT }, () => ({ bothBent: false, ready: false, present: false, isLeft: false }))
        setJointLines([])
        setFingerStatus(undetectedFingerStatus)
        setActiveCursorKeys([])
        animationFrameId = requestAnimationFrame(loop)
        return
      }

      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
      const primaryHandIndex = landmarks.findIndex((hand) => Boolean(hand && hand.length))
      const primaryHand = primaryHandIndex !== -1 ? landmarks[primaryHandIndex] : null

      const handCandidates = landmarks
        .map((hand, handId) => {
          if (!hand || hand.length === 0) return null
          const thumbTip = hand[4]
          if (!thumbTip) return null
          const left = thumbTip.x > 0.5
          return { handId, left }
        })
        .filter(Boolean) as { handId: number; left: boolean }[]
      const leftCandidate = handCandidates.find((candidate) => candidate.left)
      if (leftCandidate) {
        leftHandIdRef.current = leftCandidate.handId
      } else {
        const activeHandIds = handCandidates.map((candidate) => candidate.handId)
        if (!activeHandIds.includes(leftHandIdRef.current)) {
          leftHandIdRef.current = -1
        }
      }
      const leftHandId = leftHandIdRef.current

      const statuses = primaryHand
        ? fingerRegistry.map(({ name, indexes }) => ({
            name,
            straight: fingerStraight(primaryHand, indexes[0], indexes[1], indexes[2], indexes[3]),
            undetected: false,
          }))
        : undetectedFingerStatus
      setFingerStatus(statuses)

      const joints: [{ x: number; y: number }, { x: number; y: number }][] = []
      const fingers = [
        [0, 1, 2, 3, 4],
        [0, 5, 6, 7, 8],
        [0, 9, 10, 11, 12],
        [0, 13, 14, 15, 16],
        [0, 17, 18, 19, 20],
      ]
      landmarks.forEach((hand) => {
        if (!hand) return
        fingers.forEach((indexes) => {
          for (let i = 0; i < indexes.length - 1; i += 1) {
            const from = hand[indexes[i]]
            const to = hand[indexes[i + 1]]
            if (from && to) {
              joints.push([
                { x: (1 - from.x) * windowWidth, y: from.y * windowHeight },
                { x: (1 - to.x) * windowWidth, y: to.y * windowHeight },
              ])
            }
          }
        })
      })
      setJointLines(joints)

      const labels = landmarks
        .map((hand, handId) => ({ hand, handId }))
        .filter(({ hand }) => Boolean(hand && hand.length))
        .map(({ hand, handId }) => ({
          handId,
          label: handId === leftHandId ? 'LEFT' : 'RIGHT',
          x: (1 - hand[0].x) * windowWidth,
          y: hand[0].y * windowHeight,
        }))
      setHandLabels(labels)

      const activeKeys: string[] = []
      trackedFingerKeys.forEach((entry, index) => {
        const handLandmarks = landmarks[entry.handId]
        if (!handLandmarks) return
        const indexes = PRIMARY_FINGER_INDEXES[entry.finger]
        const straight = fingerStraight(handLandmarks, indexes[0], indexes[1], indexes[2], indexes[3])
        if (!straight) return
        const tip = handLandmarks[TIP_INDEXES[entry.finger]]
        if (!tip) return
        const targetX = (1 - tip.x) * windowWidth
        const targetY = tip.y * windowHeight
        const spring = cursorSpringsRef.current[index]
        if (!spring) return
        spring.x.set(targetX)
        spring.y.set(targetY)
        activeKeys.push(entry.key)
      })
      setActiveCursorKeys(activeKeys)
      opacitySpring.set(activeKeys.length > 0 ? 1 : 0)

      const prevMeta = handMetaRef.current
      const currentMeta = prevMeta.map((meta, handId) => {
        const handLandmarks = landmarks[handId]
        if (!handLandmarks) {
          return { bothBent: false, ready: false, present: false, isLeft: false }
        }
        const indexStraight = fingerStraight(
          handLandmarks,
          PRIMARY_FINGER_INDEXES.index[0],
          PRIMARY_FINGER_INDEXES.index[1],
          PRIMARY_FINGER_INDEXES.index[2],
          PRIMARY_FINGER_INDEXES.index[3],
        )
        const middleStraight = fingerStraight(
          handLandmarks,
          PRIMARY_FINGER_INDEXES.middle[0],
          PRIMARY_FINGER_INDEXES.middle[1],
          PRIMARY_FINGER_INDEXES.middle[2],
          PRIMARY_FINGER_INDEXES.middle[3],
        )
        const fingerDistance = Math.hypot(
          handLandmarks[PRIMARY_FINGER_INDEXES.index[3]].x - handLandmarks[PRIMARY_FINGER_INDEXES.middle[3]].x,
          handLandmarks[PRIMARY_FINGER_INDEXES.index[3]].y - handLandmarks[PRIMARY_FINGER_INDEXES.middle[3]].y,
        )
        const separated = fingerDistance >= minimumFingerSeparation
        const isLeft = handId === leftHandId
        const ready = isLeft && indexStraight && middleStraight && separated
        const bothBent = !indexStraight && !middleStraight ? true : meta.bothBent
        return { bothBent, ready, present: true, isLeft }
      })
      const handJustRegained = prevMeta.map((meta, handId) => !meta.present && currentMeta[handId].present)
      const leftHandIndex = currentMeta.findIndex((meta) => meta.isLeft)
      const leftHandMeta = leftHandIndex !== -1 ? currentMeta[leftHandIndex] : { bothBent: false, ready: false, present: false, isLeft: false }
      const readyToSwipe = leftHandMeta.ready
      const previousReady = readyRef.current
      const leftHandRegained = leftHandIndex !== -1 ? handJustRegained[leftHandIndex] : false
      const wasBothBent = leftHandMeta.bothBent && !leftHandRegained
      const readyHandIndex = leftHandIndex
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
              if (direction === 1 && previousReady && !leftHandRegained && leftHandMeta.bothBent) {
                onSwipeDownRef.current?.()
                setLastEvent('Swipe Down')
              } else if (wasBothBent && readyHandIndex !== -1) {
                onSwipeUpRef.current?.()
                setLastEvent('Swipe Up')
                currentMeta[readyHandIndex].bothBent = false
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

      handMetaRef.current = currentMeta
      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [cooldownMs, isWebcamActive, landmarksRef, opacitySpring, reverseBlockMs, blockAfterSwipeMs])

  const activeCursorSet = useMemo(() => new Set(activeCursorKeys), [activeCursorKeys])
  const activeCursorEntries = trackedFingerKeys.filter((entry) => activeCursorSet.has(entry.key))

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
      {activeCursorEntries.map((entry) => {
        const index = trackedFingerKeys.findIndex((tracked) => tracked.key === entry.key)
        const spring = cursorSpringsRef.current[index]
        if (!spring) return null
        const handId = entry.handId
        const color = HAND_COLORS[handId % HAND_COLORS.length]
        return (
          <div key={entry.key} style={{ opacity: isBlocked ? 0.3 : 1 }}>
            <motion.div
              aria-hidden
              style={{
                ...cursorStyle(color),
                x: spring.x,
                y: spring.y,
                opacity: opacitySpring,
              }}
              transition={{ duration: 0.15 }}
            />
          </div>
        )
      })}
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
        {handLabels.map((label) => (
          <text
            key={label.handId}
            x={label.x}
            y={label.y - 12}
            fill="rgba(248, 250, 252, 0.85)"
            fontSize={14}
            fontWeight={600}
            fontFamily="'Segoe UI', system-ui"
            textAnchor="middle"
          >
            {label.label}
          </text>
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
          <span>
            Active cursors: {activeCursorEntries.length}
          </span>
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
