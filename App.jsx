import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
//  SHARED DATA
// ═══════════════════════════════════════════════════════════════
const PROJECTS = [
  { id: 1, name: "US-89 Bridge Replacement",    location: "Flagstaff, AZ" },
  { id: 2, name: "Riverside Culvert Extension", location: "Tempe, AZ" },
  { id: 3, name: "Downtown Utility Relocation", location: "Phoenix, AZ" },
  { id: 4, name: "SR-101 Widening Phase 2",     location: "Scottsdale, AZ" },
  { id: 5, name: "Mesa Stormwater Basin",        location: "Mesa, AZ" },
];

const EMPLOYEES = [
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

const TASKS_BY_PROJECT = {
  1: ["Form Setting – Abutment A","Rebar Placement – Deck","Concrete Pour – Pier 2","Form Stripping","Grout Injection","Survey Control Points","Erosion Control Inspection"],
  2: ["Excavation – Sta. 12+40","Pipe Bedding Prep","RCP Install 60\"","Backfill & Compact","Headwall Forming","Concrete Pour – Headwall","Site Restoration"],
  3: ["Potholing – Zone 4","Demo – Existing Manhole","Duct Bank Trenching","Conduit Install","Backfill – 6\" Lifts","Pavement Patching","Traffic Control Setup"],
  4: ["Clearing & Grubbing","Rough Grading – STA 200+00","Subgrade Prep","Base Course Placement","Curb & Gutter Forming","AC Paving – Right Lane","Striping Layout"],
  5: ["Dewatering Setup","Mass Excavation – Cell B","Slope Shaping","Rip Rap Placement","Outlet Structure Form","Concrete Pour – Inlet","Hydroseed Prep"],
};

const EQUIPMENT_LIST = [
  { id: 1,  name: "CAT 336 Excavator",              id_num: "EX-336-01" },
  { id: 2,  name: "CAT D6T Dozer",                  id_num: "DZ-D6T-02" },
  { id: 3,  name: "Komatsu GD655 Motor Grader",     id_num: "GR-655-01" },
  { id: 4,  name: "Volvo A40G Articulated Truck",   id_num: "HT-A40-01" },
  { id: 5,  name: "Volvo A40G Articulated Truck",   id_num: "HT-A40-02" },
  { id: 6,  name: "CAT 950M Wheel Loader",          id_num: "WL-950-01" },
  { id: 7,  name: "Hamm HD+ 120 Roller",            id_num: "CP-120-01" },
  { id: 8,  name: "Manitowoc MLC165 Crane",         id_num: "CR-165-01" },
  { id: 9,  name: "Ingersoll Rand 750 Air Compressor", id_num: "AC-750-01" },
  { id: 10, name: "Godwin CD150M Pump",             id_num: "DW-150-01" },
  { id: 11, name: "Freightliner 114SD Flatbed",     id_num: "TR-114-01" },
  { id: 12, name: "Trimble S7 Total Station",       id_num: "SV-S7-01" },
];

const PROJECT_COLORS = {
  "US-89 Bridge Replacement":     { bg: "#1a2e20", border: "#4a8a5a", dot: "#4a8a5a", text: "#7abf8a" },
  "Downtown Utility Relocation":  { bg: "#1a2535", border: "#4a6a9a", dot: "#4a6a9a", text: "#7a9aca" },
  "SR-101 Widening Phase 2":      { bg: "#2a1e18", border: "#9a5a38", dot: "#c07848", text: "#d4956a" },
  "Mesa Stormwater Basin":        { bg: "#1e1a2e", border: "#6a4a9a", dot: "#8a6aba", text: "#aa90d0" },
  "Riverside Culvert Extension":  { bg: "#1a2830", border: "#3a7a8a", dot: "#4a9aaa", text: "#7ac0d0" },
};

const ROLE_COLORS = {
  "Foreman": "#e07b39", "Superintendent": "#e07b39",
  "Equipment Operator": "#4a90a4", "Surveyor": "#6a9a6a",
  "Pipe Layer": "#7b8ea0", "Laborer": "#5a6a7a", "Traffic Control": "#c0a030",
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
    <div style={{ background:"#e07b39", borderRadius:8, padding:"4px 11px", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:18, color:"#fff", letterSpacing:"0.08em", flexShrink:0 }}>
      PRIMED
    </div>
  );
}

function HamburgerMenu({ onNavigate, currentScreen }) {
  const [open, setOpen] = useState(false);
  const items = [
    { key:"calendar", label:"Week Calendar", icon:"📅" },
    { key:"scheduler", label:"Add Schedule",  icon:"➕" },
    { key:"dispatch",  label:"Daily Detail",  icon:"📋" },
  ];
  return (
    <div style={{ position:"relative", zIndex:200 }}>
      <button onClick={() => setOpen(o=>!o)} style={{
        background: open ? "#1a2f3f" : "#0d1820",
        border:`1px solid ${open ? "#e07b39" : "#2a3a48"}`,
        borderRadius:8, padding:"9px 11px", cursor:"pointer",
        display:"flex", flexDirection:"column", gap:4, alignItems:"center", justifyContent:"center",
      }}>
        {open
          ? <span style={{ color:"#e07b39", fontSize:16, lineHeight:1 }}>✕</span>
          : [0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:18, height:2, background:"#8aa0b0", borderRadius:2 }} />
            ))
        }
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:"fixed", inset:0, zIndex:199 }} />
          <div style={{
            position:"absolute", top:"calc(100% + 8px)", left:0,
            background:"#0d1820", border:"1px solid #2a3a48",
            borderRadius:10, padding:6, minWidth:190,
            boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
            zIndex:201, animation:"fadeUp 0.15s ease",
          }}>
            {items.map((item, i) => (
              <div key={item.key}>
                {i > 0 && <div style={{ height:1, background:"#1a2830", margin:"3px 0" }} />}
                <button onClick={() => { onNavigate(item.key); setOpen(false); }} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:10,
                  background: currentScreen===item.key ? "#1a2f3f" : "transparent",
                  border:"none", borderRadius:7, padding:"10px 12px", cursor:"pointer",
                  textAlign:"left", fontFamily:"inherit",
                }}>
                  <span style={{ fontSize:15 }}>{item.icon}</span>
                  <span style={{ fontSize:13, fontWeight:600, color: currentScreen===item.key ? "#e07b39" : "#c0d0dc", letterSpacing:"0.02em" }}>
                    {item.label}
                  </span>
                  {currentScreen===item.key && <span style={{ marginLeft:"auto", color:"#e07b39", fontSize:10 }}>●</span>}
                </button>
              </div>
            ))}
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
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#6ab07a", marginBottom:6 }}>Notifications Sent</div>
      <div style={{ fontSize:12, color:"#5a7080" }}>{crewNames.length} crew member{crewNames.length!==1?"s":""} notified via {method==="both"?"email & SMS":method}</div>
    </div>
  );
  return (
    <div>
      {changeLines && changeLines.length > 0 && (
        <div style={{ background:"#0a1828", border:"1px solid #2a3a4a", borderRadius:10, padding:"14px 16px", marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#5a7080", textTransform:"uppercase", marginBottom:10 }}>Schedule Change Summary</div>
          {changeLines.map((l,i) => <div key={i} style={{ fontSize:12, fontFamily:"'IBM Plex Mono',monospace", lineHeight:1.7, color:"#8aa0b0" }}>{l}</div>)}
        </div>
      )}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#5a7080", textTransform:"uppercase", marginBottom:10 }}>Notify Crew — {crewNames.length}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:5, maxHeight:150, overflowY:"auto" }}>
          {crewNames.map((n,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, background:"#111820", border:"1px solid #1e2830", borderRadius:7, padding:"7px 10px" }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"#1e2830", border:"1px solid #2a3a48", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"#8aa0b0", fontWeight:700, flexShrink:0 }}>{n.split(" ").map(x=>x[0]).join("")}</div>
              <span style={{ fontSize:12, color:"#c0d0dc", fontWeight:600 }}>{n}</span>
              <span style={{ marginLeft:"auto", fontSize:10, color:"#3a5060" }}>{method==="email"?"✉":method==="sms"?"📱":"✉+📱"}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#5a7080", textTransform:"uppercase", marginBottom:8 }}>Notification Method</div>
        <div style={{ display:"flex", gap:6 }}>
          {[{v:"email",l:"✉ Email"},{v:"sms",l:"📱 SMS"},{v:"both",l:"✉+📱 Both"}].map(o => (
            <button key={o.v} onClick={()=>setMethod(o.v)} style={{ flex:1, padding:"8px 4px", borderRadius:7, cursor:"pointer", background:method===o.v?"#1a2f3f":"#0a1520", border:`1px solid ${method===o.v?"#e07b39":"#1e2830"}`, color:method===o.v?"#e07b39":"#5a7080", fontSize:11, fontFamily:"inherit", fontWeight:method===o.v?700:400 }}>{o.l}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={onBack} style={{ background:"none", border:"1px solid #2a3a48", borderRadius:7, color:"#8aa0b0", fontSize:12, padding:"10px 14px", cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
        <button onClick={handleSend} disabled={sending} style={{ flex:1, background:sending?"#1e2830":"#e07b39", border:"none", borderRadius:7, color:sending?"#5a7080":"#fff", fontSize:13, fontWeight:700, padding:"10px 0", cursor:sending?"not-allowed":"pointer", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>
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
      <input value={s} onChange={e=>setS(e.target.value)} placeholder="Search…" style={{ width:"100%", background:"#0a1520", border:"1px solid #1e2830", borderRadius:6, padding:"7px 10px", color:"#c0d0dc", fontSize:12, fontFamily:"inherit", outline:"none", marginBottom:6 }} />
      <div style={{ maxHeight:175, overflowY:"auto", display:"flex", flexDirection:"column", gap:3 }}>
        {filtered.map((item,i) => {
          const sel = selected.includes(item);
          return (
            <label key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 10px", borderRadius:6, cursor:"pointer", background:sel?"#1a2f3f":"transparent", border:`1px solid ${sel?"#e07b39":"#1a2830"}` }}>
              <div style={{ width:14, height:14, borderRadius:3, flexShrink:0, border:`2px solid ${sel?"#e07b39":"#3a4a58"}`, background:sel?"#e07b39":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {sel && <span style={{ color:"#fff", fontSize:9 }}>✓</span>}
              </div>
              <span style={{ fontSize:12, color:"#c0d0dc" }}>{item}</span>
              <input type="checkbox" checked={sel} onChange={()=>onToggle(item)} style={{ display:"none" }} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

function EditDrawer({ schedule, onClose, onSave }) {
  const c = PROJECT_COLORS[schedule.project.name] || { border:"#2a3a48", dot:"#5a7080", text:"#8aa0b0" };
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
  const allEquipNames = EQUIPMENT_LIST.map(e=>e.name);
  const allCrewNames  = EMPLOYEES.map(e=>e.name);
  const projTasks = TASKS_BY_PROJECT[PROJECTS.find(p=>p.name===schedule.project.name)?.id] || [];
  const hasChanges = eDate!==schedule.date||eTime!==schedule.startTime||JSON.stringify([...eCrew].sort())!==JSON.stringify([...schedule.crew].sort())||JSON.stringify([...eTasks].sort())!==JSON.stringify([...schedule.tasks].sort())||JSON.stringify([...eEquip].sort())!==JSON.stringify([...schedule.equipment].sort())||eNotes!==(schedule.notes||"");
  const doSave = () => { onSave(schedule.id,eDate,eTime,eCrew,eTasks,eEquip,eNotes); setMode("notify"); };
  const doCancel = () => { setEDate(schedule.date);setETime(schedule.startTime);setECrew([...schedule.crew]);setETasks([...schedule.tasks]);setEEquip([...schedule.equipment]);setENotes(schedule.notes||"");setMode("view"); };
  const TABS = [{key:"datetime",icon:"📅",label:"Date & Time"},{key:"crew",icon:"👷",label:"Crew"},{key:"tasks",icon:"✅",label:"Tasks"},{key:"equipment",icon:"🚜",label:"Equipment"},{key:"notes",icon:"📝",label:"Notes"}];
  const changeLines = [...(eDate!==schedule.date?[`📅 ${fmtDateLong(schedule.date)} → ${fmtDateLong(eDate)}`]:[]),...(eTime!==schedule.startTime?[`⏱ ${fmt12(schedule.startTime)} → ${fmt12(eTime)}`]:[])];

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(2px)" }} />
      <div style={{ position:"relative", width:"100%", maxWidth:580, background:"#0d1820", border:`1px solid ${c.border}`, borderTop:`3px solid ${c.dot}`, borderRadius:"16px 16px 0 0", padding:"20px 18px 36px", animation:"slideUp 0.25s ease", maxHeight:"88vh", overflowY:"auto" }}>
        {/* top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
          <div style={{ display:"flex", gap:8 }}>
            {mode==="view" && <button onClick={()=>setMode("edit")} style={{ background:"#1a2f3f", border:"1px solid #e07b39", borderRadius:6, color:"#e07b39", fontSize:12, padding:"6px 13px", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>✏️ Edit Schedule</button>}
            {mode==="edit" && (
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <StepDot n={1} active label="Edit" />
                <span style={{ color:"#2a3a48" }}>›</span>
                <StepDot n={2} label="Notify" />
              </div>
            )}
            {mode==="notify" && (
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <StepDot n="✓" done label="Edit" />
                <span style={{ color:"#2a3a48" }}>›</span>
                <StepDot n={2} active label="Notify" />
              </div>
            )}
            {mode==="done" && <div style={{ background:"#0a2010", border:"1px solid #2a5a30", borderRadius:6, padding:"6px 12px", fontSize:12, color:"#6ab07a", fontWeight:600 }}>✓ Updated & crew notified</div>}
          </div>
          <button onClick={onClose} style={{ background:"#1a2830", border:"1px solid #2a3a48", borderRadius:6, color:"#8aa0b0", fontSize:12, padding:"5px 10px", cursor:"pointer", fontFamily:"inherit" }}>✕</button>
        </div>

        {/* project header */}
        {mode!=="notify" && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:c.text, marginBottom:2 }}>{fmt12(mode==="edit"?eTime:mode==="done"?eTime:schedule.startTime)}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#fff", marginBottom:2 }}>{schedule.project.name}</div>
            <div style={{ fontSize:11, color:"#5a7080" }}>📍 {schedule.project.location}</div>
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
            <VSect label={`Tasks — ${(mode==="done"?eTasks:schedule.tasks).length}`}><div style={{ display:"flex", flexDirection:"column", gap:4 }}>{(mode==="done"?eTasks:schedule.tasks).map((t,i)=><div key={i} style={{ display:"flex", gap:7, padding:"6px 10px", background:"#0a1520", borderRadius:5, fontSize:12, color:"#a0b8c8", alignItems:"center" }}><span style={{ color:c.dot, fontSize:8 }}>◆</span>{t}</div>)}</div></VSect>
            {(mode==="done"?eEquip:schedule.equipment).length>0 && <VSect label={`Equipment — ${(mode==="done"?eEquip:schedule.equipment).length}`}><div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{(mode==="done"?eEquip:schedule.equipment).map((e,i)=><Tag key={i} mono>{e}</Tag>)}</div></VSect>}
            {(mode==="done"?eNotes:schedule.notes) && <VSect label="Notes"><div style={{ fontSize:12, color:"#8aa0b0", lineHeight:1.6, whiteSpace:"pre-wrap" }}>{mode==="done"?eNotes:schedule.notes}</div></VSect>}
          </div>
        )}

        {/* edit */}
        {mode==="edit" && (
          <>
            <div style={{ display:"flex", gap:4, marginBottom:14, overflowX:"auto" }}>
              {TABS.map(t=>(
                <button key={t.key} onClick={()=>setTab(t.key)} style={{ flexShrink:0, padding:"6px 10px", borderRadius:7, cursor:"pointer", background:tab===t.key?"#1a2f3f":"#0a1520", border:`1px solid ${tab===t.key?"#e07b39":"#1a2830"}`, color:tab===t.key?"#e07b39":"#5a7080", fontSize:11, fontFamily:"inherit", fontWeight:tab===t.key?700:400, display:"flex", alignItems:"center", gap:4 }}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{ minHeight:190, marginBottom:16 }}>
              {tab==="datetime" && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div><div style={{ fontSize:10, color:"#5a7080", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>Date</div><input type="date" value={eDate} onChange={e=>setEDate(e.target.value)} style={{ width:"100%", background:"#111820", border:`1px solid ${eDate!==schedule.date?"#e07b39":"#2a3a48"}`, borderRadius:7, padding:"10px 12px", color:"#d0dde8", fontSize:13, fontFamily:"'IBM Plex Mono',monospace", outline:"none" }} /></div>
                  <div><div style={{ fontSize:10, color:"#5a7080", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>Start Time</div><input type="time" value={eTime} onChange={e=>setETime(e.target.value)} style={{ width:"100%", background:"#111820", border:`1px solid ${eTime!==schedule.startTime?"#e07b39":"#2a3a48"}`, borderRadius:7, padding:"10px 12px", color:"#d0dde8", fontSize:13, fontFamily:"'IBM Plex Mono',monospace", outline:"none" }} /></div>
                  {eDate!==schedule.date && <DiffRow icon="📅" was={fmtDateLong(schedule.date)} now={fmtDateLong(eDate)} />}
                  {eTime!==schedule.startTime && <DiffRow icon="⏱" was={fmt12(schedule.startTime)} now={fmt12(eTime)} />}
                </div>
              )}
              {tab==="crew" && <div><SelectedTags items={eCrew} onRemove={tgCrew} /><MiniChecklist items={allCrewNames} selected={eCrew} onToggle={tgCrew} /></div>}
              {tab==="tasks" && <div><SelectedTags items={eTasks} onRemove={tgTask} /><MiniChecklist items={projTasks} selected={eTasks} onToggle={tgTask} /></div>}
              {tab==="equipment" && <div><SelectedTags items={eEquip} onRemove={tgEquip} mono /><MiniChecklist items={allEquipNames} selected={eEquip} onToggle={tgEquip} /></div>}
              {tab==="notes" && <div><textarea value={eNotes} onChange={e=>setENotes(e.target.value)} rows={6} placeholder="Site instructions, safety notes, delivery details…" style={{ width:"100%", background:"#0a1520", border:`1px solid ${eNotes!==(schedule.notes||"")?"#e07b39":"#1e2830"}`, borderRadius:8, padding:"10px 12px", color:"#c0d0dc", fontSize:13, fontFamily:"'Barlow',sans-serif", resize:"vertical", lineHeight:1.6, outline:"none" }} /><div style={{ fontSize:10, color:"#2a3a48", textAlign:"right", marginTop:4 }}>{eNotes.length} chars</div></div>}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={doCancel} style={{ background:"none", border:"1px solid #2a3a48", borderRadius:7, color:"#8aa0b0", fontSize:12, padding:"10px 14px", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
              <button onClick={doSave} disabled={!hasChanges} style={{ flex:1, background:hasChanges?"#e07b39":"#1e2830", border:"none", borderRadius:7, color:hasChanges?"#fff":"#3a4a58", fontSize:13, fontWeight:700, padding:"10px 0", cursor:hasChanges?"pointer":"not-allowed", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>{hasChanges?"Save & Notify Crew →":"No Changes Yet"}</button>
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
      <div style={{ width:20, height:20, borderRadius:"50%", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", background:done?"#2a5a30":active?"#e07b39":"#1e2830", color:done?"#6ab07a":active?"#fff":"#3a5060", border:`1px solid ${active?"#e07b39":"#2a3a48"}` }}>{n}</div>
      <span style={{ fontSize:10, color:done?"#6ab07a":active?"#e07b39":"#3a5060", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</span>
    </div>
  );
}
function InfoTile({ label, val, highlight, small }) {
  return <div style={{ flex:small?0:1, width:small?120:undefined, background:"#0a1520", border:"1px solid #1a2830", borderRadius:8, padding:"9px 12px" }}><div style={{ fontSize:9, color:"#5a7080", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>{label}</div><div style={{ fontSize:12, color:highlight?"#e07b39":"#c0d0dc", fontFamily:"'IBM Plex Mono',monospace" }}>{val}</div></div>;
}
function VSect({ label, children }) {
  return <div><div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#5a7080", textTransform:"uppercase", marginBottom:7 }}>{label}</div>{children}</div>;
}
function Tag({ children, mono }) {
  return <span style={{ fontSize:11, color:"#c0d0dc", background:"#111820", border:"1px solid #1e2830", borderRadius:5, padding:"3px 8px", fontFamily:mono?"'IBM Plex Mono',monospace":undefined }}>{children}</span>;
}
function SelectedTags({ items, onRemove, mono }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
      {items.map((item,i) => (
        <span key={i} onClick={()=>onRemove(item)} style={{ fontSize:11, color:"#e07b39", background:"#1a2f3f", border:"1px solid #e07b39", borderRadius:5, padding:"3px 8px", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, fontFamily:mono?"'IBM Plex Mono',monospace":undefined }}>
          {item} <span style={{ fontSize:13 }}>×</span>
        </span>
      ))}
      {items.length===0 && <span style={{ fontSize:12, color:"#3a5060", fontStyle:"italic" }}>None selected</span>}
    </div>
  );
}
function DiffRow({ icon, was, now }) {
  return <div style={{ fontSize:11, fontFamily:"'IBM Plex Mono',monospace", lineHeight:1.7, padding:"7px 10px", background:"#0a1520", borderRadius:6 }}><span style={{ color:"#3a5060" }}>{icon} Was: </span><span style={{ color:"#5a7080", textDecoration:"line-through" }}>{was}</span><br /><span style={{ color:"#3a5060" }}>&nbsp;&nbsp;&nbsp;Now: </span><span style={{ color:"#e07b39", fontWeight:600 }}>{now}</span></div>;
}

function JobPill({ s, onClick, compact }) {
  const c = PROJECT_COLORS[s.project.name] || { bg:"#1a2830", border:"#2a3a48", dot:"#5a7080", text:"#8aa0b0" };
  return (
    <div className="job-pill" onClick={()=>onClick(s)} style={{ background:c.bg, border:`1px solid ${c.border}`, borderLeft:`3px solid ${c.dot}`, borderRadius:7, padding:compact?"7px 8px":"10px 12px", cursor:"pointer" }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:compact?9:11, color:c.text, marginBottom:3 }}>{fmt12(s.startTime)}</div>
      <div style={{ fontSize:compact?10:13, fontWeight:600, color:"#d0dde8", lineHeight:1.3, marginBottom:compact?4:6 }}>{s.project.name}</div>
      <div style={{ display:"flex", gap:5 }}>
        <span style={{ fontSize:9, color:"#5a7080", background:"#0a1520", borderRadius:4, padding:"2px 5px", fontFamily:"'IBM Plex Mono',monospace" }}>👷 {s.crew.length}</span>
        <span style={{ fontSize:9, color:"#5a7080", background:"#0a1520", borderRadius:4, padding:"2px 5px", fontFamily:"'IBM Plex Mono',monospace" }}>✅ {s.tasks.length}</span>
      </div>
    </div>
  );
}

function ProjectLegend({ projects }) {
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:20 }}>
      {projects.map(p => { const c=PROJECT_COLORS[p]||{dot:"#5a7080",text:"#8aa0b0",bg:"#0d1820",border:"#2a3a48"}; return (
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
      <div style={{ display:"flex", gap:5, marginBottom:18, background:"#0d1820", border:"1px solid #1e2830", borderRadius:12, padding:7 }}>
        {weekDates.map((date,i) => {
          const sel=date===focusDate, tod=date===today, cnt=schedules.filter(s=>s.date===date).length;
          const dn=new Date(date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"});
          const dd=new Date(date+"T12:00:00").getDate();
          return (
            <button key={date} onClick={()=>setFocusDate(date)} style={{ flex:1, background:sel?"#1a2f3f":"transparent", border:`1px solid ${sel?"#e07b39":"transparent"}`, borderRadius:8, padding:"7px 3px", cursor:"pointer", textAlign:"center" }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:sel?"#e07b39":tod?"#c07840":"#5a7080" }}>{dn}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:17, color:sel?"#fff":"#6a8090", lineHeight:1 }}>{dd}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:3, marginTop:4, minHeight:5 }}>
                {Array.from({length:Math.min(cnt,3)}).map((_,di)=><span key={di} style={{ width:4, height:4, borderRadius:"50%", background:sel?"#e07b39":"#2a3a48", display:"inline-block" }} />)}
              </div>
            </button>
          );
        })}
      </div>
      {/* Day header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:isToday?"#e07b39":"#fff" }}>
            {new Date(focusDate+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
            {isToday && <span style={{ fontSize:11, color:"#e07b39", marginLeft:8, fontFamily:"'Barlow',sans-serif" }}>● Today</span>}
          </div>
          <div style={{ fontSize:11, color:"#5a7080", marginTop:1, fontFamily:"'IBM Plex Mono',monospace" }}>{daySched.length} job{daySched.length!==1?"s":""} · {totalCrew} crew</div>
        </div>
        <div style={{ display:"flex", gap:5 }}>
          <button onClick={()=>focusIdx>0&&setFocusDate(weekDates[focusIdx-1])} disabled={focusIdx===0} style={{ background:"#0d1820", border:"1px solid #2a3a48", borderRadius:7, color:focusIdx===0?"#2a3a48":"#8aa0b0", padding:"6px 11px", cursor:focusIdx===0?"default":"pointer", fontSize:14, fontFamily:"inherit" }}>‹</button>
          <button onClick={()=>focusIdx<4&&setFocusDate(weekDates[focusIdx+1])} disabled={focusIdx===4} style={{ background:"#0d1820", border:"1px solid #2a3a48", borderRadius:7, color:focusIdx===4?"#2a3a48":"#8aa0b0", padding:"6px 11px", cursor:focusIdx===4?"default":"pointer", fontSize:14, fontFamily:"inherit" }}>›</button>
        </div>
      </div>
      {/* Cards */}
      {daySched.length===0
        ? <div style={{ textAlign:"center", padding:"50px 20px", color:"#2a3a48", fontSize:13, fontStyle:"italic", background:"#0d1820", borderRadius:12, border:"1px solid #1a2830" }}>No jobs scheduled</div>
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
            <div key={date} style={{ background:"#0d1820", border:`1px solid ${isToday?"#e07b39":"#1e2830"}`, borderRadius:12, overflow:"hidden", minHeight:240, animation:`fadeUp 0.3s ease ${di*0.06}s both` }}>
              <div style={{ padding:"10px 10px 8px", borderBottom:"1px solid #1a2830", background:isToday?"#1a2a18":"#0d1820" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:15, color:isToday?"#e07b39":"#8aa0b0", textTransform:"uppercase" }}>{dn}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:isToday?"#c07840":"#3a5060", marginTop:1 }}>{dm}</div>
                {isToday && <div style={{ fontSize:8, fontWeight:700, color:"#e07b39", textTransform:"uppercase", marginTop:3 }}>● Today</div>}
              </div>
              <div style={{ padding:7, display:"flex", flexDirection:"column", gap:5 }}>
                {ds.length===0 ? <div style={{ padding:"18px 6px", textAlign:"center", fontSize:10, color:"#2a3a48", fontStyle:"italic" }}>No jobs</div>
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
            <div key={date} style={{ background:"#0a1520", border:"1px solid #1a2830", borderRadius:7, padding:"6px 8px", display:"flex", justifyContent:"space-around" }}>
              {[{v:ds.length,l:"jobs"},{v:crew,l:"crew"}].map((s,i)=>(
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, color:"#e07b39" }}>{s.v}</div>
                  <div style={{ fontSize:8, color:"#3a5060", letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

function WeekCalendarScreen({ schedules, onSave }) {
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
          <button className="nav-btn" onClick={prevWeek} style={{ background:"#0d1820", border:"1px solid #2a3a48", borderRadius:7, color:"#8aa0b0", padding:"7px 11px", cursor:"pointer", fontSize:14 }}>‹</button>
          <div style={{ padding:"7px 12px", background:"#0d1820", border:"1px solid #1e2830", borderRadius:7, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, color:"#c0d0dc", minWidth:land?160:110, textAlign:"center" }}>{weekLabel}</div>
          <button className="nav-btn" onClick={nextWeek} style={{ background:"#0d1820", border:"1px solid #2a3a48", borderRadius:7, color:"#8aa0b0", padding:"7px 11px", cursor:"pointer", fontSize:14 }}>›</button>
          <button className="nav-btn" onClick={goToday} style={{ background:"#0d1820", border:"1px solid #2a3a48", borderRadius:7, color:"#8aa0b0", padding:"7px 10px", cursor:"pointer", fontSize:11, letterSpacing:"0.06em" }}>TODAY</button>
        </div>
        <div style={{ animation:"fadeIn 0.2s ease" }}>
          {land
            ? <LandscapeCalendar weekDates={weekDates} schedules={schedules} today={today} onJobClick={setSel} weekProjects={weekProjects} />
            : <PortraitCalendar  weekDates={weekDates} schedules={schedules} today={today} focusDate={effectiveFocus} setFocusDate={setFocus} onJobClick={setSel} />
          }
        </div>
      </div>
      {sel && <EditDrawer schedule={sel} onClose={()=>setSel(null)} onSave={(id,...args)=>{ onSave(id,...args); setSel(null); }} />}
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
      <input value={s} onChange={e=>setS(e.target.value)} placeholder="Search…" style={{ width:"100%", boxSizing:"border-box", background:"#111820", border:"1px solid #2a3a48", borderRadius:6, padding:"8px 12px", color:"#d0dde8", fontSize:13, marginBottom:8, outline:"none", fontFamily:"inherit" }} />
      <div style={{ maxHeight:200, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
        {filtered.map(item=>{ const sel=selected.includes(item.id??item); return (
          <label key={item.id??item} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:7, cursor:"pointer", background:sel?"#1a2f3f":"transparent", border:`1px solid ${sel?"#e07b39":"#1e2830"}` }}>
            <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, border:`2px solid ${sel?"#e07b39":"#3a4a58"}`, background:sel?"#e07b39":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>{sel&&<span style={{ color:"#fff", fontSize:10 }}>✓</span>}</div>
            <span style={{ flex:1, fontSize:13, color:"#c0d0dc" }}>{item[labelKey]}</span>
            {subKey&&<span style={{ fontSize:11, color:"#5a7080" }}>{item[subKey]}</span>}
            <input type="checkbox" checked={sel} onChange={()=>onToggle(item.id??item)} style={{ display:"none" }} />
          </label>
        ); })}
      </div>
    </div>
  );
}

function SectionCard({ step, label, done, children }) {
  return (
    <div style={{ background:"#0d1820", border:"1px solid #1e2830", borderRadius:12, padding:22, animation:"fadeUp 0.3s ease" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:done?"#e07b39":"#1e2830", border:done?"none":"2px solid #3a4a58", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:done?"#fff":"#5a7080", flexShrink:0 }}>{done?"✓":step}</div>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:done?"#e07b39":"#8aa0b0", textTransform:"uppercase" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function AddScheduleScreen({ onScheduleAdded }) {
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
  const selProj = PROJECTS.find(p=>p.id===projId);
  const canSubmit = date&&projId&&empIds.length>0&&tasks.length>0;
  const selCrewNames = EMPLOYEES.filter(e=>empIds.includes(e.id)).map(e=>e.name);

  const handleConfirm = () => {
    const newSched = {
      id: Date.now(),
      date, startTime: time||"07:00",
      project: { name:selProj.name, location:selProj.location },
      crew: selCrewNames,
      tasks,
      equipment: EQUIPMENT_LIST.filter(e=>equipIds.includes(e.id)).map(e=>e.name),
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
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:24, color:"#6ab07a", marginBottom:8 }}>Schedule Added</div>
      <div style={{ fontSize:13, color:"#5a7080", marginBottom:28 }}>{selProj?.name} · {fmtDateLong(date)}</div>
      <button onClick={()=>{ setDate("");setTime("");setProjId(null);setEmpIds([]);setTasks([]);setEquipIds([]);setNotes("");setMode("form"); }} style={{ background:"#e07b39", border:"none", borderRadius:9, color:"#fff", fontSize:14, fontWeight:700, padding:"12px 28px", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase" }}>Add Another Schedule</button>
    </div>
  );

  return (
    <div style={{ padding:"20px 14px 64px", maxWidth:640, margin:"0 auto", display:"flex", flexDirection:"column", gap:14 }}>

      {/* Date + Time */}
      <SectionCard step={1} label="Date & Start Time" done={!!date}>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, color:"#5a7080", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Date</div>
            <input type="date" value={date} min={today} onChange={e=>setDate(e.target.value)} style={{ width:"100%", background:"#111820", border:`1px solid ${date?"#e07b39":"#2a3a48"}`, borderRadius:8, padding:"11px 13px", color:"#d0dde8", fontSize:14, fontFamily:"'IBM Plex Mono',monospace", outline:"none" }} />
          </div>
          <div style={{ width:150 }}>
            <div style={{ fontSize:10, color:"#5a7080", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Start Time</div>
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} style={{ width:"100%", background:"#111820", border:`1px solid ${time?"#e07b39":"#2a3a48"}`, borderRadius:8, padding:"11px 13px", color:"#d0dde8", fontSize:14, fontFamily:"'IBM Plex Mono',monospace", outline:"none" }} />
          </div>
        </div>
        {(date||time) && <div style={{ marginTop:8, fontSize:11, color:"#e07b39", fontFamily:"'IBM Plex Mono',monospace" }}>{date&&fmtDateLong(date)}{date&&time&&" · "}{time&&fmt12(time)}</div>}
      </SectionCard>

      {/* Project */}
      <SectionCard step={2} label="Select Project" done={!!projId}>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {PROJECTS.map(p=>(
            <button key={p.id} onClick={()=>{ setProjId(p.id); setTasks([]); }} style={{ display:"flex", alignItems:"center", gap:12, background:projId===p.id?"#1a2f3f":"transparent", border:`1px solid ${projId===p.id?"#e07b39":"#1e2830"}`, borderRadius:8, padding:"10px 14px", cursor:"pointer", textAlign:"left" }}>
              <span style={{ flex:1, fontSize:13, fontWeight:600, color:"#d0dde8", fontFamily:"inherit" }}>{p.name}</span>
              <span style={{ fontSize:11, color:"#5a7080" }}>{p.location}</span>
              {projId===p.id && <span style={{ color:"#e07b39", fontSize:11 }}>✓</span>}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Crew */}
      <SectionCard step={3} label="Assign Crew" done={empIds.length>0}>
        {empIds.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginBottom:10 }}>{EMPLOYEES.filter(e=>empIds.includes(e.id)).map(e=><span key={e.id} onClick={()=>tgEmp(e.id)} style={{ fontSize:12, color:"#e07b39", background:"#1a2f3f", border:"1px solid #e07b39", borderRadius:5, padding:"3px 9px", cursor:"pointer", marginRight:5, marginBottom:5, display:"inline-flex", alignItems:"center", gap:5 }}>{e.name} ×</span>)}</div>}
        <CheckList items={EMPLOYEES} selected={empIds} onToggle={tgEmp} labelKey="name" subKey="role" />
      </SectionCard>

      {/* Tasks */}
      <SectionCard step={4} label="Select Tasks" done={tasks.length>0}>
        {!projId ? <div style={{ fontSize:12, color:"#5a7080", fontStyle:"italic" }}>Select a project first.</div> : (
          <>
            {tasks.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginBottom:10 }}>{tasks.map((t,i)=><span key={i} onClick={()=>tgTask(t)} style={{ fontSize:11, color:"#e07b39", background:"#1a2f3f", border:"1px solid #e07b39", borderRadius:5, padding:"3px 8px", cursor:"pointer", marginRight:5, marginBottom:5, display:"inline-flex", alignItems:"center", gap:5 }}>{t} ×</span>)}</div>}
            <div style={{ fontSize:10, color:"#5a7080", marginBottom:7 }}>From estimate: <span style={{ color:"#8aa0b0" }}>{selProj?.name}</span></div>
            <div style={{ maxHeight:200, overflowY:"auto", display:"flex", flexDirection:"column", gap:3 }}>
              {(TASKS_BY_PROJECT[projId]||[]).map((t,i)=>{ const sel=tasks.includes(t); return (
                <label key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 11px", borderRadius:6, cursor:"pointer", background:sel?"#1a2f3f":"transparent", border:`1px solid ${sel?"#e07b39":"#1e2830"}` }}>
                  <div style={{ width:15, height:15, borderRadius:3, flexShrink:0, border:`2px solid ${sel?"#e07b39":"#3a4a58"}`, background:sel?"#e07b39":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>{sel&&<span style={{ color:"#fff", fontSize:9 }}>✓</span>}</div>
                  <span style={{ fontSize:13, color:"#c0d0dc" }}>{t}</span>
                  <input type="checkbox" checked={sel} onChange={()=>tgTask(t)} style={{ display:"none" }} />
                </label>
              ); })}
            </div>
          </>
        )}
      </SectionCard>

      {/* Equipment */}
      <SectionCard step={5} label="Equipment (optional)" done={equipIds.length>0}>
        {equipIds.length>0 && <div style={{ display:"flex", flexWrap:"wrap", marginBottom:10 }}>{EQUIPMENT_LIST.filter(e=>equipIds.includes(e.id)).map(e=><span key={e.id} onClick={()=>tgEquip(e.id)} style={{ fontSize:11, color:"#e07b39", background:"#1a2f3f", border:"1px solid #e07b39", borderRadius:5, padding:"3px 8px", cursor:"pointer", marginRight:5, marginBottom:5, display:"inline-flex", alignItems:"center", gap:5 }}>{e.name} ×</span>)}</div>}
        <CheckList items={EQUIPMENT_LIST} selected={equipIds} onToggle={tgEquip} labelKey="name" subKey="id_num" />
      </SectionCard>

      {/* Notes */}
      <SectionCard step={6} label="Notes (optional)" done={notes.trim().length>0}>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Site instructions, safety notes, delivery details…" rows={4} style={{ width:"100%", background:"#111820", border:`1px solid ${notes.trim()?"#e07b39":"#2a3a48"}`, borderRadius:8, padding:"11px 13px", color:"#d0dde8", fontSize:13, fontFamily:"'Barlow',sans-serif", resize:"vertical", lineHeight:1.6, outline:"none" }} />
        <div style={{ fontSize:10, color:"#3a4a58", textAlign:"right", marginTop:4 }}>{notes.length} chars</div>
      </SectionCard>

      {/* Submit */}
      <button onClick={handleConfirm} disabled={!canSubmit} style={{ width:"100%", padding:"15px 0", borderRadius:10, background:canSubmit?"#e07b39":"#1e2830", border:"none", cursor:canSubmit?"pointer":"not-allowed", color:canSubmit?"#fff":"#3a4a58", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, letterSpacing:"0.1em", textTransform:"uppercase" }}>
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
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#5a7080", textTransform:"uppercase", marginBottom:10 }}>Select Date</div>
        <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:4 }}>
          {allDates.map(d => {
            const cnt=schedules.filter(s=>s.date===d).length, sel=d===selDate, tod=d===today;
            return (
              <button key={d} onClick={()=>setSelDate(d)} style={{ flexShrink:0, background:sel?"#1a2f3f":"#0d1820", border:`1px solid ${sel?"#e07b39":"#1e2830"}`, borderRadius:10, padding:"9px 14px", cursor:"pointer", textAlign:"center", minWidth:90 }}>
                {tod && <div style={{ fontSize:8, color:"#e07b39", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>Today</div>}
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, color:sel?"#fff":"#8aa0b0" }}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short"})}</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:sel?"#a0c0d0":"#3a5060", marginTop:1 }}>{new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
                <div style={{ fontSize:9, color:sel?"#e07b39":"#3a5060", fontFamily:"'IBM Plex Mono',monospace", marginTop:5 }}>{cnt} job{cnt!==1?"s":""}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, padding:"12px 16px", background:"#0d1820", border:"1px solid #1e2830", borderRadius:10, flexWrap:"wrap" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:17, color:"#fff" }}>{fmtDateLong(selDate)}</div>
        </div>
        {[{v:daySchedules.length,l:"Jobs"},{v:totalCrew,l:"Crew"},{v:totalTasks,l:"Tasks"},{v:totalEquip,l:"Equip"}].map((s,i)=>(
          <div key={i} style={{ textAlign:"center", paddingLeft:14, borderLeft:"1px solid #1e2830" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#e07b39" }}>{s.v}</div>
            <div style={{ fontSize:9, color:"#5a7080", letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Job cards */}
      {daySchedules.length===0
        ? <div style={{ textAlign:"center", padding:"60px 20px", color:"#3a4a58", fontSize:13, fontStyle:"italic" }}>No jobs scheduled for this date.</div>
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
    <div style={{ background:"#0d1820", border:"1px solid #1e2830", borderRadius:12, overflow:"hidden", animation:`fadeUp 0.3s ease ${index*0.07}s both` }}>
      <div onClick={()=>setOpen(o=>!o)} style={{ padding:"14px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, borderBottom:open?"1px solid #1a2830":"none" }}>
        <div style={{ flexShrink:0, background:"#111820", border:"1px solid #2a3a48", borderRadius:8, padding:"5px 9px", textAlign:"center", minWidth:52 }}>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:"#e07b39", fontWeight:500 }}>{fmt12(schedule.startTime)}</div>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700, color:"#e0eaf0" }}>{schedule.project.name}</div>
          <div style={{ fontSize:11, color:"#5a7080", marginTop:1 }}>📍 {schedule.project.location}</div>
        </div>
        <div style={{ display:"flex", gap:7, flexShrink:0 }}>
          {[{icon:"👷",val:schedule.crew.length},{icon:"✅",val:schedule.tasks.length}].map((b,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:4, background:"#111820", border:"1px solid #2a3a48", borderRadius:6, padding:"3px 9px", fontSize:12, color:"#8aa0b0" }}>
              <span style={{ fontSize:12 }}>{b.icon}</span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace" }}>{b.val}</span>
            </div>
          ))}
        </div>
        <span style={{ color:"#3a4a58", fontSize:13, flexShrink:0, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s", display:"inline-block" }}>▼</span>
      </div>
      {open && (
        <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:16 }}>
          <DSect label={`Crew — ${schedule.crew.length} assigned`}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {schedule.crew.map((name,i) => {
                const emp = EMPLOYEES.find(e=>e.name===name);
                const role = emp?.role||"";
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:6, background:"#111820", border:"1px solid #1e2830", borderRadius:7, padding:"5px 10px" }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:ROLE_COLORS[role]||"#5a6a7a", flexShrink:0 }} />
                    <span style={{ fontSize:12, color:"#c0d0dc", fontWeight:600 }}>{name}</span>
                    {role && <span style={{ fontSize:10, color:"#4a6070" }}>{role}</span>}
                  </div>
                );
              })}
            </div>
          </DSect>
          <DSect label={`Tasks — ${schedule.tasks.length}`}>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {schedule.tasks.map((t,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", background:"#0a1520", borderRadius:5, fontSize:12, color:"#a0b8c8" }}><span style={{ color:"#e07b39", fontSize:8 }}>◆</span>{t}</div>)}
            </div>
          </DSect>
          {schedule.equipment.length>0 && <DSect label={`Equipment — ${schedule.equipment.length}`}><div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{schedule.equipment.map((e,i)=><span key={i} style={{ fontSize:11, color:"#7a9aaa", background:"#0a1520", border:"1px solid #1a2a38", borderRadius:5, padding:"4px 9px", fontFamily:"'IBM Plex Mono',monospace" }}>{e}</span>)}</div></DSect>}
          {schedule.notes && <div style={{ padding:"9px 13px", background:"#0a1820", border:"1px solid #1e3040", borderRadius:7, fontSize:12, color:"#7a9aaa", lineHeight:1.6, display:"flex", gap:8 }}><span style={{ color:"#e07b39", flexShrink:0 }}>📝</span>{schedule.notes}</div>}
        </div>
      )}
    </div>
  );
}

function DSect({ label, children }) {
  return <div><div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", color:"#5a7080", textTransform:"uppercase", marginBottom:8 }}>{label}</div>{children}</div>;
}

// ═══════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════
export default function PrimedApp() {
  const [screen, setScreen] = useState("calendar");
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [screen]);

  const handleSave = (id, newDate, newTime, newCrew, newTasks, newEquip, newNotes) => {
    setSchedules(prev => prev.map(s => s.id===id ? { ...s, date:newDate, startTime:newTime, crew:newCrew, tasks:newTasks, equipment:newEquip, notes:newNotes } : s));
  };

  const handleScheduleAdded = newSched => {
    setSchedules(prev => [...prev, newSched]);
  };

  const navigate = (s) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const PAGE_TITLES = { calendar:"Week at a Glance", scheduler:"Add Schedule", dispatch:"Daily Detail" };
  const PAGE_SUBS   = { calendar:"HOME · MANAGEMENT VIEW", scheduler:"FIELD SCHEDULER", dispatch:"DISPATCH BOARD" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Barlow:wght@400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#080f16; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:#0d1820; }
        ::-webkit-scrollbar-thumb { background:#2a3a48; border-radius:2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideInLeft { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }
        .job-pill:hover { filter:brightness(1.15); transform:translateY(-1px); }
        .job-pill { transition:filter 0.15s, transform 0.15s; }
        .nav-btn:hover { background:#1a2830 !important; }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter:invert(0.5); cursor:pointer; }
        textarea, input { outline:none; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#080f16", fontFamily:"'Barlow',sans-serif" }}>
        {/* ── Global Top Nav ── */}
        <div style={{
          position:"sticky", top:0, zIndex:100,
          background:"#080f16",
          borderBottom:"1px solid #1a2830",
          padding:"12px 16px",
          display:"flex", alignItems:"center", gap:14,
        }}>
          <HamburgerMenu onNavigate={navigate} currentScreen={screen} />
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            {/* Primed hard hat icon */}
            <div style={{ width:36, height:36, borderRadius:9, background:"#0d1820", border:"1px solid #2a3a48", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
                <style>{`@keyframes primed-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.pa{transform-origin:17px 17px;animation:primed-spin 1.4s linear infinite}`}</style>
                <g className="pa">
                  <circle cx="17" cy="17" r="15" stroke="#2a3a48" strokeWidth="2" fill="none"/>
                  <path d="M17 2 A15 15 0 0 1 32 17" stroke="#e07b39" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                </g>
                <path d="M9 20 Q9 13 17 12 Q25 13 25 20 Z" fill="#e07b39"/>
                <rect x="7" y="19.5" width="20" height="2.5" rx="1.2" fill="#c86a28"/>
                <path d="M17 12 L17 19.5" stroke="#c86a28" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:20, color:"#fff", letterSpacing:"0.06em" }}>PRIMED</span>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:15, color:"#5a7080", letterSpacing:"0.04em" }}>{PAGE_TITLES[screen]}</span>
              </div>
              <div style={{ fontSize:9, color:"#3a5060", fontFamily:"'IBM Plex Mono',monospace", letterSpacing:"0.1em" }}>{PAGE_SUBS[screen]}</div>
            </div>
          </div>
        </div>

        {/* ── Screen Content ── */}
        <div key={screen} style={{ animation:"fadeIn 0.2s ease" }}>
          {screen==="calendar" && <WeekCalendarScreen schedules={schedules} onSave={handleSave} />}
          {screen==="scheduler" && <AddScheduleScreen onScheduleAdded={handleScheduleAdded} />}
          {screen==="dispatch"  && <DailyDetailScreen schedules={schedules} />}
        </div>
      </div>
    </>
  );
}
