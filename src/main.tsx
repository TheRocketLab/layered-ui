import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { KineProvider } from './kine/gestures/KineProvider'
import { AirCursor } from './kine/gestures/AirCursor'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KineProvider>
      <AirCursor activeColor="#10b981" visible={false} />
      <App />
    </KineProvider>
  </StrictMode>,
)
