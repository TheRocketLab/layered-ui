import { Layer } from '../LayeredScene'
import { HorizontalStack, Slide } from '../HorizontalStack'

interface Layer04Props {
  onTestPopup?: () => void
}

export function Layer04({}: Layer04Props) {
  return (
  <Layer>
          <HorizontalStack gap={28} className="layerSlideStack">
            <Slide>
              <div className="layerPanel">
                <div className="layerHeader">
                  <div>
                    <h2 className="layerTitle">Surface Code Performance</h2>
                    <p className="layerSubtitle">Rotated lattice · 16 data qubits · d=7 distance</p>
                  </div>
                  <div className="layerBadge">ECC Run 047-C</div>
                </div>
  
                <div className="layerGrid">
                  <div className="layerCard">
                    <div className="layerCardLabel">Logical Qubits</div>
                    <div className="layerCardValue">12 / 16</div>
                    <div className="layerCardHint">d=7 surface code</div>
                  </div>
                  <div className="layerCard">
                    <div className="layerCardLabel">Error Threshold</div>
                    <div className="layerCardValue">1.1%</div>
                    <div className="layerCardHint">Circuit level</div>
                  </div>
                  <div className="layerCard">
                    <div className="layerCardLabel">Syndrome Round</div>
                    <div className="layerCardValue">4.2 μs</div>
                    <div className="layerCardHint">Measurement time</div>
                  </div>
                </div>
  
                <div className="layerRow">
                  <div className="layerPanelBlock">
                    <div className="layerSectionTitle">Syndrome Extraction</div>
                    <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="Syndrome heatmap">
                      <rect x="0" y="0" width="360" height="120" rx="10" />
                      <g className="layerChartGrid">
                        <line x1="12" y1="24" x2="348" y2="24" />
                        <line x1="12" y1="48" x2="348" y2="48" />
                        <line x1="12" y1="72" x2="348" y2="72" />
                        <line x1="12" y1="96" x2="348" y2="96" />
                      </g>
                      <g className="layerChartDots">
                        <circle cx="50" cy="40" r="3" fill="#ff6b6b" />
                        <circle cx="120" cy="60" r="4" fill="#4ecdc4" />
                        <circle cx="200" cy="30" r="2" fill="#45b7d1" />
                        <circle cx="280" cy="80" r="3" fill="#f9ca24" />
                        <circle cx="340" cy="50" r="2" fill="#6c5ce7" />
                      </g>
                    </svg>
                    <div className="layerTinyNote">Parity checks: 89% success · Last correction at t=142.3 μs</div>
                  </div>
  
                  <div className="layerPanelBlock">
                    <div className="layerSectionTitle">Error Distribution</div>
                    <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Error rate visualization">
                      <defs>
                        <radialGradient id="errorGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#d63031" stopOpacity="0.3" />
                        </radialGradient>
                      </defs>
                      <circle cx="80" cy="80" r="60" fill="url(#errorGrad)" />
                      <circle cx="60" cy="70" r="8" fill="#e17055" />
                      <circle cx="100" cy="90" r="6" fill="#e17055" />
                      <circle cx="70" cy="100" r="4" fill="#e17055" />
                      <line x1="80" y1="20" x2="80" y2="140" stroke="#636e72" strokeOpacity="0.5" />
                      <line x1="20" y1="80" x2="140" y2="80" stroke="#636e72" strokeOpacity="0.5" />
                    </svg>
                    <ul className="layerList">
                      <li>X-type errors: 0.8%</li>
                      <li>Z-type errors: 1.2%</li>
                      <li>Correlated pairs: 0.3%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Slide>
            <Slide>
              <div className="layerPanel">
                <div className="layerPanelBlock">
                  <div className="layerSectionTitle">Logical vs Physical Error Rates</div>
                  <div className="layerTable">
                    <div className="layerTableRow layerTableHead">
                      <div>Code Distance</div>
                      <div>Physical p</div>
                      <div>Logical p</div>
                      <div>Threshold</div>
                      <div>Status</div>
                    </div>
                    <div className="layerTableRow">
                      <div>d=3</div>
                      <div>0.8%</div>
                      <div>2.1%</div>
                      <div>10.9%</div>
                      <div>OK</div>
                    </div>
                    <div className="layerTableRow">
                      <div>d=5</div>
                      <div>1.1%</div>
                      <div>0.03%</div>
                      <div>10.9%</div>
                      <div>OK</div>
                    </div>
                    <div className="layerTableRow">
                      <div>d=7</div>
                      <div>1.4%</div>
                      <div>8.2e-6</div>
                      <div>10.9%</div>
                      <div>WARN</div>
                    </div>
                  </div>
                </div>
                <div className="layerPanelBlock">
                  <div className="layerSectionTitle">Correction Insight</div>
                  <p>Recent sweep data projects an 88% success window across the next 20 syndrome rounds.</p>
                  <div className="layerTinyNote">Confidence band ±2.4%. Post-correction dwell: 5.2 μs.</div>
                </div>
              </div>
            </Slide>
            <Slide>
              <div className="layerPanel">
                <div className="layerMeta">
                  <div>Quantum Error Correction</div>
                  <div>Layer 04 / Quaternary surface</div>
                </div>
                <div className="layerPanelBlock">
                  <div className="layerSectionTitle">Telemetry Share</div>
                  <p>Qubit cluster reports sync to the surface code dashboard every 0.56 ms for on-the-fly reconfiguration.</p>
                  <div className="layerTinyNote">Bandwidth: 32 kbps · Latency: 3.8 μs.</div>
                </div>
                <div className="layerFootnote">
                  Decoder convergence: 94% · Next syndrome extraction in 3.8 μs
                </div>
              </div>
            </Slide>
          </HorizontalStack>
        </Layer>
  )
}
