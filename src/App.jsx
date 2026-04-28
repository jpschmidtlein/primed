import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
//  SHARED DATA
// ═══════════════════════════════════════════════════════════════
const DEFAULT_PROJECTS = [
  { id: 1, name: "US-89 Bridge Replacement",    location: "Flagstaff, AZ" },
  { id: 2, name: "Riverside Culvert Extension", location: "Tempe, AZ" },
  { id: 3, name: "Downtown Utility Relocation", location: "Phoenix, AZ" },
  { id: 4, name: "SR-101 Widening Phase 2",     location: "Scottsdale, AZ" },
  { id: 5, name: "Mesa Stormwater Basin",        location: "Mesa, AZ" },
];

const DEFAULT_EMPLOYEES = [
  { id: 1,  name: "Ray Holbrook",   role: "Foreman",            email: "r.holbrook@company.com",  phone: "602-555-0101" },
  { id: 2,  name: "Delia Campos",   role: "Equipment Operator", email: "d.campos@company.com",    phone: "602-555-0102" },
  { id: 3,  name: "Marcus Trent",   role: "Laborer",            email: "m.trent@company.com",     phone: "602-555-0103" },
  { id: 4,  name: "Jenna Kowalski", role: "Surveyor",           email: "j.kowalski@company.com",  phone: "602-555-0104" },
  { id: 5,  name: "Brent Navarro",  role: "Equipment Operator", email: "b.navarro@company.com",   phone: "602-555-0105" },
  { id: 6,  name: "Tasha Odum",     role: "Laborer",            email: "t.odum@company.com",      phone: "602-555-0106" },
  { id: 7,  name: "Cole Whitfield", role: "Superintendent",     email: "c.whitfield@company.com", phone: "602-555-0107" },
  { id: 8,  name: "Alicia Ramos",   role: "Laborer",            email: "a.ramos@company.com",     phone: "602-555-0108" },
  { id: 9,  name: "Don Prater",     role: "Pipe Layer",         email: "d.prater@company.com",    phone: "602-555-0109" },
  { id: 10, name: "Sierra Fox",     role: "Traffic Control",    email: "s.fox@company.com",       phone: "602-555-0110" },
];

const DEFAULT_TASKS_BY_PROJECT = {
  1: ["Form Setting – Abutment A","Rebar Placement – Deck","Concrete Pour – Pier 2","Form Stripping","Grout Injection","Survey Control Points","Erosion Control Inspection"],
  2: ["Excavation – Sta. 12+40","Pipe Bedding Prep","RCP Install 60\"","Backfill & Compact","Headwall Forming","Concrete Pour – Headwall","Site Restoration"],
  3: ["Potholing – Zone 4","Demo – Existing Manhole","Duct Bank Trenching","Conduit Install","Backfill – 6\" Lifts","Pavement Patching","Traffic Control Setup"],
  4: ["Clearing & Grubbing","Rough Grading – STA 200+00","Subgrade Prep","Base Course Placement","Curb & Gutter Forming","AC Paving – Right Lane","Striping Layout"],
  5: ["Dewatering Setup","Mass Excavation – Cell B","Slope Shaping","Rip Rap Placement","Outlet Structure Form","Concrete Pour – Inlet","Hydroseed Prep"],
};

const DEFAULT_EQUIPMENT_LIST = [
  { id: 1,  name: "CAT 336 Excavator",                 id_num: "EX-336-01" },
  { id: 2,  name: "CAT D6T Dozer",                     id_num: "DZ-D6T-02" },
  { id: 3,  name: "Komatsu GD655 Motor Grader",        id_num: "GR-655-01" },
  { id: 4,  name: "Volvo A40G Articulated Truck",      id_num: "HT-A40-01" },
  { id: 5,  name: "Volvo A40G Articulated Truck",      id_num: "HT-A40-02" },
  { id: 6,  name: "CAT 950M Wheel Loader",             id_num: "WL-950-01" },
  { id: 7,  name: "Hamm HD+ 120 Roller",               id_num: "CP-120-01" },
  { id: 8,  name: "Manitowoc MLC165 Crane",            id_num: "CR-165-01" },
  { id: 9,  name: "Ingersoll Rand 750 Air Compressor", id_num: "AC-750-01" },
  { id: 10, name: "Godwin CD150M Pump",                id_num: "DW-150-01" },
  { id: 11, name: "Freightliner 114SD Flatbed",        id_num: "TR-114-01" },
  { id: 12, name: "Trimble S7 Total Station",          id_num: "SV-S7-01" },
];

const PROJECT_COLORS = {
  "US-89 Bridge Replacement":     { bg: "#0d2440", border: "#1e5a9a", dot: "#2979cc", text: "#64b5f6" },
  "Downtown Utility Relocation":  { bg: "#0a2a1a", border: "#1a6a40", dot: "#2e9e60", text: "#66bb88" },
  "SR-101 Widening Phase 2":      { bg: "#2a1500", border: "#8a4a00", dot: "#f57c00", text: "#ffaa44" },
  "Mesa Stormwater Basin":        { bg: "#1a1040", border: "#4a3a9a", dot: "#7c5cbf", text: "#b39ddb" },
  "Riverside Culvert Extension":  { bg: "#002030", border: "#0a6080", dot: "#0097a7", text: "#4dd0e1" },
};

const ROLE_COLORS = {
  "Foreman": "#f57c00", "Superintendent": "#f57c00",
  "Equipment Operator": "#1976d2", "Surveyor": "#2e9e60",
  "Pipe Layer": "#0097a7", "Laborer": "#5a7a9a", "Traffic Control": "#f57c00",
};

const INITIAL_SCHEDULES = [
  { id: 1, date: "2026-04-20", startTime: "06:00", notes: "", project: { name: "US-89 Bridge Replacement", location: "Flagstaff, AZ" }, crew: ["Ray Holbrook","Delia Campos","Marcus Trent","Don Prater"], tasks: ["Form Setting – Abutment A","Rebar Placement – Deck","Survey Control Points"], equipment: ["CAT 336 Excavator","Manitowoc MLC165 Crane"] },
  { id: 2, date: "2026-04-20", startTime: "07:00", notes: "", project: { name: "Downtown Utility Relocation", location: "Phoenix, AZ" }, crew: ["Cole Whitfield","Tasha Odum","Sierra Fox"], tasks: ["Potholing – Zone 4","Traffic Control Setup"], equipment: ["CAT D6T Dozer"] },
  { id: 3, date: "2026-04-21", startTime: "06:00", notes: "", project: { name: "US-89 Bridge Replacement", location: "Flagstaff, AZ" }, crew: ["Ray Holbrook","Marcus Trent","Don Prater"], tasks: ["Concrete Pour – Pier 2","Form Stripping"], equipment: ["CAT 336 Excavator","CAT 950M Wheel Loader"] },
  { id: 4, date: "2026-04-21", startTime: "07:30", notes: "", project: { name: "SR-101 Widening Phase 2", location: "Scottsdale, AZ" }, crew: ["Brent Navarro","Jenna Kowalski","Alicia Ramos"], tasks: ["Rough Grading – STA 200+00","Subgrade Prep"], equipment: ["Komatsu GD655 Motor Grader"] },
  { id: 5, date: "2026-04-22", startTime: "06:00", notes: "", project: { name: "US-89 Bridge Replacement", location: "Flagstaff, AZ" }, crew: ["Ray Holbrook","Delia Campos","Marcus Trent","Don Prater"], tasks: ["Form Setting – Abutment A","Rebar Placement – Deck","Survey Control Points"], equipment: ["CAT 336 Excavator","Manitowoc MLC165 Crane"] },
  { id: 6, date: "2026-04-22", startTime: "07:00", notes: "", project: { name: "Downtown Utility Relocation", location: "Phoenix, AZ" }, crew: ["Cole Whitfield","Tasha Odum","Sierra Fox","Alicia Ramos"], tasks: ["Duct Bank Trenching","Conduit Install","Pavement Patching","Traffic Control Setup"], equipment: ["CAT D6T Dozer","Godwin CD150M Pump"] },
  { id: 7, date: "2026-04-22", startTime: "06:30", notes: "Survey staking required before grading.", project: { name: "SR-101 Widening Phase 2", location: "Scottsdale, AZ" }, crew: ["Brent Navarro","Jenna Kowalski"], tasks: ["Rough Grading – STA 200+00","Subgrade Prep"], equipment: ["Komatsu GD655 Motor Grader","Hamm HD+ 120 Roller"] },
  { id: 8, date: "2026-04-23", startTime: "06:00", notes: "", project: { name: "US-89 Bridge Replacement", location: "Flagstaff, AZ" }, crew: ["Ray Holbrook","Marcus Trent","Alicia Ramos"], tasks: ["Concrete Pour – Pier 2","Form Stripping","Erosion Control Inspection"], equipment: ["CAT 336 Excavator","CAT 950M Wheel Loader"] },
  { id: 9, date: "2026-04-23", startTime: "07:30", notes: "Dewatering pump must be running before excavation.", project: { name: "Mesa Stormwater Basin", location: "Mesa, AZ" }, crew: ["Cole Whitfield","Delia Campos","Don Prater","Tasha Odum","Sierra Fox"], tasks: ["Dewatering Setup","Mass Excavation – Cell B","Outlet Structure Form"], equipment: ["Volvo A40G Articulated Truck","Godwin CD150M Pump"] },
  { id: 10, date: "2026-04-24", startTime: "06:00", notes: "", project: { name: "Riverside Culvert Extension", location: "Tempe, AZ" }, crew: ["Jenna Kowalski","Brent Navarro","Marcus Trent"], tasks: ["Excavation – Sta. 12+40","Pipe Bedding Prep","RCP Install 60\""], equipment: ["CAT 336 Excavator","Trimble S7 Total Station"] },
  { id: 11, date: "2026-04-24", startTime: "07:00", notes: "", project: { name: "SR-101 Widening Phase 2", location: "Scottsdale, AZ" }, crew: ["Alicia Ramos","Tasha Odum"], tasks: ["Base Course Placement","Curb & Gutter Forming"], equipment: ["Hamm HD+ 120 Roller","Freightliner 114SD Flatbed"] },
  { id: 12, date: "2026-04-24", startTime: "06:30", notes: "", project: { name: "Mesa Stormwater Basin", location: "Mesa, AZ" }, crew: ["Cole Whitfield","Don Prater"], tasks: ["Concrete Pour – Inlet","Hydroseed Prep"], equipment: ["Ingersoll Rand 750 Air Compressor"] },
];

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
const fmt12 = t => { if (!t) return ""; const [h,m] = t.split(":").map(Number); return `${h%12||12}:${String(m).padStart(2,"0")} ${h>=12?"PM":"AM"}`; };
const todayStr = () => new Date().toISOString().split("T")[0];
const fmtDateLong = d => new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
const fmtDateShort = d => new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

function getWeekDates(anchor) {
  const d = new Date(anchor+"T12:00:00"), day = d.getDay(), mon = new Date(d);
  mon.setDate(d.getDate()-(day===0?6:day-1));
  return Array.from({length:5},(_,i)=>{ const nd=new Date(mon); nd.setDate(mon.getDate()+i); return nd.toISOString().split("T")[0]; });
}

// ═══════════════════════════════════════════════════════════════
//  SHARED SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════
function PrimedLogo() {
  return (
    <div style={{ background:"var(--orange)", borderRadius:8, padding:"4px 11px", fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:18, color:"#fff", letterSpacing:"0.08em", flexShrink:0 }}>
      PRIMED
    </div>
  );
}

function HamburgerMenu({ onNavigate, currentScreen }) {
  const [open, setOpen] = useState(false);
  const items = [
    { key:"calendar",  label:"Week Calendar", icon:"📅" },
    { key:"scheduler", label:"Add Schedule",  icon:"➕" },
    { key:"dispatch",  label:"Daily Detail",  icon:"📋" },
    { key:"admin",     label:"Admin",         icon:"⚙️" },
  ];
  return (
    <div style={{ position:"relative", zIndex:200 }}>
      <button onClick={() => setOpen(o=>!o)} style={{
        background:"transparent", border:"none", cursor:"pointer",
        display:"flex", flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center",
        padding:"4px 6px",
      }}>
        {[0,1,2].map(i => (
          <span key={i} style={{ display:"block", width:22, height:2, background:"#fff", borderRadius:2, transition:"all 0.2s",
            transform: open ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"scaleX(0)") : "none",
            opacity: open && i===1 ? 0 : 1,
          }} />
        ))}
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:"fixed", inset:0, zIndex:199, background:"rgba(0,0,0,0.5)" }} />
          {/* Side drawer */}
          <div style={{
            position:"fixed", top:0, left:0, bottom:0, width:260,
            background:"#0d47a1", zIndex:201,
            display:"flex", flexDirection:"column",
            animation:"slideInLeft 0.2s ease",
            boxShadow:"4px 0 20px rgba(0,0,0,0.5)",
          }}>
            {/* Drawer header */}
            <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid rgba(255,255,255,0.15)", background:"#0a3d91" }}>
              <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:22, color:"#fff", letterSpacing:"0.04em" }}>PRIMED</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)", letterSpacing:"0.1em", marginTop:2 }}>HEAVY CIVIL SCHEDULER</div>
            </div>
            {/* Nav items */}
            <div style={{ flex:1, padding:"8px 0" }}>
              {items.map((item, i) => (
                <button key={item.key} onClick={() => { onNavigate(item.key); setOpen(false); }} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:14,
                  background: currentScreen===item.key ? "rgba(255,255,255,0.15)" : "transparent",
                  borderLeft: currentScreen===item.key ? "3px solid #ff9800" : "3px solid transparent",
                  border:"none", borderRight:"none", borderTop:"none", borderBottom:"none",
                  borderLeft: currentScreen===item.key ? "3px solid #ff9800" : "3px solid transparent",
                  padding:"14px 20px", cursor:"pointer", textAlign:"left", fontFamily:"'Roboto',sans-serif",
                  transition:"background 0.15s",
                }}>
                  <span style={{ fontSize:18 }}>{item.icon}</span>
                  <span style={{ fontSize:15, fontWeight: currentScreen===item.key ? 600 : 400, color:"#fff", letterSpacing:"0.01em" }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Footer */}
            <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", lineHeight:1.7 }}>
                Version 1.0.0<br />© 2026, Primed. All rights reserved.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  NOTIFICATION STEP (shared)
// ═══════════════════════════════════════════════════════════════
function NotificationStep({ crewNames, changeLines, onConfirm, onBack }) {
  const [method, setMethod] = useState("both");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const handleSend = () => { setSending(true); setTimeout(()=>{setSending(false);setSent(true);},1200); setTimeout(onConfirm,2000); };
  if (sent) return (
    <div style={{ textAlign:"center", padding:"32px 0 16px" }}>
      <div style={{ fontSize:36, marginBottom:12 }}>✉️</div>
      <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#4caf50", marginBottom:6 }}>Notifications Sent</div>
      <div style={{ fontSize:12, color:"var(--text3)" }}>{crewNames.length} crew member{crewNames.length!==1?"s":""} notified via {method==="both"?"email & SMS":method}</div>
    </div>
  );
  return (
    <div>
      {changeLines && changeLines.length > 0 && (
        <div style={{ background:"var(--bg2)", border:"1px solid #2a3a4a", borderRadius:10, padding:"14px 16px", marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"var(--text3)", textTransform:"uppercase", marginBottom:10 }}>Schedule Change Summary</div>
          {changeLines.map((l,i) => <div key={i} style={{ fontSize:12, fontFamily:"'Roboto Mono',monospace", lineHeight:1.7, color:"var(--text2)" }}>{l}</div>)}
        </div>
      )}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"var(--text3)", textTransform:"uppercase", marginBottom:10 }}>Notify Crew — {crewNames.length}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:5, maxHeight:150, overflowY:"auto" }}>
          {crewNames.map((n,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, background:"var(--bg3)", border:"1px solid #1e2830", borderRadius:7, padding:"7px 10px" }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"var(--border)", border:"1px solid #2a3a48", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"var(--text2)", fontWeight:700, flexShrink:0 }}>{n.split(" ").map(x=>x[0]).join("")}</div>
              <span style={{ fontSize:12, color:"var(--text)", fontWeight:600 }}>{n}</span>
              <span style={{ marginLeft:"auto", fontSize:10, color:"var(--text3)" }}>{method==="email"?"✉":method==="sms"?"📱":"✉+📱"}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"var(--text3)", textTransform:"uppercase", marginBottom:8 }}>Notification Method</div>
        <div style={{ display:"flex", gap:6 }}>
          {[{v:"email",l:"✉ Email"},{v:"sms",l:"📱 SMS"},{v:"both",l:"✉+📱 Both"}].map(o => (
            <button key={o.v} onClick={()=>setMethod(o.v)} style={{ flex:1, padding:"8px 4px", borderRadius:7, cursor:"pointer", background:method===o.v?"rgba(25,118,210,0.2)":"var(--bg2)", border:`1px solid ${method===o.v?"var(--orange)":"var(--border)"}`, color:method===o.v?"var(--orange)":"var(--text3)", fontSize:11, fontFamily:"inherit", fontWeight:method===o.v?700:400 }}>{o.l}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={onBack} style={{ background:"none", border:"1px solid #2a3a48", borderRadius:7, color:"var(--text2)", fontSize:12, padding:"10px 14px", cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
        <button onClick={handleSend} disabled={sending} style={{ flex:1, background:sending?"var(--border)":"var(--orange)", border:"none", borderRadius:7, color:sending?"var(--text3)":"#fff", fontSize:13, fontWeight:700, padding:"10px 0", cursor:sending?"not-allowed":"pointer", fontFamily:"'Roboto Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>
          {sending?"Sending…":`Send to ${crewNames.length} Crew Members`}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  WEEK CALENDAR — HOME SCREEN
// ═══════════════════════════════════════════════════════════════
function MiniChecklist({ items, selected, onToggle }) {
  const [s,setS] = useState("");
  const filtered = items.filter(i=>i.toLowerCase().includes(s.toLowerCase()));
  return (
    <div>
      <input value={s} onChange={e=>setS(e.target.value)} placeholder="Search…" style={{ width:"100%", background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:6, padding:"7px 10px", color:"var(--text)", fontSize:12, fontFamily:"inherit", outline:"none", marginBottom:6 }} />
      <div style={{ maxHeight:175, overflowY:"auto", display:"flex", flexDirection:"column", gap:3 }}>
        {filtered.map((item,i) => {
          const sel = selected.includes(item);
          return (
            <label key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 10px", borderRadius:6, cursor:"pointer", background:sel?"rgba(25,118,210,0.2)":"transparent", border:`1px solid ${sel?"var(--orange)":"var(--border)"}` }}>
              <div style={{ width:14, height:14, borderRadius:3, flexShrink:0, border:`2px solid ${sel?"var(--orange)":"var(--text3)"}`, background:sel?"var(--orange)":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {sel && <span style={{ color:"#fff", fontSize:9 }}>✓</span>}
              </div>
              <span style={{ fontSize:12, color:"var(--text)" }}>{item}</span>
              <input type="checkbox" checked={sel} onChange={()=>onToggle(item)} style={{ display:"none" }} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

function EditDrawer({ schedule, onClose, onSave, employees, equipmentList, tasksByProject, projects }) {
  const c = PROJECT_COLORS[schedule.project.name] || { border:"var(--border2)", dot:"var(--text3)", text:"var(--text2)" };
  const [mode, setMode] = useState("view");
  const [tab, setTab] = useState("datetime");
  const [eDate, setEDate] = useState(schedule.date);
  const [eTime, setETime] = useState(schedule.startTime);
  const [eCrew, setECrew] = useState([...schedule.crew]);
  const [eTasks, setETasks] = useState([...schedule.tasks]);
  const [eEquip, setEEquip] = useState([...schedule.equipment]);
  const [eNotes, setENotes] = useState(schedule.notes||"");
  const tgCrew  = n => setECrew(p  => p.includes(n)?p.filter(x=>x!==n):[...p,n]);
  const tgTask  = t => setETasks(p => p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const tgEquip = e => setEEquip(p => p.includes(e)?p.filter(x=>x!==e):[...p,e]);
  const allEquipNames = equipmentList.map(e=>e.name);
  const allCrewNames  = employees.map(e=>e.name);
  const projTasks = tasksByProject[projects.find(p=>p.name===schedule.project.name)?.id] || [];
  const hasChanges = eDate!==schedule.date||eTime!==schedule.startTime||JSON.stringify([...eCrew].sort())!==JSON.stringify([...schedule.crew].sort())||JSON.stringify([...eTasks].sort())!==JSON.stringify([...schedule.tasks].sort())||JSON.stringify([...eEquip].sort())!==JSON.stringify([...schedule.equipment].sort())||eNotes!==(schedule.notes||"");
  const doSave = () => { onSave(schedule.id,eDate,eTime,eCrew,eTasks,eEquip,eNotes); setMode("notify"); };
  const doCancel = () => { setEDate(schedule.date);setETime(schedule.startTime);setECrew([...schedule.crew]);setETasks([...schedule.tasks]);setEEquip([...schedule.equipment]);setENotes(schedule.notes||"");setMode("view"); };
  const TABS = [{key:"datetime",icon:"📅",label:"Date & Time"},{key:"crew",icon:"👷",label:"Crew"},{key:"tasks",icon:"✅",label:"Tasks"},{key:"equipment",icon:"🚜",label:"Equipment"},{key:"notes",icon:"📝",label:"Notes"}];
  const changeLines = [...(eDate!==schedule.date?[`📅 ${fmtDateLong(schedule.date)} → ${fmtDateLong(eDate)}`]:[]),...(eTime!==schedule.startTime?[`⏱ ${fmt12(schedule.startTime)} → ${fmt12(eTime)}`]:[])];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(2px)" }} />
      <div style={{ position:"relative", width:"100%", maxWidth:580, background:"var(--bg2)", border:`1px solid ${c.border}`, borderTop:`3px solid ${c.dot}`, borderRadius:"16px 16px 0 0", padding:"20px 18px 36px", animation:"slideUp 0.25s ease", maxHeight:"88vh", overflowY:"auto" }}>
        {/* top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <div style={{ display:"flex", gap:8 }}>
            {mode==="view" && <button onClick={()=>setMode("edit")} style={{ background:"rgba(25,118,210,0.2)", border:"1px solid #e07b39", borderRadius:6, color:"var(--orange)", fontSize:12, padding:"6px 13px", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>✏️ Edit Schedule</button>}
            {mode==="edit" && (
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <StepDot n={1} active label="Edit" />
                <span style={{ color:"var(--border2)" }}>›</span>
                <StepDot n={2} label="Notify" />
              </div>
            )}
            {mode==="notify" && (
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <StepDot n="✓" done label="Edit" />
                <span style={{ color:"var(--border2)" }}>›</span>
                <StepDot n={2} active label="Notify" />
              </div>
            )}
            {mode==="done" && <div style={{ background:"rgba(0,80,30,0.3)", border:"1px solid #2a5a30", borderRadius:6, padding:"6px 12px", fontSize:12, color:"#4caf50", fontWeight:600 }}>✓ Updated & crew notified</div>}
          </div>
          <button onClick={onClose} style={{ background:"var(--border)", border:"1px solid #2a3a48", borderRadius:6, color:"var(--text2)", fontSize:12, padding:"5px 10px", cursor:"pointer", fontFamily:"inherit" }}>✕</button>
        </div>

        {/* project header */}
        {mode!=="notify" && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontFamily:"'Roboto Mono',monospace", fontSize:11, color:c.text, marginBottom:2 }}>{fmt12(mode==="edit"?eTime:mode==="done"?eTime:schedule.startTime)}</div>
            <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#fff", marginBottom:2 }}>{schedule.project.name}</div>
            <div style={{ fontSize:11, color:"var(--text3)" }}>📍 {schedule.project.location}</div>
          </div>
        )}

        {/* notify */}
        {mode==="notify" && <NotificationStep crewNames={eCrew} changeLines={changeLines} onConfirm={()=>setMode("done")} onBack={()=>setMode("edit")} />}

        {/* view */}
        {(mode==="view"||mode==="done") && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"flex", gap:8 }}>
              <InfoTile label="Date" val={fmtDateLong(mode==="done"?eDate:schedule.date)} highlight={mode==="done"&&eDate!==schedule.date} />
              <InfoTile label="Start" val={fmt12(mode==="done"?eTime:schedule.startTime)} highlight={mode==="done"&&eTime!==schedule.startTime} small />
            </div>
            <VSect label={`Crew — ${(mode==="done"?eCrew:schedule.crew).length}`}><div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{(mode==="done"?eCrew:schedule.crew).map((n,i)=><Tag key={i}>{n}</Tag>)}</div></VSect>
            <VSect label={`Tasks — ${(mode==="done"?eTasks:schedule.tasks).length}`}><div style={{ display:"flex", flexDirection:"column", gap:4 }}>{(mode==="done"?eTasks:schedule.tasks).map((t,i)=><div key={i} style={{ display:"flex", gap:7, padding:"6px 10px", background:"var(--bg2)", borderRadius:5, fontSize:12, color:"var(--text2)", alignItems:"center" }}><span style={{ color:c.dot, fontSize:8 }}>◆</span>{t}</div>)}</div></VSect>
            {(mode==="done"?eEquip:schedule.equipment).length>0 && <VSect label={`Equipment — ${(mode==="done"?eEquip:schedule.equipment).length}`}><div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{(mode==="done"?eEquip:schedule.equipment).map((e,i)=><Tag key={i} mono>{e}</Tag>)}</div></VSect>}
            {(mode==="done"?eNotes:schedule.notes) && <VSect label="Notes"><div style={{ fontSize:12, color:"var(--text2)", lineHeight:1.6, whiteSpace:"pre-wrap" }}>{mode==="done"?eNotes:schedule.notes}</div></VSect>}
          </div>
        )}

        {/* edit */}
        {mode==="edit" && (
          <>
            <div style={{ display:"flex", gap:4, marginBottom:14, overflowX:"auto" }}>
              {TABS.map(t=>(
                <button key={t.key} onClick={()=>setTab(t.key)} style={{ flexShrink:0, padding:"6px 10px", borderRadius:7, cursor:"pointer", background:tab===t.key?"rgba(25,118,210,0.2)":"var(--bg2)", border:`1px solid ${tab===t.key?"var(--orange)":"var(--border)"}`, color:tab===t.key?"var(--orange)":"var(--text3)", fontSize:11, fontFamily:"inherit", fontWeight:tab===t.key?700:400, display:"flex", alignItems:"center", gap:4 }}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{ minHeight:190, marginBottom:16 }}>
              {tab==="datetime" && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div><div style={{ fontSize:10, color:"var(--text3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>Date</div><input type="date" value={eDate} onChange={e=>setEDate(e.target.value)} style={{ width:"100%", background:"var(--bg3)", border:`1px solid ${eDate!==schedule.date?"var(--orange)":"var(--border2)"}`, borderRadius:7, padding:"10px 12px", color:"var(--text)", fontSize:13, fontFamily:"'Roboto Mono',monospace", outline:"none" }} /></div>
                  <div><div style={{ fontSize:10, color:"var(--text3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>Start Time</div><input type="time" value={eTime} onChange={e=>setETime(e.target.value)} style={{ width:"100%", background:"var(--bg3)", border:`1px solid ${eTime!==schedule.startTime?"var(--orange)":"var(--border2)"}`, borderRadius:7, padding:"10px 12px", color:"var(--text)", fontSize:13, fontFamily:"'Roboto Mono',monospace", outline:"none" }} /></div>
                  {eDate!==schedule.date && <DiffRow icon="📅" was={fmtDateLong(schedule.date)} now={fmtDateLong(eDate)} />}
                  {eTime!==schedule.startTime && <DiffRow icon="⏱" was={fmt12(schedule.startTime)} now={fmt12(eTime)} />}
                </div>
              )}
              {tab==="crew" && <div><SelectedTags items={eCrew} onRemove={tgCrew} /><MiniChecklist items={allCrewNames} selected={eCrew} onToggle={tgCrew} /></div>}
              {tab==="tasks" && <div><SelectedTags items={eTasks} onRemove={tgTask} /><MiniChecklist items={projTasks} selected={eTasks} onToggle={tgTask} /></div>}
              {tab==="equipment" && <div><SelectedTags items={eEquip} onRemove={tgEquip} mono /><MiniChecklist items={allEquipNames} selected={eEquip} onToggle={tgEquip} /></div>}
              {tab==="notes" && <div><textarea value={eNotes} onChange={e=>setENotes(e.target.value)} rows={6} placeholder="Site instructions, safety notes, delivery details…" style={{ width:"100%", background:"var(--bg2)", border:`1px solid ${eNotes!==(schedule.notes||"")?"var(--orange)":"var(--border)"}`, borderRadius:8, padding:"10px 12px", color:"var(--text)", fontSize:13, fontFamily:"'Roboto',sans-serif", resize:"vertical", lineHeight:1.6, outline:"none" }} /><div style={{ fontSize:10, color:"var(--border2)", textAlign:"right", marginTop:4 }}>{eNotes.length} chars</div></div>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={doCancel} style={{ background:"none", border:"1px solid #2a3a48", borderRadius:7, color:"var(--text2)", fontSize:12, padding:"10px 14px", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
              <button onClick={doSave} disabled={!hasChanges} style={{ flex:1, background:hasChanges?"var(--orange)":"var(--border)", border:"none", borderRadius:7, color:hasChanges?"#fff":"var(--text3)", fontSize:13, fontWeight:700, padding:"10px 0", cursor:hasChanges?"pointer":"not-allowed", fontFamily:"'Roboto Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>{hasChanges?"Save & Notify Crew →":"No Changes Yet"}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StepDot({ n, active, done, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
      <div style={{ width:20, height:20, borderRadius:"50%", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", background:done?"#1b5e20":active?"var(--orange)":"var(--border)", color:done?"#4caf50":active?"#fff":"var(--text3)", border:`1px solid ${active?"var(--orange)":"var(--border2)"}` }}>{n}</div>
      <span style={{ fontSize:10, color:done?"#4caf50":active?"var(--orange)":"var(--text3)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</span>
    </div>
  );
}
function InfoTile({ label, val, highlight, small }) {
  return <div style={{ flex:small?0:1, width:small?120:undefined, background:"var(--bg2)", border:"1px solid #1a2830", borderRadius:8, padding:"9px 12px" }}><div style={{ fontSize:9, color:"var(--text3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>{label}</div><div style={{ fontSize:12, color:highlight?"var(--orange)":"var(--text)", fontFamily:"'Roboto Mono',monospace" }}>{val}</div></div>;
}
function VSect({ label, children }) {
  return <div><div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"var(--text3)", textTransform:"uppercase", marginBottom:7 }}>{label}</div>{children}</div>;
}
function Tag({ children, mono }) {
  return <span style={{ fontSize:11, color:"var(--text)", background:"var(--bg3)", border:"1px solid #1e2830", borderRadius:5, padding:"3px 8px", fontFamily:mono?"'Roboto Mono',monospace":undefined }}>{children}</span>;
}
function SelectedTags({ items, onRemove, mono }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
      {items.map((item,i) => (
        <span key={i} onClick={()=>onRemove(item)} style={{ fontSize:11, color:"var(--orange)", background:"rgba(25,118,210,0.2)", border:"1px solid #e07b39", borderRadius:5, padding:"3px 8px", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, fontFamily:mono?"'Roboto Mono',monospace":undefined }}>
          {item} <span style={{ fontSize:13 }}>×</span>
        </span>
      ))}
      {items.length===0 && <span style={{ fontSize:12, color:"var(--text3)", fontStyle:"italic" }}>None selected</span>}
    </div>
  );
}
function DiffRow({ icon, was, now }) {
  return <div style={{ fontSize:11, fontFamily:"'Roboto Mono',monospace", lineHeight:1.7, padding:"7px 10px", background:"var(--bg2)", borderRadius:6 }}><span style={{ color:"var(--text3)" }}>{icon} Was: </span><span style={{ color:"var(--text3)", textDecoration:"line-through" }}>{was}</span><br /><span style={{ color:"var(--text3)" }}>&nbsp;&nbsp;&nbsp;Now: </span><span style={{ color:"var(--orange)", fontWeight:600 }}>{now}</span></div>;
}

function JobPill({ s, onClick, compact }) {
  const c = PROJECT_COLORS[s.project.name] || { bg:"var(--border)", border:"var(--border2)", dot:"var(--text3)", text:"var(--text2)" };
  return (
    <div className="job-pill" onClick={()=>onClick(s)} style={{ background:c.bg, border:`1px solid ${c.border}`, borderLeft:`3px solid ${c.dot}`, borderRadius:7, padding:compact?"7px 8px":"10px 12px", cursor:"pointer" }}>
      <div style={{ fontFamily:"'Roboto Mono',monospace", fontSize:compact?9:11, color:c.text, marginBottom:3 }}>{fmt12(s.startTime)}</div>
      <div style={{ fontSize:compact?10:13, fontWeight:600, color:"var(--text)", lineHeight:1.3, marginBottom:compact?4:6 }}>{s.project.name}</div>
      <div style={{ display:"flex", gap:5 }}>
        <span style={{ fontSize:9, color:"var(--text3)", background:"var(--bg2)", borderRadius:4, padding:"2px 5px", fontFamily:"'Roboto Mono',monospace" }}>👷 {s.crew.length}</span>
        <span style={{ fontSize:9, color:"var(--text3)", background:"var(--bg2)", borderRadius:4, padding:"2px 5px", fontFamily:"'Roboto Mono',monospace" }}>✅ {s.tasks.length}</span>
      </div>
    </div>
  );
}

function ProjectLegend({ projects }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:20 }}>
      {projects.map(p => { const c=PROJECT_COLORS[p]||{dot:"var(--text3)",text:"var(--text2)",bg:"var(--bg2)",border:"var(--border2)"}; return (
        <div key={p} style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 11px", background:c.bg, border:`1px solid ${c.border}`, borderRadius:20, fontSize:11, color:c.text }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:c.dot, flexShrink:0 }} />{p}
        </div>
      ); })}
    </div>
  );
}

function PortraitCalendar({ weekDates, schedules, today, focusDate, setFocusDate, onJobClick }) {
  const focusIdx = weekDates.indexOf(focusDate);
  const daySched = schedules.filter(s=>s.date===focusDate).sort((a,b)=>a.startTime.localeCompare(b.startTime));
  const isToday = focusDate===today;
  const totalCrew = new Set(daySched.flatMap(s=>s.crew)).size;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      {/* 5-tab strip */}
      <div style={{ display:"flex", gap:5, marginBottom:18, background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:12, padding:7 }}>
        {weekDates.map((date,i) => {
          const sel=date===focusDate, tod=date===today, cnt=schedules.filter(s=>s.date===date).length;
          const dn=new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"});
          const dd=new Date(date+"T12:00:00").getDate();
          return (
            <button key={date} onClick={()=>setFocusDate(date)} style={{ flex:1, background:sel?"rgba(25,118,210,0.2)":"transparent", border:`1px solid ${sel?"var(--orange)":"transparent"}`, borderRadius:8, padding:"7px 3px", cursor:"pointer", textAlign:"center" }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:sel?"var(--orange)":tod?"var(--orange)":"var(--text3)" }}>{dn}</div>
              <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:17, color:sel?"#fff":"#6a8090", lineHeight:1 }}>{dd}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:3, marginTop:4, minHeight:5 }}>
                {Array.from({length:Math.min(cnt,3)}).map((_,di)=><span key={di} style={{ width:4, height:4, borderRadius:"50%", background:sel?"var(--orange)":"var(--border2)", display:"inline-block" }} />)}
              </div>
            </button>
          );
        })}
      </div>
      {/* Day header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:20, color:isToday?"var(--orange)":"#fff" }}>
            {new Date(focusDate+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
            {isToday && <span style={{ fontSize:11, color:"var(--orange)", marginLeft:8, fontFamily:"'Roboto',sans-serif" }}>● Today</span>}
          </div>
          <div style={{ fontSize:11, color:"var(--text3)", marginTop:1, fontFamily:"'Roboto Mono',monospace" }}>{daySched.length} job{daySched.length!==1?"s":""} · {totalCrew} crew</div>
        </div>
        <div style={{ display:"flex", gap:5 }}>
          <button onClick={()=>focusIdx>0&&setFocusDate(weekDates[focusIdx-1])} disabled={focusIdx===0} style={{ background:"var(--bg2)", border:"1px solid #2a3a48", borderRadius:7, color:focusIdx===0?"var(--border2)":"var(--text2)", padding:"6px 11px", cursor:focusIdx===0?"default":"pointer", fontSize:14, fontFamily:"inherit" }}>‹</button>
          <button onClick={()=>focusIdx<4&&setFocusDate(weekDates[focusIdx+1])} disabled={focusIdx===4} style={{ background:"var(--bg2)", border:"1px solid #2a3a48", borderRadius:7, color:focusIdx===4?"var(--border2)":"var(--text2)", padding:"6px 11px", cursor:focusIdx===4?"default":"pointer", fontSize:14, fontFamily:"inherit" }}>›</button>
        </div>
      </div>
      {/* Cards */}
      {daySched.length===0
        ? <div style={{ textAlign:"center", padding:"50px 20px", color:"var(--border2)", fontSize:13, fontStyle:"italic", background:"var(--bg2)", borderRadius:12, border:"1px solid #1a2830" }}>No jobs scheduled</div>
        : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{daySched.map(s=><JobPill key={s.id} s={s} onClick={onJobClick} />)}</div>
      }
    </div>
  );
}

function LandscapeCalendar({ weekDates, schedules, today, onJobClick, weekProjects }) {
  return (
    <>
      {weekProjects.length>0 && <ProjectLegend projects={weekProjects} />}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
        {weekDates.map((date,di) => {
          const isToday=date===today;
          const ds=schedules.filter(s=>s.date===date).sort((a,b)=>a.startTime.localeCompare(b.startTime));
          const dn=new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"});
          const dm=new Date(date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});
          return (
            <div key={date} style={{ background:"var(--bg2)", border:`1px solid ${isToday?"var(--orange)":"var(--border)"}`, borderRadius:12, overflow:"hidden", minHeight:240, animation:`fadeUp 0.3s ease ${di*0.06}s both` }}>
              <div style={{ padding:"10px 10px 8px", borderBottom:"1px solid #1a2830", background:isToday?"#1a2a18":"var(--bg2)" }}>
                <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:15, color:isToday?"var(--orange)":"var(--text2)", textTransform:"uppercase" }}>{dn}</div>
                <div style={{ fontFamily:"'Roboto Mono',monospace", fontSize:10, color:isToday?"var(--orange)":"var(--text3)", marginTop:1 }}>{dm}</div>
                {isToday && <div style={{ fontSize:8, fontWeight:700, color:"var(--orange)", textTransform:"uppercase", marginTop:3 }}>● Today</div>}
              </div>
              <div style={{ padding:7, display:"flex", flexDirection:"column", gap:5 }}>
                {ds.length===0 ? <div style={{ padding:"18px 6px", textAlign:"center", fontSize:10, color:"var(--border2)", fontStyle:"italic" }}>No jobs</div>
                  : ds.map(s=><JobPill key={s.id} s={s} onClick={onJobClick} compact />)}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop:12, display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
        {weekDates.map(date => {
          const ds=schedules.filter(s=>s.date===date);
          const crew=new Set(ds.flatMap(s=>s.crew)).size;
          if(ds.length===0) return <div key={date} />;
          return (
            <div key={date} style={{ background:"var(--bg2)", border:"1px solid #1a2830", borderRadius:7, padding:"6px 8px", display:"flex", justifyContent:"space-around" }}>
              {[{v:ds.length,l:"jobs"},{v:crew,l:"crew"}].map((s,i)=>(
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:16, color:"var(--orange)" }}>{s.v}</div>
                  <div style={{ fontSize:8, color:"var(--text3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

function WeekCalendarScreen({ schedules, onSave, employees, equipmentList, tasksByProject, projects }) {
  const today = todayStr();
  const [anchor, setAnchor] = useState(today);
  const [focus,  setFocus]  = useState(today);
  const [sel,    setSel]    = useState(null);
  const [land,   setLand]   = useState(window.innerWidth>window.innerHeight&&window.innerWidth>640);
  useEffect(()=>{ const chk=()=>setLand(window.innerWidth>window.innerHeight&&window.innerWidth>640); window.addEventListener("resize",chk); window.addEventListener("orientationchange",()=>setTimeout(chk,100)); return()=>{window.removeEventListener("resize",chk);}; },[]);
  const weekDates = getWeekDates(anchor);
  const effectiveFocus = weekDates.includes(focus)?focus:weekDates[0];
  const prevWeek=()=>{ const d=new Date(weekDates[0]+"T12:00:00"); d.setDate(d.getDate()-7); const a=d.toISOString().split("T")[0]; setAnchor(a); setFocus(getWeekDates(a)[0]); };
  const nextWeek=()=>{ const d=new Date(weekDates[4]+"T12:00:00"); d.setDate(d.getDate()+7); const a=d.toISOString().split("T")[0]; setAnchor(a); setFocus(getWeekDates(a)[0]); };
  const goToday=()=>{ setAnchor(today); setFocus(today); };
  const weekProjects=[...new Set(schedules.filter(s=>weekDates.includes(s.date)).map(s=>s.project.name))];
  const weekLabel=(()=>{ const a=new Date(weekDates[0]+"T12:00:00"),b=new Date(weekDates[4]+"T12:00:00"),mo=a.toLocaleDateString("en-US",{month:"long"}),mo2=b.toLocaleDateString("en-US",{month:"long"}); return mo===mo2?`${mo} ${a.getFullYear()}`:`${mo} – ${mo2} ${a.getFullYear()}`; })();

  return (
    <div style={{ padding:land?"28px 20px 48px":"18px 14px 48px" }}>
      <div style={{ maxWidth:land?1000:520, margin:"0 auto" }}>
        {/* week nav row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", marginBottom:20, gap:6 }}>
          <button className="nav-btn" onClick={prevWeek} style={{ background:"var(--bg2)", border:"1px solid #2a3a48", borderRadius:7, color:"var(--text2)", padding:"7px 11px", cursor:"pointer", fontSize:14 }}>‹</button>
          <div style={{ padding:"7px 12px", background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:7, fontFamily:"'Roboto Condensed',sans-serif", fontWeight:700, fontSize:14, color:"var(--text)", minWidth:land?160:110, textAlign:"center" }}>{weekLabel}</div>
          <button className="nav-btn" onClick={nextWeek} style={{ background:"var(--bg2)", border:"1px solid #2a3a48", borderRadius:7, color:"var(--text2)", padding:"7px 11px", cursor:"pointer", fontSize:14 }}>›</button>
          <button className="nav-btn" onClick={goToday} style={{ background:"var(--bg2)", border:"1px solid #2a3a48", borderRadius:7, color:"var(--text2)", padding:"7px 10px", cursor:"pointer", fontSize:11, letterSpacing:"0.06em" }}>TODAY</button>
        </div>
        <div style={{ animation:"fadeIn 0.2s ease" }}>
          {land
            ? <LandscapeCalendar weekDates={weekDates} schedules={schedules} today={today} onJobClick={setSel} weekProjects={weekProjects} />
            : <PortraitCalendar  weekDates={weekDates} schedules={schedules} today={today} focusDate={effectiveFocus} setFocusDate={setFocus} onJobClick={setSel} />
          }
        </div>
      </div>
      {sel && <EditDrawer schedule={sel} onClose={()=>setSel(null)} onSave={(id,...args)=>{ onSave(id,...args); setSel(null); }} employees={employees} equipmentList={equipmentList} tasksByProject={tasksByProject} projects={projects} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADD SCHEDULE SCREEN
// ═══════════════════════════════════════════════════════════════
function CheckList({ items, selected, onToggle, labelKey="name", subKey }) {
  const [s,setS]=useState("");
  const filtered=items.filter(i=>i[labelKey].toLowerCase().includes(s.toLowerCase()));
  return (
    <div>
      <input value={s} onChange={e=>setS(e.target.value)} placeholder="Search…" style={{ width:"100%", boxSizing:"border-box", background:"var(--bg3)", border:"1px solid #2a3a48", borderRadius:6, padding:"8px 12px", color:"var(--text)", fontSize:13, marginBottom:8, outline:"none", fontFamily:"inherit" }} />
      <div style={{ maxHeight:200, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
        {filtered.map(item=>{ const sel=selected.includes(item.id??item); return (
          <label key={item.id??item} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:7, cursor:"pointer", background:sel?"rgba(25,118,210,0.2)":"transparent", border:`1px solid ${sel?"var(--orange)":"var(--border)"}` }}>
            <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, border:`2px solid ${sel?"var(--orange)":"var(--text3)"}`, background:sel?"var(--orange)":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>{sel&&<span style={{ color:"#fff", fontSize:10 }}>✓</span>}</div>
            <span style={{ flex:1, fontSize:13, color:"var(--text)" }}>{item[labelKey]}</span>
            {subKey&&<span style={{ fontSize:11, color:"var(--text3)" }}>{item[subKey]}</span>}
            <input type="checkbox" checked={sel} onChange={()=>onToggle(item.id??item)} style={{ display:"none" }} />
          </label>
        ); })}
      </div>
    </div>
  );
}

function SectionCard({ step, label, done, children }) {
  return (
    <div style={{ background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:12, padding:22, animation:"fadeUp 0.3s ease" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:done?"var(--orange)":"var(--border)", border:done?"none":"2px solid #3a4a58", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:done?"#fff":"var(--text3)", flexShrink:0 }}>{done?"✓":step}</div>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:done?"var(--orange)":"var(--text2)", textTransform:"uppercase" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function AddScheduleScreen({ onScheduleAdded, projects, employees, tasksByProject, equipmentList, schedules }) {
  const today = todayStr();
  const [date, setDate]=useState("");
  const [time, setTime]=useState("");
  const [projId, setProjId]=useState(null);
  const [empIds, setEmpIds]=useState([]);
  const [tasks, setTasks]=useState([]);
  const [equipIds, setEquipIds]=useState([]);
  const [notes, setNotes]=useState("");
  const [submitted, setSubmitted]=useState(false);
  const [mode, setMode]=useState("form"); // "form"|"notify"|"done"

  const tgEmp  = id => setEmpIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const tgTask = t  => setTasks(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const tgEquip= id => setEquipIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const selProj = projects.find(p=>p.id===projId);

  // crew already assigned on this date (excluding current schedule being edited)
  const assignedOnDate = date
    ? new Set(schedules.filter(s=>s.date===date).flatMap(s=>s.crew))
    : new Set();

  const canSubmit = date&&projId&&empIds.length>0&&tasks.length>0;
  const selCrewNames = employees.filter(e=>empIds.includes(e.id)).map(e=>e.name);

  const handleConfirm = () => {
    const newSched = {
      id: Date.now(),
      date, startTime: time||"07:00",
      project: { name:selProj.name, location:selProj.location },
      crew: selCrewNames,
      tasks,
      equipment: equipmentList.filter(e=>equipIds.includes(e.id)).map(e=>e.name),
      notes,
    };
    onScheduleAdded(newSched);
    setMode("notify");
  };

  if (mode==="notify") return (
    <div style={{ padding:"24px 16px", maxWidth:560, margin:"0 auto" }}>
      <NotificationStep
        crewNames={selCrewNames}
        changeLines={[]}
        onConfirm={()=>setMode("done")}
        onBack={()=>setMode("form")}
      />
    </div>
  );

  if (mode==="done") return (
    <div style={{ padding:"32px 16px", maxWidth:560, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
      <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:24, color:"#4caf50", marginBottom:8 }}>Schedule Added</div>
      <div style={{ fontSize:13, color:"var(--text3)", marginBottom:28 }}>{selProj?.name} · {fmtDateLong(date)}</div>
      <button onClick={()=>{ setDate("");setTime("");setProjId(null);setEmpIds([]);setTasks([]);setEquipIds([]);setNotes("");setMode("form"); }} style={{ background:"var(--orange)", border:"none", borderRadius:9, color:"#fff", fontSize:14, fontWeight:700, padding:"12px 28px", cursor:"pointer", fontFamily:"'Roboto Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>Add Another Schedule</button>
    </div>
  );

  return (
    <div style={{ padding:"20px 14px 64px", maxWidth:640, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>

      {/* Date + Time */}
      <SectionCard step={1} label="Date & Start Time" done={!!date}>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Date</div>
            <input type="date" value={date} min={today} onChange={e=>setDate(e.target.value)} style={{ width:"100%", background:"var(--bg3)", border:`1px solid ${date?"var(--orange)":"var(--border2)"}`, borderRadius:8, padding:"11px 13px", color:"var(--text)", fontSize:14, fontFamily:"'Roboto Mono',monospace", outline:"none" }} />
          </div>
          <div style={{ width:150 }}>
            <div style={{ fontSize:10, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Start Time</div>
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} style={{ width:"100%", background:"var(--bg3)", border:`1px solid ${time?"var(--orange)":"var(--border2)"}`, borderRadius:8, padding:"11px 13px", color:"var(--text)", fontSize:14, fontFamily:"'Roboto Mono',monospace", outline:"none" }} />
          </div>
        </div>
        {(date||time) && <div style={{ marginTop:8, fontSize:11, color:"var(--orange)", fontFamily:"'Roboto Mono',monospace" }}>{date&&fmtDateLong(date)}{date&&time&&" · "}{time&&fmt12(time)}</div>}
      </SectionCard>

      {/* Project */}
      <SectionCard step={2} label="Select Project" done={!!projId}>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {projects.map(p=>(
            <button key={p.id} onClick={()=>{ setProjId(p.id); setTasks([]); }} style={{ display:"flex", alignItems:"center", gap:12, background:projId===p.id?"rgba(25,118,210,0.2)":"transparent", border:`1px solid ${projId===p.id?"var(--orange)":"var(--border)"}`, borderRadius:8, padding:"10px 14px", cursor:"pointer", textAlign:"left" }}>
              <span style={{ flex:1, fontSize:13, fontWeight:600, color:"var(--text)", fontFamily:"inherit" }}>{p.name}</span>
              <span style={{ fontSize:11, color:"var(--text3)" }}>{p.location}</span>
              {projId===p.id && <span style={{ color:"var(--orange)", fontSize:11 }}>✓</span>}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Crew */}
      <SectionCard step={3} label="Assign Crew" done={empIds.length>0}>
        {empIds.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginBottom:10 }}>{employees.filter(e=>empIds.includes(e.id)).map(e=><span key={e.id} onClick={()=>tgEmp(e.id)} style={{ fontSize:12, color:"var(--orange)", background:"rgba(25,118,210,0.2)", border:"1px solid #e07b39", borderRadius:5, padding:"3px 9px", cursor:"pointer", marginRight:5, marginBottom:5, display:"inline-flex", alignItems:"center", gap:5 }}>{e.name} ×</span>)}</div>}
        <div style={{ maxHeight:220, overflowY:"auto", display:"flex", flexDirection:"column", gap:3 }}>
          {employees.map(e => {
            const sel = empIds.includes(e.id);
            const booked = !sel && assignedOnDate.has(e.name);
            return (
              <label key={e.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:7, cursor:booked?"not-allowed":"pointer", background:sel?"rgba(25,118,210,0.2)":booked?"var(--bg2)":"transparent", border:`1px solid ${sel?"var(--orange)":booked?"var(--border)":"var(--border)"}`, opacity:booked?0.5:1 }}>
                <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, border:`2px solid ${sel?"var(--orange)":"var(--text3)"}`, background:sel?"var(--orange)":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>{sel&&<span style={{ color:"#fff", fontSize:10 }}>✓</span>}</div>
                <span style={{ flex:1, fontSize:13, color:booked?"var(--text3)":"var(--text)" }}>{e.name}</span>
                <span style={{ fontSize:11, color:"var(--text3)" }}>{e.role}</span>
                {booked && <span style={{ fontSize:9, color:"var(--orange)", background:"#2a1808", border:"1px solid #4a2810", borderRadius:4, padding:"2px 6px", letterSpacing:"0.06em" }}>ASSIGNED</span>}
                <input type="checkbox" checked={sel} onChange={()=>!booked&&tgEmp(e.id)} style={{ display:"none" }} />
              </label>
            );
          })}
        </div>
      </SectionCard>

      {/* Tasks */}
      <SectionCard step={4} label="Select Tasks" done={tasks.length>0}>
        {!projId ? <div style={{ fontSize:12, color:"var(--text3)", fontStyle:"italic" }}>Select a project first.</div> : (
          <>
            {tasks.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginBottom:10 }}>{tasks.map((t,i)=><span key={i} onClick={()=>tgTask(t)} style={{ fontSize:11, color:"var(--orange)", background:"rgba(25,118,210,0.2)", border:"1px solid #e07b39", borderRadius:5, padding:"3px 8px", cursor:"pointer", marginRight:5, marginBottom:5, display:"inline-flex", alignItems:"center", gap:5 }}>{t} ×</span>)}</div>}
            <div style={{ fontSize:10, color:"var(--text3)", marginBottom:7 }}>From estimate: <span style={{ color:"var(--text2)" }}>{selProj?.name}</span></div>
            <div style={{ maxHeight:200, overflowY:"auto", display:"flex", flexDirection:"column", gap:3 }}>
              {(tasksByProject[projId]||[]).map((t,i)=>{ const sel=tasks.includes(t); return (
                <label key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 11px", borderRadius:6, cursor:"pointer", background:sel?"rgba(25,118,210,0.2)":"transparent", border:`1px solid ${sel?"var(--orange)":"var(--border)"}` }}>
                  <div style={{ width:15, height:15, borderRadius:3, flexShrink:0, border:`2px solid ${sel?"var(--orange)":"var(--text3)"}`, background:sel?"var(--orange)":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>{sel&&<span style={{ color:"#fff", fontSize:9 }}>✓</span>}</div>
                  <span style={{ fontSize:13, color:"var(--text)" }}>{t}</span>
                  <input type="checkbox" checked={sel} onChange={()=>tgTask(t)} style={{ display:"none" }} />
                </label>
              ); })}
            </div>
          </>
        )}
      </SectionCard>

      {/* Equipment */}
      <SectionCard step={5} label="Equipment (optional)" done={equipIds.length>0}>
        {equipIds.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginBottom:10 }}>{equipmentList.filter(e=>equipIds.includes(e.id)).map(e=><span key={e.id} onClick={()=>tgEquip(e.id)} style={{ fontSize:11, color:"var(--orange)", background:"rgba(25,118,210,0.2)", border:"1px solid #e07b39", borderRadius:5, padding:"3px 8px", cursor:"pointer", marginRight:5, marginBottom:5, display:"inline-flex", alignItems:"center", gap:5 }}>{e.name} ×</span>)}</div>}
        <CheckList items={equipmentList} selected={equipIds} onToggle={tgEquip} labelKey="name" subKey="id_num" />
      </SectionCard>

      {/* Notes */}
      <SectionCard step={6} label="Notes (optional)" done={notes.trim().length>0}>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Site instructions, safety notes, delivery details…" rows={4} style={{ width:"100%", background:"var(--bg3)", border:`1px solid ${notes.trim()?"var(--orange)":"var(--border2)"}`, borderRadius:8, padding:"11px 13px", color:"var(--text)", fontSize:13, fontFamily:"'Roboto',sans-serif", resize:"vertical", lineHeight:1.6, outline:"none" }} />
        <div style={{ fontSize:10, color:"var(--text3)", textAlign:"right", marginTop:4 }}>{notes.length} chars</div>
      </SectionCard>

      {/* Submit */}
      <button onClick={handleConfirm} disabled={!canSubmit} style={{ width:"100%", padding:"15px 0", borderRadius:10, background:canSubmit?"var(--orange)":"var(--border)", border:"none", cursor:canSubmit?"pointer":"not-allowed", color:canSubmit?"#fff":"var(--text3)", fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:16, letterSpacing:"0.1em", textTransform:"uppercase" }}>
        {canSubmit?"Confirm & Send Schedule →":"Complete Required Fields"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  DAILY DETAIL SCREEN (Dispatch Board)
// ═══════════════════════════════════════════════════════════════
function DailyDetailScreen({ schedules }) {
  const allDates = [...new Set(schedules.map(s=>s.date))].sort();
  const today = todayStr();
  const defaultDate = allDates.includes(today)?today:(allDates[0]||today);
  const [selDate, setSelDate] = useState(defaultDate);
  const daySchedules = schedules.filter(s=>s.date===selDate).sort((a,b)=>a.startTime.localeCompare(b.startTime));
  const totalCrew = new Set(daySchedules.flatMap(s=>s.crew)).size;
  const totalTasks = daySchedules.reduce((a,s)=>a+s.tasks.length,0);
  const totalEquip = daySchedules.reduce((a,s)=>a+s.equipment.length,0);

  return (
    <div style={{ padding:"20px 14px 64px", maxWidth:700, margin:"0 auto" }}>
      {/* Date picker strip */}
      <div style={{ marginBottom:22 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"var(--text3)", textTransform:"uppercase", marginBottom:10 }}>Select Date</div>
        <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:4 }}>
          {allDates.map(d => {
            const cnt=schedules.filter(s=>s.date===d).length, sel=d===selDate, tod=d===today;
            return (
              <button key={d} onClick={()=>setSelDate(d)} style={{ flexShrink:0, background:sel?"rgba(25,118,210,0.2)":"var(--bg2)", border:`1px solid ${sel?"var(--orange)":"var(--border)"}`, borderRadius:10, padding:"9px 14px", cursor:"pointer", textAlign:"center", minWidth:90 }}>
                {tod && <div style={{ fontSize:8, color:"var(--orange)", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>Today</div>}
                <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:700, fontSize:14, color:sel?"#fff":"var(--text2)" }}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"})}</div>
                <div style={{ fontFamily:"'Roboto Mono',monospace", fontSize:10, color:sel?"#a0c0d0":"var(--text3)", marginTop:1 }}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
                <div style={{ fontSize:9, color:sel?"var(--orange)":"var(--text3)", fontFamily:"'Roboto Mono',monospace", marginTop:5 }}>{cnt} job{cnt!==1?"s":""}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, padding:"12px 16px", background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:10, flexWrap:"wrap" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:17, color:"#fff" }}>{fmtDateLong(selDate)}</div>
        </div>
        {[{v:daySchedules.length,l:"Jobs"},{v:totalCrew,l:"Crew"},{v:totalTasks,l:"Tasks"},{v:totalEquip,l:"Equip"}].map((s,i)=>(
          <div key={i} style={{ textAlign:"center", paddingLeft:14, borderLeft:"1px solid #1e2830" }}>
            <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:20, color:"var(--orange)" }}>{s.v}</div>
            <div style={{ fontSize:9, color:"var(--text3)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Job cards */}
      {daySchedules.length===0
        ? <div style={{ textAlign:"center", padding:"60px 20px", color:"var(--text3)", fontSize:13, fontStyle:"italic" }}>No jobs scheduled for this date.</div>
        : <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {daySchedules.map((s,i)=><DispatchCard key={s.id} schedule={s} index={i} />)}
          </div>
      }
    </div>
  );
}

function DispatchCard({ schedule, index }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:12, overflow:"hidden", animation:`fadeUp 0.3s ease ${index*0.07}s both` }}>
      <div onClick={()=>setOpen(o=>!o)} style={{ padding:"14px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, borderBottom:open?"1px solid #1a2830":"none" }}>
        <div style={{ flexShrink:0, background:"var(--bg3)", border:"1px solid #2a3a48", borderRadius:8, padding:"5px 9px", textAlign:"center", minWidth:52 }}>
          <div style={{ fontFamily:"'Roboto Mono',monospace", fontSize:12, color:"var(--orange)", fontWeight:500 }}>{fmt12(schedule.startTime)}</div>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'Roboto Condensed',sans-serif", fontSize:16, fontWeight:700, color:"var(--text)" }}>{schedule.project.name}</div>
          <div style={{ fontSize:11, color:"var(--text3)", marginTop:1 }}>📍 {schedule.project.location}</div>
        </div>
        <div style={{ display:"flex", gap:7, flexShrink:0 }}>
          {[{icon:"👷",val:schedule.crew.length},{icon:"✅",val:schedule.tasks.length}].map((b,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:4, background:"var(--bg3)", border:"1px solid #2a3a48", borderRadius:6, padding:"3px 9px", fontSize:12, color:"var(--text2)" }}>
              <span style={{ fontSize:12 }}>{b.icon}</span>
              <span style={{ fontFamily:"'Roboto Mono',monospace" }}>{b.val}</span>
            </div>
          ))}
        </div>
        <span style={{ color:"var(--text3)", fontSize:13, flexShrink:0, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s", display:"inline-block" }}>▼</span>
      </div>
      {open && (
        <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:16 }}>
          <DSect label={`Crew — ${schedule.crew.length} assigned`}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {schedule.crew.map((name,i) => {
                const emp = EMPLOYEES.find(e=>e.name===name);
                const role = emp?.role||"";
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:6, background:"var(--bg3)", border:"1px solid #1e2830", borderRadius:7, padding:"5px 10px" }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:ROLE_COLORS[role]||"#5a6a7a", flexShrink:0 }} />
                    <span style={{ fontSize:12, color:"var(--text)", fontWeight:600 }}>{name}</span>
                    {role && <span style={{ fontSize:10, color:"var(--text3)" }}>{role}</span>}
                  </div>
                );
              })}
            </div>
          </DSect>
          <DSect label={`Tasks — ${schedule.tasks.length}`}>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {schedule.tasks.map((t,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", background:"var(--bg2)", borderRadius:5, fontSize:12, color:"var(--text2)" }}><span style={{ color:"var(--orange)", fontSize:8 }}>◆</span>{t}</div>)}
            </div>
          </DSect>
          {schedule.equipment.length>0 && <DSect label={`Equipment — ${schedule.equipment.length}`}><div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{schedule.equipment.map((e,i)=><span key={i} style={{ fontSize:11, color:"var(--text2)", background:"var(--bg2)", border:"1px solid #1a2a38", borderRadius:5, padding:"4px 9px", fontFamily:"'Roboto Mono',monospace" }}>{e}</span>)}</div></DSect>}
          {schedule.notes && <div style={{ padding:"9px 13px", background:"var(--bg2)", border:"1px solid #1e3040", borderRadius:7, fontSize:12, color:"var(--text2)", lineHeight:1.6, display:"flex", gap:8 }}><span style={{ color:"var(--orange)", flexShrink:0 }}>📝</span>{schedule.notes}</div>}
        </div>
      )}
    </div>
  );
}

function DSect({ label, children }) {
  return <div><div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"var(--text3)", textTransform:"uppercase", marginBottom:8 }}>{label}</div>{children}</div>;
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN SCREEN
// ═══════════════════════════════════════════════════════════════
const ROLES = ["Foreman","Superintendent","Equipment Operator","Surveyor","Pipe Layer","Laborer","Traffic Control"];

function AdminScreen({ projects, employees, equipmentList, tasksByProject,
  onAddProject, onRemoveProject,
  onAddEmployee, onRemoveEmployee,
  onAddEquipment, onRemoveEquipment,
  onAddTask, onRemoveTask,
}) {
  const [tab, setTab] = useState("projects");

  // Project form
  const [pName, setPName] = useState(""); const [pLoc, setPLoc] = useState("");
  // Employee form
  const [eName, setEName] = useState(""); const [eRole, setERole] = useState("Laborer");
  const [eEmail, setEEmail] = useState(""); const [ePhone, setEPhone] = useState("");
  // Equipment form
  const [eqName, setEqName] = useState(""); const [eqNum, setEqNum] = useState("");
  // Task form — needs project selection
  const [taskProj, setTaskProj] = useState(projects[0]?.id || 1);
  const [taskName, setTaskName] = useState("");

  const TABS = [
    { key:"projects",   icon:"📋", label:"Projects"  },
    { key:"crew",       icon:"👷", label:"Crew"       },
    { key:"equipment",  icon:"🚜", label:"Equipment"  },
    { key:"tasks",      icon:"✅", label:"Tasks"      },
  ];

  const inputSt = (val) => ({
    width:"100%", background:"var(--bg3)", border:`1px solid ${val?"var(--orange)":"var(--border2)"}`,
    borderRadius:7, padding:"9px 12px", color:"var(--text)", fontSize:13,
    fontFamily:"inherit", outline:"none",
  });

  return (
    <div style={{ padding:"20px 14px 64px", maxWidth:640, margin:"0 auto" }}>

      {/* Tab bar */}
      <div style={{ display:"flex", gap:6, marginBottom:24 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} style={{
            flex:1, padding:"10px 4px", borderRadius:9, cursor:"pointer",
            background:tab===t.key?"rgba(25,118,210,0.2)":"var(--bg2)",
            border:`1px solid ${tab===t.key?"var(--orange)":"var(--border)"}`,
            color:tab===t.key?"var(--orange)":"var(--text3)",
            fontFamily:"inherit", fontSize:11, fontWeight:tab===t.key?700:400,
            display:"flex", flexDirection:"column", alignItems:"center", gap:4,
          }}>
            <span style={{ fontSize:18 }}>{t.icon}</span>
            <span style={{ letterSpacing:"0.06em", textTransform:"uppercase" }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── PROJECTS ── */}
      {tab==="projects" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <AdminCard title="Add Project">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div><div style={labelSt}>Project Name</div><input value={pName} onChange={e=>setPName(e.target.value)} placeholder="e.g. I-17 Interchange Rebuild" style={inputSt(pName)} /></div>
              <div><div style={labelSt}>Location</div><input value={pLoc} onChange={e=>setPLoc(e.target.value)} placeholder="e.g. Phoenix, AZ" style={inputSt(pLoc)} /></div>
              <AddBtn disabled={!pName.trim()||!pLoc.trim()} onClick={()=>{ onAddProject(pName.trim(),pLoc.trim()); setPName(""); setPLoc(""); }}>Add Project</AddBtn>
            </div>
          </AdminCard>
          <AdminCard title={`Active Projects — ${projects.length}`}>
            {projects.map(p => (
              <AdminRow key={p.id} onRemove={()=>onRemoveProject(p.id)}>
                <div>
                  <div style={{ fontSize:13, color:"var(--text)", fontWeight:600 }}>{p.name}</div>
                  <div style={{ fontSize:11, color:"var(--text3)" }}>📍 {p.location}</div>
                </div>
              </AdminRow>
            ))}
          </AdminCard>
        </div>
      )}

      {/* ── CREW ── */}
      {tab==="crew" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <AdminCard title="Add Crew Member">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div><div style={labelSt}>Full Name</div><input value={eName} onChange={e=>setEName(e.target.value)} placeholder="e.g. John Smith" style={inputSt(eName)} /></div>
              <div>
                <div style={labelSt}>Role</div>
                <select value={eRole} onChange={e=>setERole(e.target.value)} style={{ ...inputSt(true), cursor:"pointer" }}>
                  {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div><div style={labelSt}>Email</div><input value={eEmail} onChange={e=>setEEmail(e.target.value)} placeholder="name@company.com" style={inputSt(eEmail)} /></div>
              <div><div style={labelSt}>Phone</div><input value={ePhone} onChange={e=>setEPhone(e.target.value)} placeholder="602-555-0100" style={inputSt(ePhone)} /></div>
              <AddBtn disabled={!eName.trim()} onClick={()=>{ onAddEmployee(eName.trim(),eRole,eEmail.trim(),ePhone.trim()); setEName("");setEEmail("");setEPhone(""); }}>Add Crew Member</AddBtn>
            </div>
          </AdminCard>
          <AdminCard title={`Crew Roster — ${employees.length}`}>
            {employees.map(e => (
              <AdminRow key={e.id} onRemove={()=>onRemoveEmployee(e.id)}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:ROLE_COLORS[e.role]||"#5a6a7a", flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:13, color:"var(--text)", fontWeight:600 }}>{e.name}</div>
                    <div style={{ fontSize:11, color:"var(--text3)" }}>{e.role} · {e.email}</div>
                  </div>
                </div>
              </AdminRow>
            ))}
          </AdminCard>
        </div>
      )}

      {/* ── EQUIPMENT ── */}
      {tab==="equipment" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <AdminCard title="Add Equipment">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div><div style={labelSt}>Equipment Name</div><input value={eqName} onChange={e=>setEqName(e.target.value)} placeholder="e.g. CAT 320 Excavator" style={inputSt(eqName)} /></div>
              <div><div style={labelSt}>Unit ID</div><input value={eqNum} onChange={e=>setEqNum(e.target.value)} placeholder="e.g. EX-320-03" style={inputSt(eqNum)} /></div>
              <AddBtn disabled={!eqName.trim()||!eqNum.trim()} onClick={()=>{ onAddEquipment(eqName.trim(),eqNum.trim()); setEqName("");setEqNum(""); }}>Add Equipment</AddBtn>
            </div>
          </AdminCard>
          <AdminCard title={`Equipment Assets — ${equipmentList.length}`}>
            {equipmentList.map(e => (
              <AdminRow key={e.id} onRemove={()=>onRemoveEquipment(e.id)}>
                <div>
                  <div style={{ fontSize:13, color:"var(--text)", fontWeight:600 }}>{e.name}</div>
                  <div style={{ fontSize:11, color:"var(--text3)", fontFamily:"'Roboto Mono',monospace" }}>{e.id_num}</div>
                </div>
              </AdminRow>
            ))}
          </AdminCard>
        </div>
      )}

      {/* ── TASKS ── */}
      {tab==="tasks" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <AdminCard title="Add Task to Project">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div>
                <div style={labelSt}>Project</div>
                <select value={taskProj} onChange={e=>setTaskProj(Number(e.target.value))} style={{ ...inputSt(true), cursor:"pointer" }}>
                  {projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div><div style={labelSt}>Task Name</div><input value={taskName} onChange={e=>setTaskName(e.target.value)} placeholder="e.g. Concrete Pour – Span 3" style={inputSt(taskName)} /></div>
              <AddBtn disabled={!taskName.trim()} onClick={()=>{ onAddTask(taskProj,taskName.trim()); setTaskName(""); }}>Add Task</AddBtn>
            </div>
          </AdminCard>
          {projects.map(p => {
            const pts = tasksByProject[p.id] || [];
            if (pts.length===0) return null;
            return (
              <AdminCard key={p.id} title={`${p.name} — ${pts.length} tasks`}>
                {pts.map((t,i) => (
                  <AdminRow key={i} onRemove={()=>onRemoveTask(p.id,t)}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ color:"var(--orange)", fontSize:8 }}>◆</span>
                      <span style={{ fontSize:12, color:"var(--text)" }}>{t}</span>
                    </div>
                  </AdminRow>
                ))}
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Admin helper micro-components
const labelSt = { fontSize:10, color:"var(--text3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 };
function AdminCard({ title, children }) {
  return (
    <div style={{ background:"var(--bg2)", border:"1px solid #1e2830", borderRadius:12, padding:20, animation:"fadeUp 0.3s ease" }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"var(--text2)", textTransform:"uppercase", marginBottom:14 }}>{title}</div>
      {children}
    </div>
  );
}
function AdminRow({ children, onRemove }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid #111820" }}>
      <div style={{ flex:1 }}>{children}</div>
      {confirm ? (
        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
          <button onClick={()=>setConfirm(false)} style={{ background:"none", border:"1px solid #2a3a48", borderRadius:5, color:"var(--text2)", fontSize:11, padding:"4px 8px", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
          <button onClick={onRemove} style={{ background:"#3a1010", border:"1px solid #8a3030", borderRadius:5, color:"#e07070", fontSize:11, padding:"4px 8px", cursor:"pointer", fontFamily:"inherit" }}>Confirm</button>
        </div>
      ) : (
        <button onClick={()=>setConfirm(true)} style={{ background:"none", border:"1px solid #2a3a48", borderRadius:5, color:"var(--text3)", fontSize:11, padding:"4px 9px", cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>Remove</button>
      )}
    </div>
  );
}
function AddBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"10px 0", borderRadius:8, background:disabled?"var(--border)":"var(--orange)", border:"none", color:disabled?"var(--text3)":"#fff", fontSize:13, fontWeight:700, cursor:disabled?"not-allowed":"pointer", fontFamily:"'Roboto Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:4 }}>{children}</button>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════
export default function PrimedApp() {
  const [screen, setScreen] = useState("calendar");
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);

  // Master data as state — Admin screen mutates these
  const [projects,      setProjects]      = useState(DEFAULT_PROJECTS);
  const [employees,     setEmployees]     = useState(DEFAULT_EMPLOYEES);
  const [equipmentList, setEquipmentList] = useState(DEFAULT_EQUIPMENT_LIST);
  const [tasksByProject,setTasksByProject]= useState(DEFAULT_TASKS_BY_PROJECT);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [screen]);

  // Schedule handlers
  const handleSave = (id, newDate, newTime, newCrew, newTasks, newEquip, newNotes) => {
    setSchedules(prev => prev.map(s => s.id===id ? { ...s, date:newDate, startTime:newTime, crew:newCrew, tasks:newTasks, equipment:newEquip, notes:newNotes } : s));
  };
  const handleScheduleAdded = newSched => setSchedules(prev => [...prev, newSched]);

  // Admin handlers
  const nextId = arr => (Math.max(0,...arr.map(x=>x.id)) + 1);
  const onAddProject    = (name,location) => setProjects(p=>[...p,{id:nextId(p),name,location}]);
  const onRemoveProject = id => setProjects(p=>p.filter(x=>x.id!==id));
  const onAddEmployee   = (name,role,email,phone) => setEmployees(p=>[...p,{id:nextId(p),name,role,email,phone}]);
  const onRemoveEmployee= id => setEmployees(p=>p.filter(x=>x.id!==id));
  const onAddEquipment  = (name,id_num) => setEquipmentList(p=>[...p,{id:nextId(p),name,id_num}]);
  const onRemoveEquipment=id => setEquipmentList(p=>p.filter(x=>x.id!==id));
  const onAddTask       = (projId,task) => setTasksByProject(p=>({...p,[projId]:[...(p[projId]||[]),task]}));
  const onRemoveTask    = (projId,task) => setTasksByProject(p=>({...p,[projId]:(p[projId]||[]).filter(t=>t!==task)}));

  const navigate = (s) => { setScreen(s); window.scrollTo({ top: 0, behavior: "instant" }); };

  const PAGE_TITLES = { calendar:"Week at a Glance", scheduler:"Add Schedule", dispatch:"Daily Detail", admin:"Admin Settings" };
  const PAGE_SUBS   = { calendar:"HOME · MANAGEMENT VIEW", scheduler:"FIELD SCHEDULER", dispatch:"DISPATCH BOARD", admin:"MANAGE MASTER DATA" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=Roboto+Condensed:wght@600;700;800&family=Roboto+Mono:wght@400;500&display=swap');
        :root {
          --bg:       #0a1628;
          --bg2:      #0d1e35;
          --bg3:      #112240;
          --border:   #1a3a5c;
          --border2:  #1e4a7a;
          --blue:     #1976d2;
          --blue-lt:  #2196f3;
          --blue-nav: #0d47a1;
          --orange:   #f57c00;
          --orange-lt:#ff9800;
          --text:     #e8f0fe;
          --text2:    #90aec8;
          --text3:    #5a7a9a;
          --success:  #2e9e60;
        }
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:var(--bg); font-family:'Roboto',sans-serif; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:var(--bg2); }
        ::-webkit-scrollbar-thumb { background:var(--border2); border-radius:2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideInLeft { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }
        .job-pill:hover { filter:brightness(1.1); transform:translateY(-1px); }
        .job-pill { transition:filter 0.15s, transform 0.15s; cursor:pointer; }
        .nav-btn:hover { background:var(--bg3) !important; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter:invert(0.6) sepia(1) saturate(2) hue-rotate(190deg); cursor:pointer; }
        textarea, input, select { outline:none; font-family:'Roboto',sans-serif; }
        select option { background:var(--bg2); }
        .btn-primary { background:var(--blue); border:none; border-radius:8px; color:#fff; font-family:'Roboto',sans-serif; font-weight:600; cursor:pointer; transition:background 0.15s; }
        .btn-primary:hover { background:var(--blue-lt); }
        .btn-primary:disabled { background:var(--bg3); color:var(--text3); cursor:not-allowed; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"'Roboto',sans-serif" }}>
        {/* ── Global Top Nav ── */}
        <div style={{ position:"sticky", top:0, zIndex:100, background:"#0d47a1", borderBottom:"none", padding:"10px 16px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 8px rgba(0,0,0,0.4)" }}>
          <HamburgerMenu onNavigate={navigate} currentScreen={screen} />
          <div style={{ display:"flex", alignItems:"center", gap:12, flex:1 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
                <style>{`@keyframes primed-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.pa{transform-origin:17px 17px;animation:primed-spin 1.4s linear infinite}`}</style>
                <g className="pa">
                  <circle cx="17" cy="17" r="15" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none"/>
                  <path d="M17 2 A15 15 0 0 1 32 17" stroke="#ff9800" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                </g>
                <path d="M9 20 Q9 13 17 12 Q25 13 25 20 Z" fill="#fff"/>
                <rect x="7" y="19.5" width="20" height="2.5" rx="1.2" fill="rgba(255,255,255,0.7)"/>
                <path d="M17 12 L17 19.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                <span style={{ fontFamily:"'Roboto Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#fff", letterSpacing:"0.04em" }}>PRIMED</span>
                <span style={{ fontFamily:"'Roboto',sans-serif", fontWeight:500, fontSize:14, color:"rgba(255,255,255,0.7)" }}>{PAGE_TITLES[screen]}</span>
              </div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", fontFamily:"'Roboto Mono',monospace", letterSpacing:"0.1em" }}>{PAGE_SUBS[screen]}</div>
            </div>
          </div>
          {/* User avatar */}
          <div style={{ width:34, height:34, borderRadius:"50%", background:"#7b1fa2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>JS</div>
        </div>

        {/* ── Screen Content ── */}
        <div key={screen} style={{ animation:"fadeIn 0.2s ease" }}>
          {screen==="calendar"  && <WeekCalendarScreen schedules={schedules} onSave={handleSave} employees={employees} equipmentList={equipmentList} tasksByProject={tasksByProject} projects={projects} />}
          {screen==="scheduler" && <AddScheduleScreen onScheduleAdded={handleScheduleAdded} projects={projects} employees={employees} tasksByProject={tasksByProject} equipmentList={equipmentList} schedules={schedules} />}
          {screen==="dispatch"  && <DailyDetailScreen schedules={schedules} />}
          {screen==="admin"     && <AdminScreen
            projects={projects} employees={employees} equipmentList={equipmentList} tasksByProject={tasksByProject}
            onAddProject={onAddProject} onRemoveProject={onRemoveProject}
            onAddEmployee={onAddEmployee} onRemoveEmployee={onRemoveEmployee}
            onAddEquipment={onAddEquipment} onRemoveEquipment={onRemoveEquipment}
            onAddTask={onAddTask} onRemoveTask={onRemoveTask}
          />}
        </div>
      </div>
    </>
  );
}
