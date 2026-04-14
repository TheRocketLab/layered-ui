import { Layer } from '../LayeredScene'

interface Layer09Props {
  onTestPopup?: () => void
}

export function Layer09({ onTestPopup: _onTestPopup }: Layer09Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Post-Quantum Cryptography Suite</h2>
                <p className="layerSubtitle">Lattice-based schemes · 4096-bit keys · NIST Round 3 finalists</p>
              </div>
              <div className="layerBadge">PQ Crypto 018-H</div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Key Size</div>
                <div className="layerCardValue">4 KB</div>
                <div className="layerCardHint">Public key length</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Security Level</div>
                <div className="layerCardValue">Level 5</div>
                <div className="layerCardHint">128-bit quantum security</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Signature Size</div>
                <div className="layerCardValue">2.7 KB</div>
                <div className="layerCardHint">Dilithium compact</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">KEM Rate</div>
                <div className="layerCardValue">256-bit</div>
                <div className="layerCardHint">Kyber-1024</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Performance</div>
                <div className="layerCardValue">12.4 ms</div>
                <div className="layerCardHint">Key generation time</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Attack Vector Analysis</div>
                <svg className="layerChart" viewBox="0 0 160 120" role="img" aria-label="Security threat landscape">
                  <rect x="0" y="0" width="160" height="120" rx="10" />
                  <g className="layerChartDots">
                    <circle cx="30" cy="40" r="5" fill="#e17055" />
                    <circle cx="70" cy="60" r="4" fill="#fdcb6e" />
                    <circle cx="110" cy="30" r="6" fill="#00b894" />
                    <circle cx="140" cy="80" r="3" fill="#0984e3" />
                  </g>
                  <text x="25" y="100" fontSize="10" fill="#636e72">Grover</text>
                  <text x="65" y="100" fontSize="10" fill="#636e72">Shor</text>
                  <text x="105" y="100" fontSize="10" fill="#636e72">Lattice</text>
                  <text x="135" y="100" fontSize="10" fill="#636e72">Hash</text>
                </svg>
                <div className="layerTinyNote">Threat levels: High (Shor), Medium (Grover), Low (Lattice/Hash)</div>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Key Strength Visualization</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Cryptographic strength diagram">
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#00b894" strokeWidth="4" strokeOpacity="0.3" />
                  <circle cx="80" cy="80" r="40" fill="none" stroke="#0984e3" strokeWidth="4" strokeOpacity="0.5" />
                  <circle cx="80" cy="80" r="20" fill="none" stroke="#e17055" strokeWidth="4" strokeOpacity="0.7" />
                  <circle cx="80" cy="80" r="50" fill="#00b894" fillOpacity="0.1" />
                  <circle cx="80" cy="80" r="30" fill="#0984e3" fillOpacity="0.1" />
                  <circle cx="80" cy="80" r="10" fill="#e17055" fillOpacity="0.2" />
                  <text x="75" y="45" fontSize="12" fill="#636e72">256b</text>
                  <text x="75" y="65" fontSize="12" fill="#636e72">128b</text>
                  <text x="75" y="85" fontSize="12" fill="#636e72">64b</text>
                </svg>
                <ul className="layerList">
                  <li>Classical: 128-bit</li>
                  <li>Quantum: 256-bit</li>
                  <li>Post-quantum: 512-bit</li>
                </ul>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Protocol Comparison</div>
                <div className="layerTinyNote">Falcon signatures: 1.2x smaller than Dilithium. Kyber KEM: 2.1x faster than Saber. All schemes pass NIST validation.</div>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Security Assessment</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Scheme</div>
                  <div>Category</div>
                  <div>Security</div>
                  <div>Status</div>
                  <div>NIST</div>
                </div>
                <div className="layerTableRow">
                  <div>Dilithium</div>
                  <div>Signature</div>
                  <div>Level 3</div>
                  <div>OK</div>
                  <div>Finalist</div>
                </div>
                <div className="layerTableRow">
                  <div>Kyber</div>
                  <div>KEM</div>
                  <div>Level 3</div>
                  <div>OK</div>
                  <div>Standard</div>
                </div>
                <div className="layerTableRow">
                  <div>Falcon</div>
                  <div>Signature</div>
                  <div>Level 5</div>
                  <div>WARN</div>
                  <div>Alternate</div>
                </div>
              </div>
            </div>
  
            <div className="layerMeta">
              <div>Quantum Security</div>
              <div>Layer 09 / Nonary surface</div>
            </div>
  
            <div className="layerFootnote">
              Migration path established · Legacy RSA keys deprecated
            </div>
          </div>
        </Layer>
  )
}
