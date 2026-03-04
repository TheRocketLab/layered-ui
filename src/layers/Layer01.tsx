import { Layer } from '../LayeredScene'

interface Layer01Props {
  onTestPopup?: () => void
}

export function Layer01({ onTestPopup }: Layer01Props) {
  const handleTestPopup = () => {
    onTestPopup?.()
  }

  return (
    <Layer>
          <div className="layerPanel">
            <div className="layerMeta">
              <div>Quantum Diagnostics</div>
              <div>Layer 01 / Active Focus</div>
            </div>
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Qubit Coherence Dashboard</h2>
                <p className="layerSubtitle">Cryogenic stack · 7Q array · 12.4 mK baseline</p>
              </div>
              <div className="layerBadge">Run 0241-A</div>
              <button className="testBtn" onClick={handleTestPopup}>Test Popup</button>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Qubits Online</div>
                <div className="layerCardValue">7 / 8</div>
                <div className="layerCardHint">Q5 in recalibration</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">T1 / T2 (μs)</div>
                <div className="layerCardValue">92.3 / 78.1</div>
                <div className="layerCardHint">Median across active qubits</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">1Q / 2Q Fidelity</div>
                <div className="layerCardValue">99.93% / 99.12%</div>
                <div className="layerCardHint">RB @ 5k shots</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Thermal Load</div>
                <div className="layerCardValue">18.7 μW</div>
                <div className="layerCardHint">Dilution stage</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Coherence Drift (last 6h)</div>
                <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="Coherence drift chart">
                  <rect x="0" y="0" width="360" height="120" rx="10" />
                  <path
                    d="M12 88 L52 82 L92 76 L132 64 L172 69 L212 58 L252 62 L292 49 L332 54"
                    className="layerChartLine"
                  />
                  <g className="layerChartDots">
                    <circle cx="12" cy="88" r="3" />
                    <circle cx="52" cy="82" r="3" />
                    <circle cx="92" cy="76" r="3" />
                    <circle cx="132" cy="64" r="3" />
                    <circle cx="172" cy="69" r="3" />
                    <circle cx="212" cy="58" r="3" />
                    <circle cx="252" cy="62" r="3" />
                    <circle cx="292" cy="49" r="3" />
                    <circle cx="332" cy="54" r="3" />
                  </g>
                  <g className="layerChartGrid">
                    <line x1="12" y1="30" x2="348" y2="30" />
                    <line x1="12" y1="60" x2="348" y2="60" />
                    <line x1="12" y1="90" x2="348" y2="90" />
                  </g>
                </svg>
                <div className="layerTinyNote">Stability index: 0.84 · Variance within tolerance</div>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">State Snapshot</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Bloch sphere overview">
                  <defs>
                    <radialGradient id="sphere" cx="50%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#cfcfcf" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6b7280" stopOpacity="0.15" />
                    </radialGradient>
                  </defs>
                  <circle cx="80" cy="80" r="60" fill="url(#sphere)" stroke="#9aa1b1" strokeOpacity="0.45" />
                  <ellipse cx="80" cy="80" rx="58" ry="20" fill="none" stroke="#9aa1b1" strokeOpacity="0.35" />
                  <line x1="80" y1="20" x2="80" y2="140" stroke="#9aa1b1" strokeOpacity="0.4" />
                  <line x1="20" y1="80" x2="140" y2="80" stroke="#9aa1b1" strokeOpacity="0.4" />
                  <circle cx="110" cy="60" r="4" fill="#cfcfcf" />
                  <line x1="80" y1="80" x2="110" y2="60" stroke="#cfcfcf" strokeOpacity="0.7" />
                </svg>
                <ul className="layerList">
                  <li>Dominant |ψ⟩ angle: 34.2°</li>
                  <li>Phase drift: -0.8° / hr</li>
                  <li>Leakage: 0.21%</li>
                </ul>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Recent Pulses</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Pulse</div>
                  <div>Target</div>
                  <div>μs</div>
                  <div>Δf (MHz)</div>
                  <div>Result</div>
                </div>
                <div className="layerTableRow">
                  <div>CR-129</div>
                  <div>Q2 → Q4</div>
                  <div>0.64</div>
                  <div>-0.42</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>XY-410</div>
                  <div>Q6</div>
                  <div>0.22</div>
                  <div>+0.18</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>ZZ-078</div>
                  <div>Q1 ↔ Q3</div>
                  <div>0.81</div>
                  <div>-0.11</div>
                  <div>WARN</div>
                </div>
              </div>
            </div>
  
            <div className="layerFootnote">
              Control loop locked at 4.2 kHz · Crosstalk within 2.1% target band
            </div>
          </div>
        </Layer>
  )
}
