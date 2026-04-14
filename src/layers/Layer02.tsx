import { Layer } from '../LayeredScene'
import { HorizontalStack, Slide } from '../HorizontalStack'

interface Layer02Props {
  onTestPopup?: () => void
}

export function Layer02({ onTestPopup: _onTestPopup }: Layer02Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerMeta">
              <div>Quantum Control Plane</div>
              <div>Layer 02 / Secondary Focus</div>
            </div>
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Pulse Scheduling + Crosstalk Map</h2>
                <p className="layerSubtitle">Adaptive calibration sweep · 18 min window · 5.2 kHz control loop</p>
              </div>
              <div className="layerBadge">Sweep 18-B</div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Active Channels</div>
                <div className="layerCardValue">22 / 24</div>
                <div className="layerCardHint">Two held for isolation</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Gate Queue</div>
                <div className="layerCardValue">146 ops</div>
                <div className="layerCardHint">Pending @ 1.8 ms</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Drive Drift</div>
                <div className="layerCardValue">-0.13 MHz</div>
                <div className="layerCardHint">Median detune</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Crosstalk</div>
                <div className="layerCardValue">1.9%</div>
                <div className="layerCardHint">Below 2.5% cap</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Crosstalk Matrix (Δ)</div>
                <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="Crosstalk heatmap">
                  <rect x="0" y="0" width="360" height="120" rx="10" />
                  <g className="layerChartGrid">
                    <line x1="12" y1="24" x2="348" y2="24" />
                    <line x1="12" y1="48" x2="348" y2="48" />
                    <line x1="12" y1="72" x2="348" y2="72" />
                    <line x1="12" y1="96" x2="348" y2="96" />
                  </g>
                  <g className="layerChartDots">
                    <circle cx="40" cy="30" r="4" />
                    <circle cx="84" cy="54" r="5" />
                    <circle cx="140" cy="42" r="3" />
                    <circle cx="192" cy="70" r="4" />
                    <circle cx="232" cy="34" r="5" />
                    <circle cx="286" cy="82" r="4" />
                    <circle cx="320" cy="60" r="3" />
                  </g>
                </svg>
                <div className="layerTinyNote">Hot pairs: Q2↔Q4, Q3↔Q7 · Mitigation staged</div>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Schedule Preview</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Pulse schedule">
                  <rect x="16" y="20" width="128" height="16" rx="6" fill="rgba(200,205,215,0.2)" />
                  <rect x="16" y="46" width="86" height="12" rx="6" fill="rgba(200,205,215,0.35)" />
                  <rect x="16" y="68" width="112" height="12" rx="6" fill="rgba(200,205,215,0.25)" />
                  <rect x="16" y="90" width="74" height="12" rx="6" fill="rgba(200,205,215,0.3)" />
                  <rect x="16" y="112" width="96" height="12" rx="6" fill="rgba(200,205,215,0.2)" />
                </svg>
                <ul className="layerList">
                  <li>Cycle time: 3.6 μs</li>
                  <li>Max overlap: 4 pulses</li>
                  <li>Idle padding: 0.18 μs</li>
                </ul>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <HorizontalStack gap={32} className="layerCarousel">
                <Slide>
                  <div className="layerCarouselSlide">
                    <h3>Adaptive Cooling</h3>
                    <p>Dedicated coolant routing responds in 280 ms to QPU heat spikes.</p>
                    <span>Temp delta: 0.12 K · Control loop 5.3 kHz</span>
                  </div>
                </Slide>
                <Slide>
                  <div className="layerCarouselSlide">
                    <h3>Gate Harmony</h3>
                    <p>Phase alignment keeps 1Q/2Q crosstalk below 1.1% through the batch.</p>
                    <span>Synchronization 0.4 ns · Fidelity @ 99.15%</span>
                  </div>
                </Slide>
                <Slide>
                  <div className="layerCarouselSlide">
                    <h3>Control Feedback</h3>
                    <p>Realtime telemetry feeds adaptive pre-emphasis for every drive channel.</p>
                    <span>Latency: 8.6 μs · Noise floor 0.18 dB</span>
                  </div>
                </Slide>
              </HorizontalStack>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Calibration Notes</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Step</div>
                  <div>Target</div>
                  <div>Δt</div>
                  <div>Shift</div>
                  <div>Status</div>
                </div>
                <div className="layerTableRow">
                  <div>Echo-12</div>
                  <div>Q2</div>
                  <div>0.46 μs</div>
                  <div>-0.02</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>CR-211</div>
                  <div>Q4 → Q6</div>
                  <div>0.71 μs</div>
                  <div>+0.04</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>ZZ-114</div>
                  <div>Q1 ↔ Q5</div>
                  <div>0.88 μs</div>
                  <div>+0.09</div>
                  <div>WARN</div>
                </div>
                <div className="layerTableRow">
                  <div>DR-402</div>
                  <div>Q7</div>
                  <div>0.31 μs</div>
                  <div>-0.01</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>XY-009</div>
                  <div>Q3</div>
                  <div>0.25 μs</div>
                  <div>+0.02</div>
                  <div>OK</div>
                </div>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Operator Log</div>
              <div className="layerTinyNote">
                Drift compensation applied at 21:18. Residual phase noise within 0.6°; recalc queued for Q5 after cryo stabilization.
              </div>
            </div>
  
            <div className="layerFootnote">
              Scheduler locked to 0.4 ns resolution · Guard bands active across couplers
            </div>
          </div>
        </Layer>
  )
}
