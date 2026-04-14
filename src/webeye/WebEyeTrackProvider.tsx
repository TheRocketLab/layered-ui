"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

export interface WebEyeTrackingData {
  x: number
  y: number
  confidence?: number
  elapsed?: number
  timestamp: number
}

interface WebEyeTrackContextValue {
  gazeData: WebEyeTrackingData | null
  isTracking: boolean
  isStarting: boolean
  isReady: boolean
  error: string | null
  start: () => Promise<void>
  stop: () => void
}

const WebEyeTrackContext = createContext<WebEyeTrackContextValue>({
  gazeData: null,
  isTracking: false,
  isStarting: false,
  isReady: false,
  error: null,
  start: async () => {},
  stop: () => {},
})

export const useWebEyeTrack = () => useContext(WebEyeTrackContext)

interface WebEyeTrackProviderProps {
  children: React.ReactNode
  camConstraints?: MediaStreamConstraints
  autoStart?: boolean
  showVideo?: boolean
  showFaceOverlay?: boolean
  showFaceFeedbackBox?: boolean
  showPredictionPoints?: boolean
}

const DEFAULT_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: 'user',
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
}

export const WebEyeTrackProvider: React.FC<WebEyeTrackProviderProps> = ({
  children,
  camConstraints = DEFAULT_CONSTRAINTS,
  autoStart = false,
}) => {
  const [gazeData, setGazeData] = useState<WebEyeTrackingData | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const frameRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)
  const isTrackingRef = useRef(false)
  const isStartingRef = useRef(false)

  const stopLoop = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [])

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const updateGaze = useCallback(() => {
    if (!isTrackingRef.current) {
      return
    }
    const timestamp = performance.now()
    const period = 2000
    const phase = ((timestamp % period) / period) * 2 * Math.PI
    const width = window.innerWidth
    const height = window.innerHeight
    const radius = Math.min(width, height) / 3
    const x = width / 2 + Math.cos(phase) * radius
    const y = height / 2 + Math.sin(phase) * radius
    const next: WebEyeTrackingData = {
      x,
      y,
      confidence: 0.7,
      elapsed: 0,
      timestamp,
    }
    setGazeData(next)
    frameRef.current = requestAnimationFrame(updateGaze)
  }, [])

  const start = useCallback(async () => {
    if (isTrackingRef.current || isStartingRef.current) {
      return
    }
    setIsStarting(true)
    isStartingRef.current = true
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia(camConstraints)
      if (!isMountedRef.current) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }
      streamRef.current = stream
      isTrackingRef.current = true
      setIsTracking(true)
      setIsReady(true)
      frameRef.current = requestAnimationFrame(updateGaze)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to open camera.'
      setError(message)
      setIsTracking(false)
      isTrackingRef.current = false
      setIsReady(false)
    } finally {
      if (isMountedRef.current) {
        setIsStarting(false)
        isStartingRef.current = false
      }
    }
  }, [camConstraints, updateGaze])

  const stop = useCallback(() => {
    if (!isTrackingRef.current && !isStartingRef.current) {
      return
    }
    stopLoop()
    stopStream()
    if (isMountedRef.current) {
      setIsTracking(false)
      setIsReady(false)
      setGazeData(null)
      setError(null)
    }
    isTrackingRef.current = false
    isStartingRef.current = false
  }, [stopLoop, stopStream])

  useEffect(() => {
    console.log('[WebEyeTrack] state', { isStarting, isTracking })
  }, [isStarting, isTracking])

  useEffect(() => {
    if (autoStart) {
      start().catch(() => undefined)
    }
    return () => {
      isMountedRef.current = false
      stop()
    }
  }, [autoStart, start, stop])

  const value = useMemo(
    () => ({
      gazeData,
      isTracking,
      isStarting,
      isReady,
      error,
      start,
      stop,
    }),
    [error, gazeData, isStarting, isTracking, isReady, start, stop]
  )

  return <WebEyeTrackContext.Provider value={value}>{children}</WebEyeTrackContext.Provider>
}
