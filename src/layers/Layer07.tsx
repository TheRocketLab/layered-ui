import { Layer } from '../LayeredScene'

interface Layer07Props {
  onTestPopup?: () => void
}

export function Layer07({}: Layer07Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Qubit Count</div>
                <div className="layerCardValue">64</div>
                <div className="layerCardHint">Fixed-frequency transmons</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">T1 Median</div>
                <div className="layerCardValue">28.4 μs</div>
                <div className="layerCardHint">Energy relaxation time</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Connectivity</div>
                <div className="layerCardValue">Heavy-hex</div>
                <div className="layerCardHint">6 nearest neighbors</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Qubit Array Layout</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Superconducting qubit array">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="#636e72" opacity="0.3" />
                      <line x1="10" y1="0" x2="10" y2="20" stroke="#636e72" strokeOpacity="0.2" />
                      <line x1="0" y1="10" x2="20" y2="10" stroke="#636e72" strokeOpacity="0.2" />
                    </pattern>
                  </defs>
                  <rect x="10" y="10" width="140" height="140" fill="url(#grid)" />
                  <circle cx="40" cy="40" r="3" fill="#00b894" />
                  <circle cx="60" cy="40" r="3" fill="#00b894" />
                  <circle cx="50" cy="50" r="3" fill="#0984e3" />
                  <circle cx="70" cy="50" r="3" fill="#00b894" />
                  <circle cx="40" cy="60" r="3" fill="#0984e3" />
                  <circle cx="60" cy="60" r="3" fill="#00b894" />
                  <circle cx="80" cy="60" r="3" fill="#00b894" />
                  <circle cx="50" cy="70" r="3" fill="#0984e3" />
                  <circle cx="70" cy="70" r="3" fill="#00b894" />
                  <line x1="40" y1="40" x2="50" y2="50" stroke="#00b894" strokeOpacity="0.6" />
                  <line x1="50" y1="50" x2="60" y2="40" stroke="#00b894" strokeOpacity="0.6" />
                  <line x1="50" y1="50" x2="40" y2="60" stroke="#0984e3" strokeOpacity="0.6" />
                </svg>
                <ul className="layerList">
                  <li>Active qubits: 58/64</li>
                  <li>Coupler count: 96</li>
                  <li>Control lines: 128</li>
                </ul>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Qubit Performance</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Qubit</div>
                  <div>T1 (μs)</div>
                  <div>T2 (μs)</div>
                  <div>Readout</div>
                  <div>Status</div>
                </div>
                <div className="layerTableRow">
                  <div>Q01</div>
                  <div>32.1</div>
                  <div>18.7</div>
                  <div>0.94</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>Q12</div>
                  <div>28.9</div>
                  <div>22.3</div>
                  <div>0.89</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>Q25</div>
                  <div>15.2</div>
                  <div>12.1</div>
                  <div>0.76</div>
                  <div>WARN</div>
                </div>
              </div>
            </div>
  
            <div className="layerMeta">
              <div>Quantum Hardware</div>
              <div>Layer 07 / Septenary surface</div>
            </div>
  
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Superconducting Qubit Architecture</h2>
                <p className="layerSubtitle">Heavy-hex lattice · 64 qubits · 20 mK operation</p>
              </div>
              <div className="layerBadge">HW Arch 015-F</div>
            </div>
  
            <div className="layerFootnote">
              Gate fidelities above 99.5% · Next calibration sweep in 2h
            </div>
          </div>
        </Layer>
  )
}
