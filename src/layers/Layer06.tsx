import { Layer } from '../LayeredScene'

interface Layer06Props {
  onTestPopup?: () => void
}

export function Layer06({ onTestPopup: _onTestPopup }: Layer06Props) {
  void _onTestPopup
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Quantum Key Distribution Network</h2>
                <p className="layerSubtitle">BB84 protocol · 8-node mesh · 45 km total span</p>
              </div>
              <div className="layerBadge">QKD Net 022-D</div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Network Topology</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="QKD network diagram">
                  <circle cx="80" cy="80" r="50" fill="none" stroke="#636e72" strokeOpacity="0.3" />
                  <circle cx="80" cy="30" r="6" fill="#0984e3" />
                  <circle cx="120" cy="60" r="6" fill="#00b894" />
                  <circle cx="120" cy="100" r="6" fill="#e17055" />
                  <circle cx="80" cy="130" r="6" fill="#fdcb6e" />
                  <circle cx="40" cy="100" r="6" fill="#e84393" />
                  <circle cx="40" cy="60" r="6" fill="#6c5ce7" />
                  <circle cx="80" cy="80" r="4" fill="#2d3436" />
                  <line x1="80" y1="30" x2="80" y2="80" stroke="#0984e3" strokeOpacity="0.7" />
                  <line x1="120" y1="60" x2="80" y2="80" stroke="#00b894" strokeOpacity="0.7" />
                  <line x1="120" y1="100" x2="80" y2="80" stroke="#e17055" strokeOpacity="0.7" />
                  <line x1="80" y1="130" x2="80" y2="80" stroke="#fdcb6e" strokeOpacity="0.7" />
                  <line x1="40" y1="100" x2="80" y2="80" stroke="#e84393" strokeOpacity="0.7" />
                  <line x1="40" y1="60" x2="80" y2="80" stroke="#6c5ce7" strokeOpacity="0.7" />
                </svg>
                <ul className="layerList">
                  <li>Entanglement rate: 2.4 kHz</li>
                  <li>Fidelity: 0.92</li>
                  <li>Loss budget: 12 dB</li>
                </ul>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Key Rate History</div>
                <svg className="layerChart" viewBox="0 0 160 120" role="img" aria-label="QKD key rates chart">
                  <rect x="0" y="0" width="160" height="120" rx="10" />
                  <path
                    d="M8 112 L28 108 L48 95 L68 88 L88 82 L108 76 L128 70 L148 65"
                    className="layerChartLine"
                  />
                  <g className="layerChartDots">
                    <circle cx="8" cy="112" r="2" />
                    <circle cx="48" cy="95" r="3" fill="#00b894" />
                    <circle cx="88" cy="82" r="2" />
                    <circle cx="128" cy="70" r="2" />
                    <circle cx="148" cy="65" r="3" fill="#00b894" />
                  </g>
                </svg>
                <div className="layerTinyNote">Peak rate: 1.2 Mbps · Average: 890 kbps</div>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Protocol Stats</div>
                <ul className="layerList">
                  <li>Sifting efficiency: 0.47</li>
                  <li>Quantum bit error: 0.028</li>
                  <li>Privacy amplification: 512-bit</li>
                </ul>
                <div className="layerTinyNote">Last reconciliation: 2.1s · Success rate: 98.7%</div>
              </div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Active Links</div>
                <div className="layerCardValue">6 / 8</div>
                <div className="layerCardHint">Two in maintenance</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Secure Keys</div>
                <div className="layerCardValue">12.4 GB</div>
                <div className="layerCardHint">Total distributed</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Channel Loss</div>
                <div className="layerCardValue">8.2 dB</div>
                <div className="layerCardHint">Average attenuation</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Eve Detection</div>
                <div className="layerCardValue">0.0</div>
                <div className="layerCardHint">No intrusions</div>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Key Exchange Log</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Link</div>
                  <div>Key Length</div>
                  <div>Time</div>
                  <div>Error Rate</div>
                  <div>Status</div>
                </div>
                <div className="layerTableRow">
                  <div>A↔B</div>
                  <div>256-bit</div>
                  <div>1.2s</div>
                  <div>0.021</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>B↔C</div>
                  <div>512-bit</div>
                  <div>2.8s</div>
                  <div>0.034</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>C↔D</div>
                  <div>256-bit</div>
                  <div>1.9s</div>
                  <div>0.018</div>
                  <div>WARN</div>
                </div>
              </div>
            </div>
  
            <div className="layerMeta">
              <div>Quantum Networking</div>
              <div>Layer 06 / Senary surface</div>
            </div>
  
            <div className="layerFootnote">
              Entanglement swapping active · Next key refresh in 45s
            </div>
          </div>
        </Layer>
  )
}
