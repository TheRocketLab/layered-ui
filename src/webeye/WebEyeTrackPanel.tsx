"use client"

import React, { useMemo } from 'react'
import { useWebEyeTrack } from './WebEyeTrackProvider'

const formatNumber = (value?: number) => {
  if (value === undefined || Number.isNaN(value)) return '—'
  return value.toFixed(0)
}

export const WebEyeTrackPanel: React.FC = () => {
  const { gazeData, isTracking, isStarting, isReady, error, start, stop } = useWebEyeTrack()

  const status = useMemo(() => {
    if (isReady || isTracking) return 'Tracking'
    if (isStarting) return 'Starting…'
    return 'Idle'
  }, [isStarting, isTracking, isReady])

  const title = isTracking ? 'Stop eye tracking' : 'Start eye tracking'

  const toggleTracking = () => {
    if (isTracking) {
      stop()
    } else {
      start().catch(() => undefined)
    }
  }

  const coords = useMemo(() => {
    if (!gazeData) return '—'
    return `${formatNumber(gazeData.x)}, ${formatNumber(gazeData.y)}`
  }, [gazeData])

  return (
    <section
      aria-live="polite"
      style={{
        position: 'fixed',
        right: 16,
        top: 16,
        width: 220,
        padding: 16,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.95))',
        color: '#f8fafc',
        boxShadow: '0 12px 28px rgba(15,23,42,0.45)',
        fontSize: 12,
        zIndex: 100000,
        border: '1px solid rgba(248,250,252,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>WebEyeTrack</span>
        <span
          style={{
            fontSize: 10,
            padding: '2px 6px',
            borderRadius: 999,
            background: isTracking ? 'rgba(34,197,94,0.2)' : 'rgba(248,250,252,0.08)',
            color: isTracking ? '#4ade80' : '#f1f5f9',
          }}
        >
          {status}
        </span>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: '#94a3b8' }}>
          Coordinates
        </span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>{coords}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ color: '#94a3b8', fontSize: 11 }}>Confidence</span>
        <span style={{ fontSize: 14 }}>{gazeData?.confidence?.toFixed(2) ?? '—'}</span>
      </div>
      <button
        type="button"
        onClick={toggleTracking}
        title={title}
        disabled={isStarting}
        style={{
          marginTop: 4,
          padding: '6px 10px',
          borderRadius: 999,
          border: 'none',
          cursor: 'pointer',
          background: isTracking ? '#ef4444' : '#3b82f6',
          color: '#f8fafc',
          fontWeight: 600,
          fontSize: 12,
          transition: 'transform 0.2s ease',
        }}
      >
        {isTracking ? 'Stop tracking' : 'Start tracking'}
      </button>
      {error && (
        <p style={{ margin: 0, fontSize: 11, color: '#fecdd3' }}>
          {error}
        </p>
      )}
    </section>
  )
}
