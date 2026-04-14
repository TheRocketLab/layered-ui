import { Layer } from '../LayeredScene'

interface Layer08Props {
  onTestPopup?: () => void
}

export function Layer08({ onTestPopup }: Layer08Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Simulation Notes</div>
              <div className="layerTinyNote">
                Trotter-Suzuki decomposition applied with dt=0.01. Ground state preparation converged after 84 sweeps. Critical point at J=0.89 identified with Binder cumulant crossing.
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Hamiltonian Evolution</div>
                <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="Time evolution chart">
                  <rect x="0" y="0" width="360" height="120" rx="10" />
                  <path
                    d="M12 100 L42 85 L72 70 L102 55 L132 45 L162 40 L192 35 L222 30 L252 28 L282 25 L312 22 L342 20"
                    className="layerChartLine"
                  />
                  <g className="layerChartGrid">
                    <line x1="12" y1="30" x2="348" y2="30" />
                    <line x1="12" y1="60" x2="348" y2="60" />
                    <line x1="12" y1="90" x2="348" y2="90" />
                  </g>
                </svg>
                <div className="layerTinyNote">Energy conservation: ΔE/E = 1.2e-4 · Time step: 0.01</div>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Entanglement Entropy</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Entanglement entropy visualization">
                  <rect x="20" y="20" width="120" height="120" rx="10" fill="rgba(200,205,215,0.1)" />
                  <path d="M40 120 L60 100 L80 90 L100 85 L120 80" stroke="#00b894" strokeWidth="3" fill="none" />
                  <circle cx="40" cy="120" r="4" fill="#0984e3" />
                  <circle cx="60" cy="100" r="4" fill="#0984e3" />
                  <circle cx="80" cy="90" r="4" fill="#0984e3" />
                  <circle cx="100" cy="85" r="4" fill="#0984e3" />
                  <circle cx="120" cy="80" r="4" fill="#0984e3" />
                  <text x="20" y="50" fontSize="12" fill="#636e72">S(L)</text>
                  <text x="140" y="150" fontSize="12" fill="#636e72">L</text>
                </svg>
                <ul className="layerList">
                  <li>von Neumann entropy: 1.87</li>
                  <li>Area law violation: 0.12</li>
                  <li>Correlation length: 4.2</li>
                </ul>
              </div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">System Size</div>
                <div className="layerCardValue">L=24</div>
                <div className="layerCardHint">1D Heisenberg chain</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Interaction</div>
                <div className="layerCardValue">J=1.0</div>
                <div className="layerCardHint">Nearest neighbor</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Field</div>
                <div className="layerCardValue">h=0.5</div>
                <div className="layerCardHint">Transverse field</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Precision</div>
                <div className="layerCardValue">ε=1e-8</div>
                <div className="layerCardHint">Convergence threshold</div>
              </div>
            </div>
  
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Many-Body Quantum Simulation</h2>
                <p className="layerSubtitle">Transverse field Ising model · MPS representation · 24 sites</p>
              </div>
              <div className="layerBadge">Sim Run 033-G</div>
            </div>
  
            <div className="layerMeta">
              <div>Quantum Simulation</div>
              <div>Layer 08 / Octonary surface</div>
            </div>
  
            <div className="layerFootnote">
              Bond dimension D=128 · Trotter error: 0.034% per step
            </div>
          </div>
        </Layer>
  )
}
