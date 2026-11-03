/* Senso4s Basic Lovelace Card v0.1.1b1. MIT license. Read-only. */
(()=>{
"use strict";
const TAG="senso4s-basic-card", VERSION="0.1.1b1";
const L={"sv":{"sub":"Bluetooth-våg för gasolflaska","weight":"Gasol kvar","estimatedEmpty":"Beräknat tom","level":"Gasolnivå","battery":"Batteri","signal":"Bluetooth-signal","seen":"Senast behandlad BLE-data","changed":"Senast ändrad vikt i HA","notice":"Senaste BLE-kontakt är inte samma sak som en ny fysisk vägning. Tid för viktändring är Home Assistants tidsstämpel.","history":"Historik","diagnostics":"Diagnostik","recent":"Senaste ändringar","reload":"Uppdatera","noScale":"Ingen Senso4s-våg hittades","multi":"Flera Senso4s-vågar hittades. Välj en gas_remaining-entitet i kortets konfiguration.","missing":"Sensordata saknas","fresh":"BLE-data mottagen","stale":"Gammal BLE-data","noTime":"BLE-tidsstämpel saknas","error":"Vågen rapporterar fel","calibration":"Kalibrering behövs","low":"Låg gasolnivå","mode":"Användningsläge","modeHeating":"Uppvärmning","modeBBQ":"Grillning","modeCamping":"Camping","modeCaravanning":"Husvagn","modeHousehold":"Hushåll","unknownMode":"Okänt användningsläge","calibrationTitle":"Behöver kalibrering","errorTitle":"Felstatus","lowTitle":"Låg gasol","yes":"Ja","no":"Nej","unavailable":"Ej tillgängligt","loading":"Hämtar historik…","empty":"Ingen historik med värdeförändringar","range":"Historikperiod","recorder":"Historiken hämtas från Home Assistant Recorder. Kortet är endast läsande.","readOnly":"Endast läsning","refillTank":"Fyll på flaskan","recalibrateScale":"Kalibrera vågen","settingsOnly":"Endast inställningar","comingLater":"Kommer senare","plannedActions":"Planerade funktioner","hours":"timmar","min":"min","hour":"tim","days":"dygn","ago":"sedan","now":"nyss","timeMissing":"Tid saknas","unit":"kg"},"en":{"sub":"Bluetooth gas cylinder scale","weight":"Gas remaining","estimatedEmpty":"Estimated empty","level":"Gas level","battery":"Battery","signal":"Bluetooth signal","seen":"Last processed BLE data","changed":"Last weight change in HA","notice":"The most recent BLE contact does not imply a new physical weighing. Weight-change timestamps come from Home Assistant.","history":"History","diagnostics":"Diagnostics","recent":"Recent changes","reload":"Refresh","noScale":"No Senso4s scale found","multi":"Multiple Senso4s scales found. Select a gas_remaining entity in the card configuration.","missing":"Sensor data unavailable","fresh":"BLE data received","stale":"Stale BLE data","noTime":"No BLE timestamp","error":"Scale reports an error","calibration":"Calibration needed","low":"Low gas","mode":"Usage mode","modeHeating":"Heating","modeBBQ":"BBQ","modeCamping":"Camping","modeCaravanning":"Caravanning","modeHousehold":"Household","unknownMode":"Unknown usage mode","calibrationTitle":"Needs calibration","errorTitle":"Error status","lowTitle":"Low gas","yes":"Yes","no":"No","unavailable":"Unavailable","loading":"Loading history…","empty":"No recorded changes","range":"History period","recorder":"History comes from Home Assistant Recorder. This card is read-only.","readOnly":"Read only","refillTank":"Refill tank","recalibrateScale":"Recalibrate Scale","settingsOnly":"Settings Only","comingLater":"Coming later","plannedActions":"Planned features","hours":"hours","min":"min","hour":"hr","days":"days","ago":"ago","now":"just now","timeMissing":"No timestamp","unit":"kg"}};
const CSS="\n:host{display:block;color:var(--primary-text-color);font-family:var(--primary-font-family,Roboto,sans-serif)}\n*{box-sizing:border-box}ha-card{padding:18px;overflow:hidden;background:var(--ha-card-background,var(--card-background-color))}\n.top{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:18px}\n.brand{display:flex;align-items:center;gap:10px}.logo{display:grid;place-items:center;width:43px;height:43px;border-radius:13px;background:linear-gradient(140deg,#26b4ff,#065bba);color:#fff}\n.logo ha-icon{--mdc-icon-size:25px}h2{margin:0;font-size:18px;font-weight:750;letter-spacing:-.3px}\n.muted,.small{font-size:11px;color:var(--secondary-text-color);line-height:1.5}.status{font-size:11px;border:1px solid var(--divider-color);border-radius:16px;padding:6px 9px;white-space:nowrap;display:flex;gap:7px;align-items:center}\n.status:before{content:\"\";height:8px;width:8px;border-radius:50%;background:var(--success-color,#2ed39c)}\n.status.warn:before{background:var(--warning-color,#ffac35)}.status.bad:before{background:var(--error-color,#ef6363)}\n.hero{display:grid;grid-template-columns:120px minmax(0,1fr);gap:15px;align-items:center;padding:2px 0 17px} .hero-details{min-width:0}\n.bottle{width:104px;height:161px;margin:auto;display:flex;flex-direction:column;align-items:center}\n.handle{width:54px;height:20px;border:6px solid var(--primary-text-color);opacity:.92;border-bottom:0;border-radius:12px 12px 0 0}\n.neck{height:8px;width:82px;border:5px solid var(--primary-text-color);border-bottom:0;opacity:.92}\n.body{position:relative;width:103px;height:132px;border:6px solid var(--primary-text-color);border-radius:18px 18px 12px 12px;overflow:hidden;background:rgba(55,141,213,.09)}\n.fill{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(150deg,#39bdff,#0876de);transition:height .35s}\n.overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;text-shadow:0 1px 3px #18314a;font-weight:800}\n.overlay strong{font-size:23px}.overlay ha-icon{--mdc-icon-size:30px}\n.big{font-weight:800;font-size:37px;letter-spacing:-1px;margin:5px 0;line-height:1.2}\n.label{font-size:12px;font-weight:650;color:var(--secondary-text-color)}\n.estimate{display:flex;align-items:center;gap:7px;margin-top:10px;color:var(--secondary-text-color);font-size:12px;line-height:1.35}\n.estimate ha-icon{--mdc-icon-size:18px;flex:0 0 auto;color:var(--secondary-text-color)}\n.estimate strong{color:var(--primary-text-color);font-weight:700;font-size:13px}\n.hero-meta{display:flex;align-items:center;flex-wrap:wrap;gap:7px 14px;margin-top:10px}\n.hero-meta-item{display:inline-flex;align-items:center;gap:5px;color:var(--secondary-text-color);font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}\n.hero-meta-item ha-icon{--mdc-icon-size:18px;color:var(--secondary-text-color)}\n.hero-meta-item.good ha-icon{color:var(--success-color,#27b981)}\n.hero-meta-item.warn ha-icon{color:var(--warning-color,#f4ad38)}\n.hero-meta-item.bad ha-icon{color:var(--error-color,#ee6262)}\n.hero-meta-item strong{font-size:13px;font-weight:700;color:var(--primary-text-color)}\n.times{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 12px}\n.time{border:1px solid var(--divider-color);border-radius:12px;padding:11px;min-width:0}\n.time strong{display:block;margin:7px 0 4px;font-size:13px;overflow-wrap:anywhere}\n.hint{display:flex;gap:8px;padding:0 0 12px;color:var(--secondary-text-color);font-size:11px;line-height:1.5}\n.hint ha-icon{--mdc-icon-size:17px;flex-shrink:0;color:var(--info-color,#40a7ea)}\n.alert{font-size:12px;border-left:3px solid var(--warning-color,#ffac35);background:var(--secondary-background-color,rgba(130,130,130,.08));padding:10px;border-radius:7px;margin:9px 0}\n.section{border-top:1px solid var(--divider-color)}button{cursor:pointer;color:inherit;font:inherit}\n.toggle{border:0;background:none;text-align:left;display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 0;font-size:14px;font-weight:700}\n.toggle ha-icon{--mdc-icon-size:20px}.panel{padding-bottom:15px}.diag-panel{padding-top:2px}\n.tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}.tab,.reload{border:1px solid var(--divider-color);border-radius:9px;background:transparent;padding:7px 10px;font-size:12px}\n.tab[aria-pressed=\"true\"]{border-color:var(--primary-color,#168be1);color:var(--primary-color,#168be1)}\n.reload{margin-left:auto}.chart{width:100%;height:125px;display:block}\n.range{display:flex;justify-content:space-between;color:var(--secondary-text-color);font-size:11px;margin-bottom:9px}\n.events{max-height:260px;overflow-y:auto}.event{display:flex;justify-content:space-between;gap:10px;align-items:center;border-top:1px solid var(--divider-color);padding:9px 0;font-size:12px}\n.event time{white-space:nowrap;font-size:11px;color:var(--secondary-text-color)}\n.pending-actions{display:flex;flex-wrap:wrap;gap:8px;padding:11px 0}\n.pending-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color,rgba(130,130,130,.07));padding:10px 12px;font-size:12px;font-weight:650;min-height:39px}\n.pending-btn ha-icon{--mdc-icon-size:18px}\n.pending-btn:disabled{opacity:.7;cursor:not-allowed}\n.refill-action{margin:0 0 7px}\n.refill-action .pending-btn{border-color:var(--warning-color,#f4ad38)}\n.planned-hint{width:100%;font-size:11px;color:var(--secondary-text-color);line-height:1.4;margin-top:1px}\n.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n.diag{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;min-height:104px;padding:12px;border:1px solid var(--divider-color);border-radius:11px;text-align:center}\n.diag .small{display:flex;align-items:center;justify-content:center;width:100%;min-height:32px;line-height:1.35;font-size:13px;font-weight:700;text-align:center}\n.diag-visual{display:inline-flex;align-items:center;justify-content:center;margin-top:8px;padding:3px;border-radius:8px}\n.diag-visual ha-icon{--mdc-icon-size:29px}\n.diag-visual.good{color:var(--success-color,#27b981)}\n.diag-visual.warn{color:var(--warning-color,#f4ad38)}\n.diag-visual.bad{color:var(--error-color,#ee6262)}\n.diag-visual.info{color:var(--info-color,#239ce5)}\n.diag-visual.neutral{color:var(--secondary-text-color)}\n.empty{padding:15px;color:var(--secondary-text-color);font-size:12px}footer{display:flex;justify-content:space-between;color:var(--secondary-text-color);font-size:10px;border-top:1px solid var(--divider-color);padding-top:10px;margin-top:8px}\n@media(max-width:410px){ha-card{padding:13px}.top{align-items:flex-start}.status{font-size:10px}.hero{grid-template-columns:100px minmax(0,1fr);gap:8px}.bottle{transform:scale(.88);transform-origin:center}.big{font-size:30px}.hero-meta{gap:7px 12px}.hero-meta-item{font-size:11px}.time{padding:9px}}\n";
class Senso4sBasicCard extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this._config={title:"Senso4s Basic",entity:"",language:"auto",history_hours:168,show_history:true,show_diagnostics:true};
    this._historyOpen=false;this._diagOpen=false;this._view="gas_remaining";
    this._history=[];this._loaded=false;this._loading=false;this._error="";
    this._generation=0;this._scheduled=false;
  }
  static getStubConfig(){return {};}
  getCardSize(){return this._config.show_history||this._config.show_diagnostics?6:4;}
  getGridOptions(){return {columns:12,rows:"auto"};}
  setConfig(config){
    if(!config||typeof config!=="object")throw new Error("Configuration is required");
    const previous=JSON.stringify(this._config);
    this._config={title:"Senso4s Basic",entity:"",language:"auto",history_hours:168,show_history:true,show_diagnostics:true,...config};
    if(typeof this._config.show_history!=="boolean"||typeof this._config.show_diagnostics!=="boolean") throw new Error("show_history and show_diagnostics must be boolean values (true/false)");
    this._config.history_hours=Math.max(1,Math.min(720,Number(this._config.history_hours)||168));
    if(!["auto","sv","en"].includes(this._config.language))this._config.language="auto";
    if(JSON.stringify(this._config)!==previous){this._loaded=false;this._loading=false;this._history=[];this._generation++;}
    this._schedule();
  }
  set hass(hass){
    if(!hass?.states)return;
    this._hass=hass;
    this._schedule();
  }
  get hass(){return this._hass;}
  _lang(){return this._config.language!=="auto"?this._config.language:String(this._hass?.language||"en").toLowerCase().startsWith("sv")?"sv":"en";}
  _t(key){return L[this._lang()][key]||key;}
  _esc(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");}
  _candidates(){return Object.keys(this._hass?.states||{}).filter(id=>/^sensor\.senso4s_.+_gas_remaining$/.test(id)).sort();}
  _prefix(){
    const selected=String(this._config.entity||"").trim();
    if(selected){const n=selected.replace(/^sensor\./,"").replace(/_(gas_remaining|gas_level|battery)$/,"");return /^senso4s_.+/.test(n)?n:null;}
    const list=this._candidates();return list.length===1?list[0].slice(7,-"_gas_remaining".length):null;
  }
  _id(key){
    const p=this._prefix();if(!p)return null;
    const ids=key==="rssi"?[`sensor.${p}_signal_strength`,`sensor.${p}_rssi`]
      :key==="error"?[`binary_sensor.${p}_error`,`binary_sensor.${p}_has_error`]
      :["needs_calibration","low_gas"].includes(key)?[`binary_sensor.${p}_${key}`]
      :[`sensor.${p}_${key}`];
    return ids.find(id=>this._hass?.states?.[id])||ids[0];
  }
  _state(key){const id=this._id(key);return id?this._hass?.states?.[id]||null:null;}
  _val(key){const s=this._state(key);return s&&!["unknown","unavailable","none",""].includes(s.state)?s.state:null;}
  _number(key){const v=this._val(key);return v!==null&&Number.isFinite(Number(v))?Number(v):null;}
  _display(key,digits=0,unit=""){
    const n=this._number(key);if(n===null)return "—";
    return this._esc(n.toLocaleString(this._lang()==="sv"?"sv-SE":"en-GB",{minimumFractionDigits:digits,maximumFractionDigits:digits})+(unit?" "+unit:""));
  }
  // Senso4s usage modes are the named values exposed by the integration.
  // Color on a usage mode is a category cue, not a fault indicator.
  _modeVisual(){
    const mode=String(this._val("usage_mode")??"").trim().toLowerCase();
    const modes={
      bbq:["mdi:grill","warn","modeBBQ"],
      camping:["mdi:tent","good","modeCamping"],
      caravanning:["mdi:caravan","info","modeCaravanning"],
      heating:["mdi:radiator","warn","modeHeating"],
      household:["mdi:home","info","modeHousehold"]
    };
    const [icon,tone,label]=modes[mode]||["mdi:help-circle-outline","neutral","unknownMode"];
    return {icon,tone,description:this._t(label)};
  }
  _flagVisual(key){
    const state=this._val(key);
    if(state!=="on"&&state!=="off")return {icon:"mdi:help-circle-outline",tone:"neutral",description:this._t("unavailable")};
    if(state==="off")return {icon:"mdi:check-circle",tone:"good",description:this._t("no")};
    // Calibration needs attention, while active error/low gas are warnings.
    return {icon:key==="needs_calibration"?"mdi:scale-balance":"mdi:alert-circle",tone:key==="needs_calibration"?"warn":"bad",description:this._t("yes")};
  }
  _diagIcon(key){
    const data=key==="usage_mode"?this._modeVisual():this._flagVisual(key);
    return `<span class="diag-visual ${data.tone}" role="img" aria-label="${this._esc(data.description)}" title="${this._esc(data.description)}"><ha-icon icon="${data.icon}"></ha-icon></span>`;
  }
  _date(v){const d=new Date(v||"");return Number.isFinite(d.getTime())?d.toLocaleString(this._lang()==="sv"?"sv-SE":"en-GB",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}):"—";}
  _dateOnly(v){
    const d=new Date(v||"");
    return Number.isFinite(d.getTime())?d.toLocaleDateString(this._lang()==="sv"?"sv-SE":"en-GB",{day:"numeric",month:"short",year:"numeric"}):"—";
  }
  _age(v){
    const delta=Date.now()-new Date(v||"").getTime();if(!Number.isFinite(delta)||delta< -120000)return this._t("timeMissing");
    if(delta<60000)return this._t("now");
    const num=delta<3600000?Math.floor(delta/60000):delta<86400000?Math.floor(delta/3600000):Math.floor(delta/86400000);
    const unit=delta<3600000?"min":delta<86400000?"hour":"days";
    return this._lang()==="sv"?`${num} ${this._t(unit)} sedan`:`${num} ${this._t(unit)} ago`;
  }
  _schedule(){if(this._scheduled)return;this._scheduled=true;Promise.resolve().then(()=>{this._scheduled=false;this._render();});}
  async _loadHistory(){
    if(!this._config.show_history||!this._hass?.callApi||this._loading||this._loaded)return;
    const ids=["gas_remaining","battery","rssi"].map(x=>this._id(x)).filter(id=>id&&this._hass.states[id]);
    if(!ids.length){this._loaded=true;return;}
    const token=++this._generation;this._loading=true;this._error="";this._schedule();
    const end=new Date().toISOString();
    const start=new Date(Date.now()-this._config.history_hours*3600000).toISOString();
    // Home Assistant REST history defaults to just 24 hours after start.
    // Always specify end_time: our default window spans 7 days until now.
    const path=`history/period/${encodeURIComponent(start)}?filter_entity_id=${encodeURIComponent(ids.join(","))}&end_time=${encodeURIComponent(end)}&minimal_response&no_attributes&significant_changes_only=0`;
    try{
      const results=await this._hass.callApi("GET",path);
      if(token!==this._generation)return;
      if(!Array.isArray(results))throw Error("Unexpected response");
      // Read only the Recorder samples required for the three graphs.
      // Do not record transient RSSI changes in a duplicate event list.
      this._history=results.filter(rows=>Array.isArray(rows)&&rows.length>0);
      this._loaded=true;
    }catch(e){if(token===this._generation){this._error=String(e?.message||e);this._loaded=true;}}
    finally{if(token===this._generation){this._loading=false;this._schedule();}}
  }
  _chart(){
    const id=this._id(this._view);
    const results=this._history.find(rows=>rows?.some(r=>r?.entity_id===id))||[];
    const data=results.map(r=>({t:new Date(r.last_changed||r.last_updated||r.lu||0).getTime(),v:Number(r.state)})).filter(r=>r.t&&Number.isFinite(r.v));
    if(!data.length)return `<div class="empty">${this._esc(this._t("empty"))}</div>`;
    const min=Math.min(...data.map(x=>x.v)),max=Math.max(...data.map(x=>x.v));
    const span=Math.max(max-min,this._view==="gas_remaining"?.2:1),low=min-span*.15,high=max+span*.15;
    const end=Date.now(),start=end-this._config.history_hours*3600000;
    const x=t=>Math.max(10,Math.min(690,10+(t-start)/(end-start)*680));
    const y=v=>Math.max(8,Math.min(128,128-(v-low)/(high-low)*118));
    // Step chart: scale values are discrete and should not imply smooth weighing.
    const path=data.map((p,i)=>i===0?`M${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)}`:`H${x(p.t).toFixed(1)} V${y(p.v).toFixed(1)}`).join(" ");
    return `<div class="range"><span>${this._config.history_hours} ${this._esc(this._t("hours"))}</span><span>${min.toFixed(2)}–${max.toFixed(2)} ${this._view==="gas_remaining"?"kg":this._view==="rssi"?"dBm":"%"}</span></div><svg class="chart" viewBox="0 0 700 140" role="img"><line x1="10" y1="130" x2="690" y2="130" stroke="var(--divider-color)"/><path d="${path}" fill="none" stroke="var(--info-color,#239ce5)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  _render(){
    if(!this._hass)return;
    const t=k=>this._esc(this._t(k));
    const list=this._candidates(),p=this._prefix(),weight=this._state("gas_remaining");
    const level=this._number("gas_level"),filled=level===null?0:Math.max(0,Math.min(100,level));
    const seen=this._state("battery")?.attributes?.last_seen;
    const changed=weight?.last_changed;
    const hasError=this._val("error")==="on",cal=this._val("needs_calibration")==="on",low=this._val("low_gas")==="on";
    const age=Date.now()-new Date(seen||"").getTime();
    let status=["fresh","good"];
    if(!weight||this._val("gas_remaining")===null)status=["missing","warn"];
    else if(hasError)status=["error","bad"];
    else if(cal)status=["calibration","warn"];
    else if(Number.isFinite(age)&&age>1800000)status=["stale","warn"];
    else if(!Number.isFinite(age))status=["noTime","warn"];
    // These color bands are UI guidance, not calibrated signal reliability.
    const battery=this._number("battery"),rssi=this._number("rssi");
    const batterySeverity=battery===null?"neutral":battery<10?"bad":battery<20?"warn":"good";
    const signalSeverity=rssi===null?"neutral":rssi<-85?"bad":rssi<-70?"warn":"good";
    const openHistory=this._historyOpen,openDiag=this._diagOpen;
    this.shadowRoot.innerHTML=`
<style>${CSS}</style>
<ha-card>
 <div class="top"><div class="brand"><div class="logo"><ha-icon icon="mdi:gas-cylinder"></ha-icon></div><div><h2>${this._esc(this._config.title||"Senso4s Basic")}</h2><div class="muted">${t("sub")}</div></div></div><span class="status ${status[1]}">${t(status[0])}</span></div>
 ${!p||!weight?`<div class="alert">${list.length>1?t("multi"):t("noScale")}</div>`:`
 ${hasError||cal||low?`<div class="alert">${[hasError?t("error"):"",cal?t("calibration"):"",low?t("low"):""].filter(Boolean).join(" · ")}</div>`:""}
 <div class="hero"><div class="bottle"><div class="handle"></div><div class="neck"></div><div class="body"><div class="fill" style="height:${filled}%"></div><div class="overlay"><ha-icon icon="mdi:fire"></ha-icon><strong>${level===null?"—":Math.round(level)+"%"}</strong></div></div></div>
 <div class="hero-details"><div class="label">${t("weight")}</div><div class="big">${this._display("gas_remaining",2,"kg")}</div>
 <div class="estimate"><ha-icon icon="mdi:calendar-clock"></ha-icon><span>${t("estimatedEmpty")}: <strong>${this._dateOnly(this._val("estimated_empty"))}</strong></span></div>
 <div class="hero-meta" aria-label="${t("battery")}, ${t("signal")}">
 <span class="hero-meta-item ${batterySeverity}" title="${t("battery")}"><ha-icon icon="mdi:battery"></ha-icon><strong>${this._display("battery",0,"%")}</strong></span>
 <span class="hero-meta-item ${signalSeverity}" title="${t("signal")}"><ha-icon icon="mdi:bluetooth"></ha-icon><strong>${this._display("rssi",0,"dBm")}</strong></span>
 </div></div></div>
 ${level!==null&&level<10?`<div class="pending-actions refill-action"><button type="button" class="pending-btn" disabled title="${t("comingLater")}"><ha-icon icon="mdi:gas-cylinder"></ha-icon>${t("refillTank")}</button><span class="planned-hint">${t("comingLater")}</span></div>`:""}
 ${this._config.show_history?`<section class="section"><button class="toggle" data-toggle="history" aria-expanded="${openHistory}">${t("history")}<ha-icon icon="mdi:chevron-${openHistory?"up":"down"}"></ha-icon></button>
 ${openHistory?`<div class="panel"><div class="tabs">${[["gas_remaining","weight"],["battery","battery"],["rssi","signal"]].map(([key,label])=>`<button class="tab" data-view="${key}" aria-pressed="${this._view===key}">${t(label)}</button>`).join("")}<button class="reload" data-refresh="true" title="${t("reload")}">↻</button></div>${this._loading?`<div class="empty">${t("loading")}</div>`:this._error?`<div class="alert">${this._esc(this._error)}</div>`:this._chart()}<div class="small">${t("recorder")}</div></div>`:""}
 </section>`:""}
 ${this._config.show_diagnostics?`<section class="section"><button class="toggle" data-toggle="diag" aria-expanded="${openDiag}">${t("diagnostics")}<ha-icon icon="mdi:chevron-${openDiag?"up":"down"}"></ha-icon></button>
 ${openDiag?`<div class="panel diag-panel">
 <div class="times"><div class="time"><span class="muted">${t("seen")}</span><strong>${this._date(seen)}</strong><span class="small">${this._esc(this._age(seen))}</span></div><div class="time"><span class="muted">${t("changed")}</span><strong>${this._date(changed)}</strong><span class="small">${this._esc(this._age(changed))}</span></div></div>
 <div class="hint"><ha-icon icon="mdi:information-outline"></ha-icon><span>${t("notice")}</span></div>
 <div class="grid">${[
 ["mode",this._diagIcon("usage_mode")],
 ["errorTitle",this._diagIcon("error")],
 ["calibrationTitle",this._diagIcon("needs_calibration")],
 ["lowTitle",this._diagIcon("low_gas")]
 ].map(([label,value])=>`<div class="diag"><span class="small">${t(label)}</span>${value}</div>`).join("")}</div>
 <div class="pending-actions" aria-label="${t("plannedActions")}">
   <button type="button" class="pending-btn" disabled title="${t("comingLater")}"><ha-icon icon="mdi:scale-balance"></ha-icon>${t("recalibrateScale")}</button>
   <button type="button" class="pending-btn" disabled title="${t("comingLater")}"><ha-icon icon="mdi:cog-outline"></ha-icon>${t("settingsOnly")}</button>
   <span class="planned-hint">${t("comingLater")}</span>
 </div></div>`:""}
 </section>`:""}`}
 ${this._config.show_history||this._config.show_diagnostics?`<footer><span>Senso4s Basic · ${VERSION}</span><span>${t("readOnly")}</span></footer>`:""}
</ha-card>`;
    this.shadowRoot.querySelector('[data-toggle="history"]')?.addEventListener("click",()=>{this._historyOpen=!this._historyOpen;this._schedule();if(this._historyOpen&&!this._loaded)this._loadHistory();});
    this.shadowRoot.querySelector('[data-toggle="diag"]')?.addEventListener("click",()=>{this._diagOpen=!this._diagOpen;this._schedule();});
    this.shadowRoot.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>{this._view=btn.dataset.view;this._schedule();}));
    this.shadowRoot.querySelector("[data-refresh]")?.addEventListener("click",()=>{this._loaded=false;this._loadHistory();});
  }
}
if(!customElements.get(TAG))customElements.define(TAG,Senso4sBasicCard);
window.customCards=window.customCards||[];
if(!window.customCards.some(card=>card.type===TAG))window.customCards.push({type:TAG,name:"Senso4s Basic",description:"Standalone gas cylinder scale card for Home Assistant",preview:false});
console.info("[Senso4s Basic] "+VERSION);
})();
