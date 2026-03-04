import { useRef, useState } from 'react'
import { LayeredScene, type LayeredSceneRef } from './LayeredScene'
import { SwipeArea } from './kine/gestures/SwipeArea'
import { DualAirCursor } from './kine/gestures/DualAirCursor'
import { Layer01 } from './layers/Layer01'
import { Layer02 } from './layers/Layer02'
import { Layer03 } from './layers/Layer03'
import { Layer04 } from './layers/Layer04'
import { Layer05 } from './layers/Layer05'
import { Layer06 } from './layers/Layer06'
import { Layer07 } from './layers/Layer07'
import { Layer08 } from './layers/Layer08'
import { Layer09 } from './layers/Layer09'
import { Layer10 } from './layers/Layer10'
import './App.css'

const testPopupPlacement = {
  top: '10%',
  left: '50%',
  width: '400px',
  height: '70%',
}

function App() {
  const transitionMs = 250
  const [modalOpen, setModalOpen] = useState(false)
  const layeredRef = useRef<LayeredSceneRef>(null)

  return (
    <>
      <SwipeArea className="layerSwipeArea">
        <LayeredScene
          ref={layeredRef}
          transitionMs={transitionMs}
          modalOpen={modalOpen}
          onModalClose={() => setModalOpen(false)}
          modalPlacement={testPopupPlacement}
        >
          <Layer01 onTestPopup={() => setModalOpen(true)} />
          <Layer02 onTestPopup={() => setModalOpen(true)} />
          <Layer03 onTestPopup={() => setModalOpen(true)} />
          <Layer04 onTestPopup={() => setModalOpen(true)} />
          <Layer05 onTestPopup={() => setModalOpen(true)} />
          <Layer06 onTestPopup={() => setModalOpen(true)} />
          <Layer07 onTestPopup={() => setModalOpen(true)} />
          <Layer08 onTestPopup={() => setModalOpen(true)} />
          <Layer09 onTestPopup={() => setModalOpen(true)} />
          <Layer10 onTestPopup={() => setModalOpen(true)} />
        </LayeredScene>
      </SwipeArea>
      <DualAirCursor
        onSwipeDown={() => layeredRef.current?.goToNext()}
        onSwipeUp={() => layeredRef.current?.goToPrev()}
        dualStrokeColor={['#10b981', '#3b82f6']}
      />
    </>
  )
}

export default App
