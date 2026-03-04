import { Layer } from '../LayeredScene'

interface Layer05Props {
  onTestPopup?: () => void
}

export function Layer05({ onTestPopup }: Layer05Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerMeta">
              <div>Quantum Algorithms</div>
              <div>Layer 05 / Quinary surface</div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">VQE Performance Metrics</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Iteration</div>
                  <div>Energy (Ha)</div>
                  <div>ΔE</div>
                  <div>Fidelity</div>
                  <div>Status</div>
                </div>
                <div className="layerTableRow">
                  <div>0</div>
                  <div>-1.247</div>
                  <div>—</div>
                  <div>0.12</div>
                  <div>INIT</div>
                </div>
                <div className="layerTableRow">
                  <div>50</div>
                  <div>-1.823</div>
                  <div>0.024</div>
                  <div>0.87</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>100</div>
                  <div>-1.847</div>
                  <div>0.003</div>
                  <div>0.94</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>150</div>
                  <div>-1.851</div>
                  <div>0.001</div>
                  <div>0.96</div>
                  <div>WARN</div>
                </div>
              </div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Ansatz Depth</div>
                <div className="layerCardValue">6 layers</div>
                <div className="layerCardHint">UCCSD-inspired</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Parameters</div>
                <div className="layerCardValue">48</div>
                <div className="layerCardHint">Trainable vars</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Convergence</div>
                <div className="layerCardValue">ε &lt; 0.01</div>
                <div className="layerCardHint">Energy threshold</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Circuit Shots</div>
                <div className="layerCardValue">8192</div>
                <div className="layerCardHint">Per evaluation</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Optimizer</div>
                <div className="layerCardValue">SPSA</div>
                <div className="layerCardHint">Gradient-free</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Energy Landscape</div>
                <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="VQE optimization landscape">
                  <rect x="0" y="0" width="360" height="120" rx="10" />
                  <path
                    d="M12 110 L32 105 L52 95 L72 85 L92 70 L112 60 L132 50 L152 45 L172 35 L192 30 L212 25 L232 20 L252 18 L272 15 L292 12 L312 10 L332 8"
                    className="layerChartLine"
                  />
                  <g className="layerChartDots">
                    <circle cx="12" cy="110" r="2" />
                    <circle cx="52" cy="95" r="2" />
                    <circle cx="112" cy="60" r="3" fill="#00b894" />
                    <circle cx="172" cy="35" r="2" />
                    <circle cx="232" cy="20" r="2" />
                    <circle cx="292" cy="12" r="3" fill="#00b894" />
                    <circle cx="332" cy="8" r="2" />
                  </g>
                  <g className="layerChartGrid">
                    <line x1="12" y1="30" x2="348" y2="30" />
                    <line x1="12" y1="60" x2="348" y2="60" />
                    <line x1="12" y1="90" x2="348" y2="90" />
                  </g>
                </svg>
                <div className="layerTinyNote">Local minima detected at iterations 112 and 298 · Gradient variance: 0.034</div>
              </div>
            </div>
  
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Variational Quantum Eigensolver</h2>
                <p className="layerSubtitle">H2 molecule · 4 qubits · Hardware-efficient ansatz</p>
              </div>
              <div className="layerBadge">VQE Run 089-B</div>
            </div>
  
            <div className="layerFootnote">
              Classical optimizer stalled · Quantum subroutine fidelity: 0.91
            </div>
          </div>
        </Layer>
  )
}
