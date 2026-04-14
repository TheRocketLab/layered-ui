import { Layer } from '../LayeredScene'

interface Layer10Props {
  onTestPopup?: () => void
}

export function Layer10({}: Layer10Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerMeta">
              <div>Quantum Machine Learning</div>
              <div>Layer 10 / Denary surface</div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Model Performance Metrics</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Model</div>
                  <div>Dataset</div>
                  <div>Accuracy</div>
                  <div>Parameters</div>
                  <div>Status</div>
                </div>
                <div className="layerTableRow">
                  <div>QNN-4</div>
                  <div>Iris</div>
                  <div>97.3%</div>
                  <div>24</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>QCNN-8</div>
                  <div>MNIST</div>
                  <div>94.1%</div>
                  <div>64</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>VQC-12</div>
                  <div>Wine</div>
                  <div>89.7%</div>
                  <div>48</div>
                  <div>WARN</div>
                </div>
              </div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Ansatz Layers</div>
                <div className="layerCardValue">6</div>
                <div className="layerCardHint">Hardware-efficient</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Training Epochs</div>
                <div className="layerCardValue">250</div>
                <div className="layerCardHint">Converged at 180</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Quantum Advantage</div>
                <div className="layerCardValue">1.8x</div>
                <div className="layerCardHint">vs classical baseline</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Circuit Depth</div>
                <div className="layerCardValue">42</div>
                <div className="layerCardHint">Gates per layer</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Training Loss Curve</div>
                <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="QML training loss curve">
                  <rect x="0" y="0" width="360" height="120" rx="10" />
                  <path
                    d="M12 108 L42 95 L72 82 L102 68 L132 55 L162 45 L192 38 L222 32 L252 28 L282 25 L312 22 L342 20"
                    className="layerChartLine"
                  />
                  <g className="layerChartDots">
                    <circle cx="12" cy="108" r="2" />
                    <circle cx="72" cy="82" r="3" fill="#00b894" />
                    <circle cx="162" cy="45" r="2" />
                    <circle cx="252" cy="28" r="3" fill="#00b894" />
                    <circle cx="342" cy="20" r="2" />
                  </g>
                  <g className="layerChartGrid">
                    <line x1="12" y1="30" x2="348" y2="30" />
                    <line x1="12" y1="60" x2="348" y2="60" />
                    <line x1="12" y1="90" x2="348" y2="90" />
                  </g>
                </svg>
                <div className="layerTinyNote">Loss plateau reached at epoch 180 · Validation accuracy: 96.2%</div>
              </div>
            </div>
  
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Quantum Neural Network Training</h2>
                <p className="layerSubtitle">Variational circuits · 8-qubit ansatz · Gradient-based optimization</p>
              </div>
              <div className="layerBadge">QML Run 045-I</div>
            </div>
  
            <div className="layerFootnote">
              Kernel method comparison: 2.3x speedup · Next: quantum kernel alignment
            </div>
          </div>
        </Layer>
  )
}
