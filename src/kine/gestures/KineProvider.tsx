"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { engine } from '../core/kine-engine'
import type { NormalizedLandmark } from '@mediapipe/tasks-vision'

interface KineContextType {
  landmarksRef: React.MutableRefObject<NormalizedLandmark[][] | null>
  isWebcamActive: boolean
  webcamError: string | null
}

const KineContext = createContext<KineContextType>({
  landmarksRef: { current: null },
  isWebcamActive: false,
  webcamError: null,
})

export const useKine = () => useContext(KineContext)

interface KineProviderProps {
  children: React.ReactNode
  showDebugVideo?: boolean
}

export const KineProvider: React.FC<KineProviderProps> = ({
  children,
  showDebugVideo = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const [webcamError, setWebcamError] = useState<string | null>(null)
  const landmarksRef = useRef<NormalizedLandmark[][] | null>(null)
  const requestRef = useRef<number | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    let isUnmounted = false
    let lastVideoTime = -1
    let loadedDataListener: (() => void) | null = null

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        })

        if (isUnmounted && stream) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch((error) => {
              console.error('Play error:', error)
            })
          }

          const handleLoadedData = async () => {
            try {
              await engine.initialize(videoRef.current!)
              if (isUnmounted) return
              setIsWebcamActive(true)
              setWebcamError(null)
              detectFrame()
            } catch (initError) {
              console.error('MediaPipe initialization error:', initError)
              setWebcamError('Failed to initialize gesture engine.')
            }
          }

          videoRef.current.addEventListener('loadeddata', handleLoadedData)
          loadedDataListener = handleLoadedData
        }
      } catch (error: any) {
        console.error('Error accessing webcam: ', error)
        if (error?.name === 'NotReadableError') {
          setWebcamError('Camera is presently in use by another application or tab.')
        } else if (error?.name === 'NotAllowedError') {
          setWebcamError('Camera access was denied.')
        } else {
          setWebcamError(error?.message || 'Failed to access webcam.')
        }
      }
    }

    const detectFrame = () => {
      if (isUnmounted) return

      if (videoRef.current && videoRef.current.currentTime !== lastVideoTime) {
        lastVideoTime = videoRef.current.currentTime
        const result = engine.detectHands(performance.now())

        if (result && result.landmarks && result.landmarks.length > 0) {
          landmarksRef.current = result.landmarks
        } else {
          landmarksRef.current = null
        }
      }

      requestRef.current = requestAnimationFrame(detectFrame)
    }

    startWebcam()

    return () => {
      isUnmounted = true
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (loadedDataListener && videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', loadedDataListener)
      }
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <KineContext.Provider value={{ landmarksRef, isWebcamActive, webcamError }}>
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          display: showDebugVideo ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          right: 0,
          width: '320px',
          height: '240px',
          zIndex: 9999,
          transform: 'scaleX(-1)',
        }}
      />
      {children}
    </KineContext.Provider>
  )
}
