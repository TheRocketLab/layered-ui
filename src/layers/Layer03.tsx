import { Layer } from '../LayeredScene'

interface Layer03Props {
  onTestPopup?: () => void
}

export function Layer03({}: Layer03Props) {
  return (
  <Layer>
          <div className="layerPanel">
            <div className="layerMeta">
              <div>Quantum Materials Lab</div>
              <div>Layer 03 / Deep Field</div>
            </div>
            <div className="layerHeader">
              <div>
                <h2 className="layerTitle">Josephson Junction Survey</h2>
                <p className="layerSubtitle">Al/AlOx/Al stacks · 9 wafers · 10 nm barrier control</p>
              </div>
              <div className="layerBadge">Lot J-731</div>
            </div>
  
            <div className="layerGrid">
              <div className="layerCard">
                <div className="layerCardLabel">Yield</div>
                <div className="layerCardValue">86.2%</div>
                <div className="layerCardHint">Within spec @ 4K</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Critical Current</div>
                <div className="layerCardValue">5.4 ± 0.7 μA</div>
                <div className="layerCardHint">Median per die</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Subgap Ratio</div>
                <div className="layerCardValue">11.8</div>
                <div className="layerCardHint">Target &gt; 10</div>
              </div>
              <div className="layerCard">
                <div className="layerCardLabel">Oxide Uniformity</div>
                <div className="layerCardValue">±1.6%</div>
                <div className="layerCardHint">Across 200 mm</div>
              </div>
            </div>
  
            <div className="layerRow">
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">I-V Curve Summary</div>
                <svg className="layerChart" viewBox="0 0 360 120" role="img" aria-label="IV curve summary">
                  <rect x="0" y="0" width="360" height="120" rx="10" />
                  <path
                    d="M18 96 L64 90 L110 82 L156 68 L202 52 L248 38 L294 30 L342 26"
                    className="layerChartLine"
                  />
                  <g className="layerChartGrid">
                    <line x1="12" y1="30" x2="348" y2="30" />
                    <line x1="12" y1="60" x2="348" y2="60" />
                    <line x1="12" y1="90" x2="348" y2="90" />
                  </g>
                </svg>
                <div className="layerTinyNote">Normal-state resistance median: 4.7 kΩ</div>
              </div>
  
              <div className="layerPanelBlock">
                <div className="layerSectionTitle">Micrograph Panel</div>
                <svg className="layerImage" viewBox="0 0 160 160" role="img" aria-label="Junction micrograph">
                  <rect x="18" y="18" width="124" height="124" rx="14" fill="rgba(200,205,215,0.08)" stroke="rgba(200,205,215,0.3)" />
                  <rect x="34" y="34" width="92" height="18" rx="6" fill="rgba(200,205,215,0.2)" />
                  <rect x="34" y="64" width="92" height="18" rx="6" fill="rgba(200,205,215,0.12)" />
                  <rect x="34" y="94" width="92" height="18" rx="6" fill="rgba(200,205,215,0.16)" />
                  <circle cx="56" cy="122" r="6" fill="rgba(200,205,215,0.3)" />
                  <circle cx="104" cy="122" r="6" fill="rgba(200,205,215,0.3)" />
                </svg>
                <ul className="layerList">
                  <li>Edge roughness: 2.1 nm</li>
                  <li>Overlap tolerance: ±8 nm</li>
                  <li>Void density: 0.7%</li>
                </ul>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Process Timeline</div>
              <div className="layerTable">
                <div className="layerTableRow layerTableHead">
                  <div>Stage</div>
                  <div>Tool</div>
                  <div>Δt</div>
                  <div>Shift</div>
                  <div>QC</div>
                </div>
                <div className="layerTableRow">
                  <div>Evap-01</div>
                  <div>Chamber B</div>
                  <div>12m</div>
                  <div>+0.3</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>Ox-07</div>
                  <div>Plasma C</div>
                  <div>4m</div>
                  <div>-0.2</div>
                  <div>OK</div>
                </div>
                <div className="layerTableRow">
                  <div>Lift-02</div>
                  <div>Solvent D</div>
                  <div>18m</div>
                  <div>+0.1</div>
                  <div>WARN</div>
                </div>
                <div className="layerTableRow">
                  <div>Inspect</div>
                  <div>SEM 4</div>
                  <div>6m</div>
                  <div>+0.0</div>
                  <div>OK</div>
                </div>
              </div>
            </div>
  
            <div className="layerPanelBlock">
              <div className="layerSectionTitle">Notes</div>
              <div className="layerTinyNote">
                Barrier oxidation extended by 12s on wafer 6 to stabilize junction area; rework not required. Scatter reduced after bake temp trim.
              </div>
            </div>
  
            <div className="layerFootnote">Spec alignment holds · Next scan at 02:00 local</div>
          </div>
        </Layer>
  )
}
