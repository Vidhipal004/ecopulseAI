import "./App.css";
import { useState } from "react";
import {
  Activity, Building2, BrainCircuit, CalendarDays, Check, ChevronRight,
  Gauge, Leaf, Upload, X, Zap
} from "lucide-react";

const minRequestDate = new Date().toISOString().slice(0, 10);

const models = [
  { name: "Linear Regression", mae: 24.1378, rmse: 47.1819, r2: 0.3499 },
  { name: "Decision Tree", mae: 22.3981, rmse: 44.2764, r2: 0.4275 },
  { name: "Random Forest", mae: 20.6112, rmse: 40.9601, r2: 0.5101, best: true },
];

const featureImportance = [
  { name: "Energy Star rating", value: 0.256982 },
  { name: "Floor area", value: 0.138584 },
  { name: "Year built", value: 0.099356 },
];

// Illustrative demo data only; these values are not live measurements or model predictions.
const buildings = [
  {
    id: "northstar-office",
    name: "Northstar Office",
    type: "Office",
    location: "Portland, OR",
    area: 1200,
    occupancy: 45,
    yearBuilt: 2008,
    energyStar: 78,
    annualConsumption: 184600,
    efficiency: 78,
    temperature: 18,
    hours: 10,
    recommendation: "Tune HVAC schedules",
    recommendationDetail: "Compare HVAC start and stop times with actual occupancy, then review after-hours demand.",
  },
  {
    id: "cedar-school",
    name: "Cedar Grove School",
    type: "Education",
    location: "Madison, WI",
    area: 2450,
    occupancy: 310,
    yearBuilt: 1996,
    energyStar: 64,
    annualConsumption: 326800,
    efficiency: 64,
    temperature: 12,
    hours: 9,
    recommendation: "Review building controls",
    recommendationDetail: "Check schedules, zone settings, and sensor calibration across occupied and unoccupied periods.",
  },
  {
    id: "harbor-clinic",
    name: "Harborview Clinic",
    type: "Healthcare",
    location: "Seattle, WA",
    area: 1780,
    occupancy: 92,
    yearBuilt: 2017,
    energyStar: 86,
    annualConsumption: 298400,
    efficiency: 86,
    temperature: 14,
    hours: 16,
    recommendation: "Inspect ventilation schedules",
    recommendationDetail: "Review ventilation operating hours with facility requirements and confirm current control settings.",
  },
];

const navItems = [
  { id: "overview", label: "Overview", icon: Gauge },
  { id: "buildings", label: "Buildings", icon: Building2 },
  { id: "model-lab", label: "Model lab", icon: BrainCircuit },
  { id: "retrofit", label: "Retrofit advisor", icon: Leaf },
];

export default function App() {
  const [selectedBuildingId, setSelectedBuildingId] = useState(buildings[0].id);
  const [activeSection, setActiveSection] = useState("overview");
  const [fileName, setFileName] = useState("");
  const [modalType, setModalType] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const building = buildings.find((item) => item.id === selectedBuildingId) ?? buildings[0];

  function navigateTo(id) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openModal(type) {
    setFormSubmitted(false);
    setModalType(type);
  }

  function uploadFile(event) {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><Zap size={23} /></div>
        <div className="brand-name">ecopulse<span>AI</span></div>
        <p className="side-caption">ENERGY INTELLIGENCE</p>
        <div className="nav-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Workspace sections">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" className={`nav-item ${activeSection === id ? "active" : ""}`} onClick={() => navigateTo(id)}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="status-dot" />
          <span>Local sample data</span>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar" id="overview">
          <div><span className="eyebrow">BUILDING PERFORMANCE / 01</span>
            <h1>Energy intelligence</h1>
            <p>Understand consumption. Find opportunities. Make better decisions.</p>
          </div>
          <div className="topbar-actions">
            <button type="button" className="secondary-btn" onClick={() => openModal("audit")}>Request an audit</button>
            <button type="button" className="upload-btn primary-btn" onClick={() => openModal("pickup")}><CalendarDays size={16}/> Schedule a Pickup</button>
          </div>
        </header>

        <div className="data-note">Illustrative local building data. Dashboard values are not live measurements or model predictions.</div>

        <div className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow mint">YOUR BUILDING, BETTER UNDERSTOOD</span>
            <h2>Make every kilowatt<br/>count.</h2>
            <p>Explore energy demand, test model behaviour and identify buildings that may deserve an efficiency review.</p>
            <button type="button" className="hero-link" onClick={() => navigateTo("buildings")}>Explore buildings <ChevronRight size={17}/></button>
          </div>
          <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="building-visual"><Building2 size={88} strokeWidth={1}/><span/><span/><span/><span/><span/><span/></div>
            <div className="floating-chip"><Activity size={15}/> ENERGY ANALYTICS</div>
          </div>
        </div>

        <div className="section-heading"><div><span className="eyebrow">ILLUSTRATIVE DASHBOARD</span><h2>Building overview</h2></div>
          <div className="building-select-control"><label className="building-select-label" htmlFor="overview-building">Selected building</label>
            <select id="overview-building" className="building-select" value={selectedBuildingId} onChange={(event) => setSelectedBuildingId(event.target.value)}>
              {buildings.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
        </div>

        <div className="metric-grid">
          <article className="metric-card"><div className="metric-top"><span>Annual energy use</span><Zap size={18}/></div><strong>{building.annualConsumption.toLocaleString()} <small>kWh</small></strong><p>Illustrative local sample</p></article>
          <article className="metric-card"><div className="metric-top"><span>Energy efficiency score</span><Gauge size={18}/></div><strong>{building.efficiency}<small>/ 100</small></strong><p>Illustrative score, not a certification</p></article>
          <article className="metric-card"><div className="metric-top"><span>Building floor area</span><Building2 size={18}/></div><strong>{building.area.toLocaleString()} <small>m²</small></strong><p>{building.type} · {building.yearBuilt}</p></article>
          <article className="metric-card"><div className="metric-top"><span>Energy Star rating</span><Activity size={18}/></div><strong>{building.energyStar}<small>/ 100</small></strong><p>Illustrative local sample</p></article>
        </div>

        <div className="section-heading section-anchor" id="buildings"><div><span className="eyebrow">LOCAL BUILDING REGISTER</span><h2>Building details</h2></div></div>
        <article className="panel building-panel">
          <div className="building-detail-heading">
            <div><span className="eyebrow">{building.location}</span><h3>{building.name}</h3><p>{building.type} · Built {building.yearBuilt}</p></div>
            <div className="building-select-control"><label className="building-select-label" htmlFor="building-detail-select">Choose building</label>
              <select id="building-detail-select" className="building-select" value={selectedBuildingId} onChange={(event) => setSelectedBuildingId(event.target.value)}>
                {buildings.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div>
          <div className="building-facts"><span><strong>{building.area.toLocaleString()} m²</strong>Floor area</span><span><strong>{building.occupancy}</strong>Typical occupants</span><span><strong>{building.annualConsumption.toLocaleString()} kWh</strong>Illustrative annual use</span><span><strong>{building.efficiency}/100</strong>Illustrative efficiency</span></div>
        </article>

        <div className="section-heading section-anchor" id="model-lab"><div><span className="eyebrow">COMPLETED RUN RESULTS</span><h2>Model comparison</h2></div><span className="result-tag">MEASURED RESULTS</span></div>
        <div className="work-grid model-results-grid">
          <article className="panel model-panel">
            <div className="panel-heading"><div><span className="eyebrow">HELD-OUT EVALUATION</span><h2>Regression performance</h2></div><BrainCircuit size={20}/></div>
            <p className="muted">Metrics from the completed model run. Lower MAE and RMSE are better; higher R² is better.</p>
            <div className="table-scroll"><table className="results-table"><thead><tr><th>Model</th><th>MAE</th><th>RMSE</th><th>R²</th></tr></thead><tbody>
              {models.map((item) => <tr key={item.name} className={item.best ? "best-model" : ""}><td>{item.name}{item.best && <span className="best-tag">BEST</span>}</td><td>{item.mae.toFixed(4)}</td><td>{item.rmse.toFixed(4)}</td><td>{item.r2.toFixed(4)}</td></tr>)}
            </tbody></table></div>
            <p className="result-caption">Random Forest was the best-performing model in the completed run.</p>
          </article>
          <article className="panel importance-panel">
            <div className="panel-heading"><div><span className="eyebrow">RANDOM FOREST</span><h2>Feature importance</h2></div><Activity size={20}/></div>
            <p className="muted">Relative importance values from the completed run.</p>
            <div className="importance-list">{featureImportance.map((feature) => <div className="importance-row" key={feature.name}><div><span>{feature.name}</span><strong>{feature.value.toFixed(6)}</strong></div><div className="importance-track"><span style={{ width: `${(feature.value / featureImportance[0].value) * 100}%` }}/></div></div>)}</div>
          </article>
        </div>

        <div className="section-heading section-anchor" id="retrofit"><div><span className="eyebrow">DECISION SUPPORT</span><h2>Retrofit advisor</h2></div></div>
        <article className="panel advisor-panel">
          <div className="panel-heading"><div><span className="eyebrow">ILLUSTRATIVE REVIEW PRIORITY</span><h2>{building.name}</h2></div><Leaf size={21}/></div>
          <div className="advisor-content"><div className="advisor-icon"><Leaf size={25}/></div><div><strong>{building.recommendation}</strong><p>{building.recommendationDetail} This is a general review suggestion, not a measured savings estimate.</p></div><span className="priority-tag">REVIEW</span></div>
          <button type="button" className="secondary-btn advisor-action" onClick={() => openModal("audit")}>Request an energy audit</button>
        </article>

        <section className="upload-section">
          <div><strong>Have a building dataset?</strong><p>Choose a CSV file to keep its name visible in this local session.</p>{fileName && <span className="file-note">Selected file: {fileName}. It is not uploaded or parsed.</span>}</div>
          <label className="upload-btn"><Upload size={16}/> Choose CSV<input type="file" accept=".csv" onChange={uploadFile} hidden/></label>
        </section>

        <footer>Dashboard building values are illustrative local fixtures. Model metrics and feature importance are measured results from the completed run; they are not live predictions.</footer>
      </section>

      {modalType && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalType(""); }}>
        <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
          <button type="button" className="modal-close" aria-label="Close dialog" onClick={() => setModalType("")}><X size={19}/></button>
          {formSubmitted ? <div className="form-success"><div className="success-icon"><Check size={24}/></div><span className="eyebrow">REQUEST RECORDED LOCALLY</span><h2>Thanks, we have your request.</h2><p>This confirmation is stored only in this page session. No request was sent to a service.</p><button type="button" className="primary-btn upload-btn" onClick={() => setModalType("")}>Done</button></div> : <>
            <span className="eyebrow">{modalType === "pickup" ? "SERVICE REQUEST" : "BUILDING REVIEW"}</span>
            <h2 id="form-title">{modalType === "pickup" ? "Schedule a Pickup" : "Request an energy audit"}</h2>
            <p className="muted">Complete the details below. Required fields are checked before local confirmation.</p>
            <form className="request-form" onSubmit={(event) => { event.preventDefault(); setFormSubmitted(true); }}>
              <label>Building<select required defaultValue={building.id}>{buildings.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
              <label>Contact email<input type="email" placeholder="name@example.com" required/></label>
              <label>{modalType === "pickup" ? "Preferred date" : "Preferred review date"}<input type="date" min={minRequestDate} required/></label>
              <label>Notes<textarea rows="3" placeholder="Add any details for this request"/></label>
              <button type="submit" className="primary-btn upload-btn">Submit request</button>
            </form>
          </>}
        </section>
      </div>}
    </main>
  );
}
