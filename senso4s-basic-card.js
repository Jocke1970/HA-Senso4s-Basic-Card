/* Senso4s Basic / Plus Lovelace Card v0.1.5b1. MIT license. Read-only. */
(()=>{
"use strict";
const TAG="senso4s-basic-card", VERSION="0.1.5b1";
// Source: the user-supplied SENSO original artwork; clean white tile, no AI-generated shadows.
// Embedded data URI keeps the single-file /local/senso4s-basic-card.js installation working.
const BRAND_ICON="data:image/png;base64,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";
const L={"sv":{"sub":"Bluetooth-våg för gasolflaska","weight":"Gasol kvar","estimatedEmpty":"Beräknat tom","level":"Gasolnivå","battery":"Batteri","signal":"Bluetooth-signal","seen":"Senast behandlad BLE-data","changed":"Senast ändrad vikt i HA","notice":"Senaste BLE-kontakt är inte samma sak som en ny fysisk vägning. Tid för viktändring är Home Assistants tidsstämpel.","history":"Historik","diagnostics":"Diagnostik","recent":"Senaste ändringar","reload":"Uppdatera","noScale":"Ingen Senso4s-våg hittades","multi":"Flera Senso4s-vågar hittades. Välj en gas_remaining-entitet i kortets konfiguration.","missing":"Sensordata saknas","fresh":"BLE-data mottagen","stale":"Gammal BLE-data","noTime":"BLE-tidsstämpel saknas","error":"Vågen rapporterar fel","calibration":"Kalibrering behövs","low":"Låg gasolnivå","mode":"Användningsläge","modeHeating":"Uppvärmning","modeBBQ":"Grillning","modeCamping":"Camping","modeCaravanning":"Husvagn","modeHousehold":"Hushåll","unknownMode":"Okänt användningsläge","calibrationTitle":"Behöver kalibrering","errorTitle":"Felstatus","lowTitle":"Låg gasol","yes":"Ja","no":"Nej","unavailable":"Ej tillgängligt","loading":"Hämtar historik…","empty":"Ingen historik med värdeförändringar","range":"Historikperiod","recorder":"Historiken hämtas från Home Assistant Recorder. Kortet är endast läsande.","readOnly":"Endast läsning","refillTank":"Fyll på flaskan","recalibrateScale":"Kalibrera vågen","settingsOnly":"Endast inställningar","comingLater":"Kommer senare","plannedActions":"Planerade funktioner","hours":"timmar","min":"min","hour":"tim","days":"dygn","ago":"sedan","now":"nyss","timeMissing":"Tid saknas","unit":"kg","editorTitle":"Rubrik","editorEntity":"Senso4s-våg","editorSize":"Kortstorlek","editorMini":"Mini","editorStandard":"Standard","editorAuto":"Automatiskt val","editorLanguage":"Språk","editorHistoryHours":"Historik (timmar)","editorSections":"Visa sektioner","editorMiniHint":"Miniläget visar endast flaskikon, vikt och färgade batteri-/Bluetooth-ikoner.","editorNoDevices":"Inga vågar hittades ännu – automatisk identifiering är möjlig.","editorActions":"Visa snabbknappar","editorActionsHint":"Refill och kalibrering är platshållare utan funktion tills vidare.","subPlus":"Bluetooth-våg för gasolflaska · Plus","plusDiagnostics":"Plus-diagnostik","plusWarning":"Plus-enheten rapporterar en avvikelse","anomalyTitle":"Samlad avvikelse","temperatureAnomaly":"Temperaturavvikelse","inclineAnomaly":"Lutningsavvikelse","motionAnomaly":"Rörelseavvikelse","plusDisabledHint":"Plus-enheten stöder dessa funktioner, men en eller flera anomalisensorer är avaktiverade eller saknar värde i Home Assistant. Aktivera dem under enhetens entiteter för att se deras status.","plusUnknown":"Ej aktiverad / saknar värde","demoLabel":"DEMO – fiktiv enhet, inga verkliga mätvärden","editorDemo":"Testenhet (endast förhandsvisning)","editorDemoOff":"Av – riktig Senso4s","editorDemoBasic":"Simulerad Basic","editorDemoPlus":"Simulerad Plus (normal)","editorDemoWarn":"Simulerad Plus (lutningsvarning)","editorDemoDisabled":"Simulerad Plus (extrasensorer avstängda)","editorDemoHint":"Endast syntetiska kortvärden. Skapar inga enheter och skickar inga kommandon till Home Assistant.","plusWarningStatus":"Avvikelse"},"en":{"sub":"Bluetooth gas cylinder scale","weight":"Gas remaining","estimatedEmpty":"Estimated empty","level":"Gas level","battery":"Battery","signal":"Bluetooth signal","seen":"Last processed BLE data","changed":"Last weight change in HA","notice":"The most recent BLE contact does not imply a new physical weighing. Weight-change timestamps come from Home Assistant.","history":"History","diagnostics":"Diagnostics","recent":"Recent changes","reload":"Refresh","noScale":"No Senso4s scale found","multi":"Multiple Senso4s scales found. Select a gas_remaining entity in the card configuration.","missing":"Sensor data unavailable","fresh":"BLE data received","stale":"Stale BLE data","noTime":"No BLE timestamp","error":"Scale reports an error","calibration":"Calibration needed","low":"Low gas","mode":"Usage mode","modeHeating":"Heating","modeBBQ":"BBQ","modeCamping":"Camping","modeCaravanning":"Caravanning","modeHousehold":"Household","unknownMode":"Unknown usage mode","calibrationTitle":"Needs calibration","errorTitle":"Error status","lowTitle":"Low gas","yes":"Yes","no":"No","unavailable":"Unavailable","loading":"Loading history…","empty":"No recorded changes","range":"History period","recorder":"History comes from Home Assistant Recorder. This card is read-only.","readOnly":"Read only","refillTank":"Refill tank","recalibrateScale":"Recalibrate Scale","settingsOnly":"Settings Only","comingLater":"Coming later","plannedActions":"Planned features","hours":"hours","min":"min","hour":"hr","days":"days","ago":"ago","now":"just now","timeMissing":"No timestamp","unit":"kg","editorTitle":"Title","editorEntity":"Senso4s scale","editorSize":"Card size","editorMini":"Mini","editorStandard":"Standard","editorAuto":"Auto-detect","editorLanguage":"Language","editorHistoryHours":"History (hours)","editorSections":"Display sections","editorMiniHint":"Mini shows only the cylinder icon, weight, and colored battery/Bluetooth icons.","editorNoDevices":"No scales detected yet – automatic selection is available.","editorActions":"Show quick actions","editorActionsHint":"Refill and calibration are disabled placeholders for now.","subPlus":"Bluetooth gas cylinder scale · Plus","plusDiagnostics":"Plus diagnostics","plusWarning":"The Plus scale reports an anomaly","anomalyTitle":"Overall anomaly","temperatureAnomaly":"Temperature anomaly","inclineAnomaly":"Tilt anomaly","motionAnomaly":"Movement anomaly","plusDisabledHint":"This device supports Plus features, but one or more anomaly entities are disabled or unavailable in Home Assistant. Enable them in the device's entity settings to display their status.","plusUnknown":"Disabled / no value","demoLabel":"DEMO – synthetic device, not real measurements","editorDemo":"Test device (preview only)","editorDemoOff":"Off – real Senso4s","editorDemoBasic":"Simulated Basic","editorDemoPlus":"Simulated Plus (normal)","editorDemoWarn":"Simulated Plus (tilt warning)","editorDemoDisabled":"Simulated Plus (extra entities disabled)","editorDemoHint":"Synthetic card data only. Does not create entities or send Home Assistant commands.","plusWarningStatus":"Anomaly"}};
const CSS="\n.mini-card{padding:0}\n.mini-shell{display:grid;grid-template-columns:40px minmax(0,1fr) auto;gap:10px;align-items:center;min-height:56px;padding:8px 11px}\n.mini-shell.with-actions{grid-template-columns:40px minmax(0,1fr) auto auto}\n.mini-actions{display:flex;align-items:center;gap:5px;flex-shrink:0}\n.mini-action{display:inline-flex;align-items:center;justify-content:center;width:27px;height:28px;border-radius:8px;border:1px solid var(--divider-color);background:var(--secondary-background-color,rgba(130,130,130,.08));color:var(--secondary-text-color);padding:0}\n.mini-action ha-icon{--mdc-icon-size:18px}\n.mini-action.warn{color:var(--warning-color,#f4ad38)}\n.mini-action:disabled{opacity:.72;cursor:not-allowed}\n.mini-cylinder{width:40px;height:40px;display:grid;place-items:center;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(0,0,0,.12));overflow:hidden}\n.mini-cylinder img{width:100%;height:100%;display:block;object-fit:contain}\n.mini-weight{font-size:18px;font-weight:750;letter-spacing:-.3px;white-space:nowrap;font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis}\n.mini-signals{display:flex;align-items:center;gap:8px;flex-shrink:0}\n.mini-weight-wrap{display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden}\n.mini-plus{flex:0 0 auto;display:inline-flex;align-items:center;font-size:9px;font-weight:800;letter-spacing:.3px;border:1px solid var(--divider-color);border-radius:7px;padding:4px 5px;color:var(--secondary-text-color);white-space:nowrap}\n.mini-plus.warn{color:var(--error-color,#ee6262);border-color:var(--error-color,#ee6262)}\n.demo-note{font-size:10px;padding:7px 10px;background:var(--secondary-background-color,rgba(130,130,130,.08));border:1px dashed var(--warning-color,#f4ad38);border-radius:8px;color:var(--warning-color,#f4ad38);font-weight:700;margin:6px 0 10px}\n.mini-card .demo-note{margin:0 8px 7px;padding:4px 7px}\n.plus-heading{font-size:13px;font-weight:750;margin:14px 0 9px}\n.plus-hint{font-size:11px;line-height:1.5;color:var(--secondary-text-color);margin-top:10px}\n.mini-status{display:inline-flex;align-items:center;justify-content:center;color:var(--secondary-text-color)}\n.mini-status ha-icon{--mdc-icon-size:20px}\n.mini-status.good{color:var(--success-color,#27b981)}\n.mini-status.warn{color:var(--warning-color,#f4ad38)}\n.mini-status.bad{color:var(--error-color,#ee6262)}\n.mini-status.neutral{color:var(--secondary-text-color)}\n@media(max-width:260px){.mini-shell{grid-template-columns:34px minmax(0,1fr) auto;gap:6px;padding:8px}.mini-shell.with-actions{grid-template-columns:34px minmax(0,1fr) auto auto}.mini-cylinder{width:34px;height:34px}.mini-weight{font-size:15px}.mini-signals{gap:5px}.mini-status ha-icon{--mdc-icon-size:17px}.mini-actions{gap:3px}.mini-action{width:23px;height:24px}.mini-action ha-icon{--mdc-icon-size:16px}}\n:host{display:block;color:var(--primary-text-color);font-family:var(--primary-font-family,Roboto,sans-serif)}\n*{box-sizing:border-box}ha-card{padding:18px;overflow:hidden;background:var(--ha-card-background,var(--card-background-color))}\n.top{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:18px}\n.brand{display:flex;align-items:center;gap:10px}.logo{display:grid;place-items:center;width:43px;height:43px;border-radius:13px;background:#fff;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(0,0,0,.12));overflow:hidden}\n.logo img{width:100%;height:100%;display:block;object-fit:contain}h2{margin:0;font-size:18px;font-weight:750;letter-spacing:-.3px}\n.muted,.small{font-size:11px;color:var(--secondary-text-color);line-height:1.5}.status{font-size:11px;border:1px solid var(--divider-color);border-radius:16px;padding:6px 9px;white-space:nowrap;display:flex;gap:7px;align-items:center}\n.status:before{content:\"\";height:8px;width:8px;border-radius:50%;background:var(--success-color,#2ed39c)}\n.status.warn:before{background:var(--warning-color,#ffac35)}.status.bad:before{background:var(--error-color,#ef6363)}\n.hero{display:grid;grid-template-columns:120px minmax(0,1fr);gap:15px;align-items:center;padding:2px 0 17px} .hero-details{min-width:0}\n.bottle{width:104px;height:161px;margin:auto;display:flex;flex-direction:column;align-items:center}\n.handle{width:54px;height:20px;border:6px solid var(--primary-text-color);opacity:.92;border-bottom:0;border-radius:12px 12px 0 0}\n.neck{height:8px;width:82px;border:5px solid var(--primary-text-color);border-bottom:0;opacity:.92}\n.body{position:relative;width:103px;height:132px;border:6px solid var(--primary-text-color);border-radius:18px 18px 12px 12px;overflow:hidden;background:rgba(55,141,213,.09)}\n.fill{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(150deg,#39bdff,#0876de);transition:height .35s}\n.overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;text-shadow:0 1px 3px #18314a;font-weight:800}\n.overlay strong{font-size:23px}.overlay ha-icon{--mdc-icon-size:30px}\n.big{font-weight:800;font-size:37px;letter-spacing:-1px;margin:5px 0;line-height:1.2}\n.label{font-size:12px;font-weight:650;color:var(--secondary-text-color)}\n.estimate{display:flex;align-items:center;gap:7px;margin-top:10px;color:var(--secondary-text-color);font-size:12px;line-height:1.35}\n.estimate ha-icon{--mdc-icon-size:18px;flex:0 0 auto;color:var(--secondary-text-color)}\n.estimate strong{color:var(--primary-text-color);font-weight:700;font-size:13px}\n.hero-meta{display:flex;align-items:center;flex-wrap:wrap;gap:7px 14px;margin-top:10px}\n.hero-meta-item{display:inline-flex;align-items:center;gap:5px;color:var(--secondary-text-color);font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}\n.hero-meta-item ha-icon{--mdc-icon-size:18px;color:var(--secondary-text-color)}\n.hero-meta-item.good ha-icon{color:var(--success-color,#27b981)}\n.hero-meta-item.warn ha-icon{color:var(--warning-color,#f4ad38)}\n.hero-meta-item.bad ha-icon{color:var(--error-color,#ee6262)}\n.hero-meta-item strong{font-size:13px;font-weight:700;color:var(--primary-text-color)}\n.times{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 12px}\n.time{border:1px solid var(--divider-color);border-radius:12px;padding:11px;min-width:0}\n.time strong{display:block;margin:7px 0 4px;font-size:13px;overflow-wrap:anywhere}\n.hint{display:flex;gap:8px;padding:0 0 12px;color:var(--secondary-text-color);font-size:11px;line-height:1.5}\n.hint ha-icon{--mdc-icon-size:17px;flex-shrink:0;color:var(--info-color,#40a7ea)}\n.alert{font-size:12px;border-left:3px solid var(--warning-color,#ffac35);background:var(--secondary-background-color,rgba(130,130,130,.08));padding:10px;border-radius:7px;margin:9px 0}\n.section{border-top:1px solid var(--divider-color)}button{cursor:pointer;color:inherit;font:inherit}\n.toggle{border:0;background:none;text-align:left;display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 0;font-size:14px;font-weight:700}\n.toggle ha-icon{--mdc-icon-size:20px}.panel{padding-bottom:15px}.diag-panel{padding-top:2px}\n.tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}.tab,.reload{border:1px solid var(--divider-color);border-radius:9px;background:transparent;padding:7px 10px;font-size:12px}\n.tab[aria-pressed=\"true\"]{border-color:var(--primary-color,#168be1);color:var(--primary-color,#168be1)}\n.reload{margin-left:auto}.chart{width:100%;height:125px;display:block}\n.range{display:flex;justify-content:space-between;color:var(--secondary-text-color);font-size:11px;margin-bottom:9px}\n.events{max-height:260px;overflow-y:auto}.event{display:flex;justify-content:space-between;gap:10px;align-items:center;border-top:1px solid var(--divider-color);padding:9px 0;font-size:12px}\n.event time{white-space:nowrap;font-size:11px;color:var(--secondary-text-color)}\n.pending-actions{display:flex;flex-wrap:wrap;gap:8px;padding:11px 0}\n.pending-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color,rgba(130,130,130,.07));padding:10px 12px;font-size:12px;font-weight:650;min-height:39px}\n.pending-btn ha-icon{--mdc-icon-size:18px}\n.pending-btn:disabled{opacity:.7;cursor:not-allowed}\n.refill-action{margin:0 0 7px}\n.refill-action .pending-btn{border-color:var(--warning-color,#f4ad38)}\n.planned-hint{width:100%;font-size:11px;color:var(--secondary-text-color);line-height:1.4;margin-top:1px}\n.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n.diag{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;min-height:104px;padding:12px;border:1px solid var(--divider-color);border-radius:11px;text-align:center}\n.diag .small{display:flex;align-items:center;justify-content:center;width:100%;min-height:32px;line-height:1.35;font-size:13px;font-weight:700;text-align:center}\n.diag-visual{display:inline-flex;align-items:center;justify-content:center;margin-top:8px;padding:3px;border-radius:8px}\n.diag-visual ha-icon{--mdc-icon-size:29px}\n.diag-visual.good{color:var(--success-color,#27b981)}\n.diag-visual.warn{color:var(--warning-color,#f4ad38)}\n.diag-visual.bad{color:var(--error-color,#ee6262)}\n.diag-visual.info{color:var(--info-color,#239ce5)}\n.diag-visual.neutral{color:var(--secondary-text-color)}\n.empty{padding:15px;color:var(--secondary-text-color);font-size:12px}footer{display:flex;justify-content:space-between;color:var(--secondary-text-color);font-size:10px;border-top:1px solid var(--divider-color);padding-top:10px;margin-top:8px}\n@media(max-width:410px){ha-card{padding:13px}.top{align-items:flex-start}.status{font-size:10px}.hero{grid-template-columns:100px minmax(0,1fr);gap:8px}.bottle{transform:scale(.88);transform-origin:center}.big{font-size:30px}.hero-meta{gap:7px 12px}.hero-meta-item{font-size:11px}.time{padding:9px}}\n";

class Senso4sBasicCardEditor extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this._config={};
    this._hass=null;
    this._rendered=false;
    this._candidateKey="";
    this.shadowRoot.addEventListener("change",ev=>this._handleChange(ev));
    this.shadowRoot.addEventListener("input",ev=>{
      if(ev.target?.dataset?.field==="title")this._handleChange(ev);
    });
  }
  setConfig(config){
    if(!config||typeof config!=="object")return;
    const previousLanguage=this._config.language;
    this._config={...config};
    if(!this._rendered || previousLanguage!==this._config.language)this._render();
    else this._syncFields();
  }
  set hass(hass){
    const previousLang=this._locale();
    this._hass=hass;
    const nextLang=this._locale();
    const candidates=this._devices();
    const key=JSON.stringify(candidates.map(x=>[x.id,x.name]));
    if(!this._rendered||this._candidateKey!==key||previousLang!==nextLang){
      this._candidateKey=key;
      this._render();
    }
  }
  get hass(){return this._hass;}
  _locale(){
    const language=this._config.language;
    if(language==="sv"||language==="en")return language;
    return String(this._hass?.language||"en").toLowerCase().startsWith("sv")?"sv":"en";
  }
  _t(key){return L[this._locale()][key]||key;}
  _escape(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");}
  _devices(){
    return Object.keys(this._hass?.states||{})
      .filter(id=>/^sensor\.senso4s_.+_gas_remaining$/.test(id))
      .sort()
      .map(id=>({id,name:String(this._hass.states[id].attributes?.friendly_name||id)}));
  }
  _syncFields(){
    if(!this._rendered)return;
    this.shadowRoot.querySelectorAll("[data-field]").forEach(el=>{
      const field=el.dataset.field;
      if(field==="title" && this.shadowRoot.activeElement===el)return;
      if(el.type==="checkbox")el.checked=field==="show_actions"?this._actionsVisible():this._config[field]!==false;
      else if(field==="history_hours")el.value=String(this._config[field]??168);
      else if(field==="size")el.value=this._config.size||"standard";
      else if(field==="language")el.value=this._config.language||"auto";
       else if(field==="demo_mode")el.value=this._config.demo_mode||"off";
      else el.value=String(this._config[field]??"");
    });
    this._syncVisibility();
  }
  _actionsVisible(){
    return this._config.show_actions===undefined
      ? (this._config.size||"standard")!=="mini"
      : this._config.show_actions;
  }
  _syncVisibility(){
    const actionCheckbox=this.shadowRoot.querySelector('[data-field="show_actions"]');
    if(actionCheckbox)actionCheckbox.checked=this._actionsVisible();
    const mini=(this._config.size||"standard")==="mini";
    const history=this._config.show_history!==false;
    const standard=this.shadowRoot.querySelector("[data-standard-options]");
    const miniText=this.shadowRoot.querySelector("[data-mini-hint]");
    const hours=this.shadowRoot.querySelector("[data-history-hours]");
    const realPicker=this.shadowRoot.querySelector("[data-real-entity]");
    if(realPicker)realPicker.hidden=(this._config.demo_mode||"off")!=="off";
    if(standard)standard.hidden=mini;
    if(miniText)miniText.hidden=!mini;
    if(hours)hours.hidden=mini||!history;
  }
  _handleChange(ev){
    const el=ev.target,field=el?.dataset?.field;
    if(!field||!["title","entity","size","language","show_history","show_diagnostics","history_hours","show_actions","demo_mode"].includes(field))return;
    let value=el.type==="checkbox"?Boolean(el.checked):el.value;
    if(field==="history_hours"){
      const n=Number(value);
      if(!Number.isFinite(n))return;
      value=Math.max(1,Math.min(720,Math.round(n)));
    }
    if(field==="size"&&!["mini","standard"].includes(value))return;
    if(field==="language"&&!["auto","sv","en"].includes(value))return;
    if(field==="demo_mode"&&!["off","basic","plus","plus_warning","plus_disabled"].includes(value))return;
    const old=this._config[field];
    if(value===old || old===undefined && (
      value==="" && ["entity","title"].includes(field) ||
      value===true && ["show_history","show_diagnostics"].includes(field) ||
      value==="standard" && field==="size" ||
      value==="auto" && field==="language" ||
      value===168 && field==="history_hours"
    ))return;
    const next={...this._config};
    if((field==="entity"||field==="title") && value==="")delete next[field];
    else next[field]=value;
    this._config=next;
    this._syncVisibility();
    this.dispatchEvent(new CustomEvent("config-changed",{
      detail:{config:{...next}},bubbles:true,composed:true
    }));
    if(field==="language")this._render();
  }
  _render(){
    const t=key=>this._escape(this._t(key));
    const devices=this._devices();
    const selected=String(this._config.entity||"");
    const options=[{id:"",name:this._t("editorAuto")},...devices];
    if(selected&&!options.some(item=>item.id===selected))options.push({id:selected,name:selected});
    const select=items=>items.map(item=>`<option value="${this._escape(item.id)}">${this._escape(item.name)}</option>`).join("");
    this.shadowRoot.innerHTML=`
<style>
:host{display:block;color:var(--primary-text-color);font-family:var(--primary-font-family,Roboto,sans-serif)}
*{box-sizing:border-box}.editor{display:grid;gap:13px;padding:3px 0 9px}
.field{display:flex;flex-direction:column;gap:6px}.field label,.legend{font-size:13px;font-weight:650;color:var(--primary-text-color)}
.field input,.field select{width:100%;min-width:0;min-height:40px;border:1px solid var(--divider-color);border-radius:9px;padding:8px 10px;font:inherit;font-size:14px;color:var(--primary-text-color);background:var(--card-background-color,var(--ha-card-background,#fff));outline-color:var(--primary-color)}
.field input:focus-visible,.field select:focus-visible{outline:2px solid var(--primary-color)}
.options{display:grid;gap:10px;border-top:1px solid var(--divider-color);padding-top:12px}
.check{display:flex;align-items:center;gap:10px;font-size:13px;cursor:pointer}.check input{width:18px;height:18px;accent-color:var(--primary-color)}
.hint{font-size:12px;line-height:1.5;color:var(--secondary-text-color);margin:0}
[hidden]{display:none!important}
</style>
<div class="editor">
 <div class="field"><label for="sc-title">${t("editorTitle")}</label><input id="sc-title" data-field="title" type="text" autocomplete="off" placeholder="Senso4s Basic"></div>
 <div class="field" data-real-entity><label for="sc-entity">${t("editorEntity")}</label><select id="sc-entity" data-field="entity">${select(options)}</select>${devices.length?"":`<p class="hint">${t("editorNoDevices")}</p>`}</div>
 <div class="field"><label for="sc-size">${t("editorSize")}</label><select id="sc-size" data-field="size">${select([{id:"standard",name:this._t("editorStandard")},{id:"mini",name:this._t("editorMini")}])}</select></div>
 <div class="field"><label for="sc-language">${t("editorLanguage")}</label><select id="sc-language" data-field="language">${select([{id:"auto",name:this._t("editorAuto")},{id:"sv",name:"Svenska"},{id:"en",name:"English"}])}</select></div>
  <div class="field"><label for="sc-demo">${t("editorDemo")}</label><select id="sc-demo" data-field="demo_mode">${select([{id:"off",name:this._t("editorDemoOff")},{id:"basic",name:this._t("editorDemoBasic")},{id:"plus",name:this._t("editorDemoPlus")},{id:"plus_warning",name:this._t("editorDemoWarn")},{id:"plus_disabled",name:this._t("editorDemoDisabled")}])}</select><p class="hint">${t("editorDemoHint")}</p></div>
 <div class="options" data-action-options>
   <label class="check"><input type="checkbox" data-field="show_actions">${t("editorActions")}</label>
   <p class="hint">${t("editorActionsHint")}</p>
 </div>
 <div class="options" data-standard-options>
   <span class="legend">${t("editorSections")}</span>
   <label class="check"><input type="checkbox" data-field="show_history">${t("history")}</label>
   <label class="check"><input type="checkbox" data-field="show_diagnostics">${t("diagnostics")}</label>
   <div class="field" data-history-hours><label for="sc-hours">${t("editorHistoryHours")}</label><input id="sc-hours" data-field="history_hours" type="number" min="1" max="720" step="1"></div>
 </div>
 <p class="hint" data-mini-hint hidden>${t("editorMiniHint")}</p>
</div>`;
    this._rendered=true;
    this._syncFields();
  }
}

class Senso4sBasicCard extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this._config={title:"",entity:"",language:"auto",history_hours:168,show_history:true,show_diagnostics:true,size:"standard",demo_mode:"off"};
    this._historyOpen=false;this._diagOpen=false;this._view="gas_remaining";
    this._history=[];this._loaded=false;this._loading=false;this._error="";
    this._generation=0;this._scheduled=false;this._demoCache=null;this._demoCacheMode=null;
  }
  static getStubConfig(){return {};}
  static getConfigElement(){return document.createElement("senso4s-basic-card-editor");}
  getCardSize(){return this._config.size==="mini"?1:this._config.show_history||this._config.show_diagnostics?6:4;}
  getGridOptions(){return {columns:12,rows:"auto"};}
  setConfig(config){
    if(!config||typeof config!=="object")throw new Error("Configuration is required");
    const previous=JSON.stringify(this._config);
    this._config={title:"",entity:"",language:"auto",history_hours:168,show_history:true,show_diagnostics:true,size:"standard",demo_mode:"off",...config};
    if(!["mini","standard"].includes(this._config.size)) throw new Error("size must be mini or standard");
    if(!["off","basic","plus","plus_warning","plus_disabled"].includes(this._config.demo_mode))throw new Error("invalid demo_mode");
    if(typeof this._config.show_history!=="boolean"||typeof this._config.show_diagnostics!=="boolean") throw new Error("show_history and show_diagnostics must be boolean values (true/false)");
    if(this._config.show_actions!==undefined&&typeof this._config.show_actions!=="boolean")throw new Error("show_actions must be a boolean value (true/false)");
    this._config.history_hours=Math.max(1,Math.min(720,Number(this._config.history_hours)||168));
    if(!["auto","sv","en"].includes(this._config.language))this._config.language="auto";
    if(JSON.stringify(this._config)!==previous){this._loaded=false;this._loading=false;this._history=[];this._generation++;this._demoCache=null;this._demoCacheMode=null;}
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
  // Developer preview: all synthetic data lives inside this card, never in HA.
  _isDemo(){return this._config.demo_mode!=="off";}
  _states(){
    if(!this._isDemo())return this._hass?.states||{};
    const mode=this._config.demo_mode;
    if(this._demoCacheMode===mode&&this._demoCache)return this._demoCache;
    const plus=mode!=="basic",prefix="senso4s_demo_"+(plus?"plus":"basic");
    const now=new Date(),seen=now.toISOString(),changed=new Date(now.getTime()-18*60000).toISOString();
    const empty=new Date(now.getTime()+38*86400000).toISOString(),states={};
    const add=(kind,key,value,attributes={})=>{
      const id=kind+"."+prefix+"_"+key;
      states[id]={entity_id:id,state:String(value),attributes,last_changed:changed,last_updated:seen};
    };
    add("sensor","gas_remaining",6.8);add("sensor","gas_level",68);
    add("sensor","battery",84,{last_seen:seen});add("sensor","signal_strength",-59);
    add("sensor","usage_mode",plus?"Caravanning":"Heating",{is_plus_model:plus});
    add("sensor","estimated_empty",empty);add("sensor","gas_capacity",10);
    for(const key of ["error","needs_calibration","low_gas"])add("binary_sensor",key,"off");
    if(plus&&mode!=="plus_disabled"){
      const warning=mode==="plus_warning";
      for(const key of ["has_anomaly","temperature_anomaly","incline_anomaly","motion_anomaly"])
        add("binary_sensor",key,warning&&["has_anomaly","incline_anomaly"].includes(key)?"on":"off");
    }
    this._demoCacheMode=mode;this._demoCache=states;return states;
  }
  _candidates(){return Object.keys(this._states()).filter(id=>/^sensor\.senso4s_.+_gas_remaining$/.test(id)).sort();}
  _prefix(){
    if(this._isDemo())return "senso4s_demo_"+(this._config.demo_mode==="basic"?"basic":"plus");
    const selected=String(this._config.entity||"").trim();
    if(selected){const n=selected.replace(/^sensor\./,"").replace(/_(gas_remaining|gas_level|battery)$/,"");return /^senso4s_.+/.test(n)?n:null;}
    const list=this._candidates();return list.length===1?list[0].slice(7,-"_gas_remaining".length):null;
  }
  _id(key){
    const p=this._prefix();if(!p)return null;
    const ids=key==="rssi"?[`sensor.${p}_signal_strength`,`sensor.${p}_rssi`]
      :key==="error"?[`binary_sensor.${p}_error`,`binary_sensor.${p}_has_error`]
      :["needs_calibration","low_gas","has_anomaly","temperature_anomaly","incline_anomaly","motion_anomaly"].includes(key)?[`binary_sensor.${p}_${key}`]
      :[`sensor.${p}_${key}`];
    return ids.find(id=>this._states()[id])||ids[0];
  }
  _state(key){const id=this._id(key);return id?this._states()[id]||null:null;}
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
  _model(){
    if(this._isDemo())return this._config.demo_mode==="basic"?"basic":"plus";
    const usage=this._state("usage_mode")?.attributes?.is_plus_model;
    if(typeof usage==="boolean")return usage?"plus":"basic";
    const entities=this._hass?.entities||{},devices=this._hass?.devices||{};
    const weightId=this._id("gas_remaining"),modeId=this._id("usage_mode");
    const deviceId=entities[weightId]?.device_id||entities[modeId]?.device_id;
    const model=String(devices[deviceId]?.model||"").trim();
    if(/senso4s\s*plus/i.test(model))return "plus";
    if(/senso4s\s*basic/i.test(model))return "basic";
    if(["has_anomaly","temperature_anomaly","incline_anomaly","motion_anomaly"].some(k=>this._state(k)))return "plus";
    return "unknown";
  }
  _title(){return this._config.title||(this._model()==="plus"?"Senso4s Plus":"Senso4s Basic");}
  _plusAlert(){return this._model()==="plus"&&["has_anomaly","temperature_anomaly","incline_anomaly","motion_anomaly"].some(k=>this._val(k)==="on");}
  _plusIcon(key){
    const icons={has_anomaly:"mdi:alert-decagram",temperature_anomaly:"mdi:thermometer-alert",incline_anomaly:"mdi:angle-acute",motion_anomaly:"mdi:motion-sensor"};
    const state=this._val(key),known=state==="on"||state==="off";
    const icon=!known?"mdi:help-circle-outline":state==="on"?icons[key]:"mdi:check-circle";
    const tone=!known?"neutral":state==="on"?"bad":"good";
    const description=!known?this._t("plusUnknown"):state==="on"?this._t("yes"):this._t("no");
    return '<span class="diag-visual '+tone+'" role="img" aria-label="'+this._esc(description)+'" title="'+this._esc(description)+'"><ha-icon icon="'+icon+'"></ha-icon></span>';
  }
  _plusDiagnostics(){
    const t=k=>this._esc(this._t(k));
    const data=[["anomalyTitle","has_anomaly"],["temperatureAnomaly","temperature_anomaly"],["inclineAnomaly","incline_anomaly"],["motionAnomaly","motion_anomaly"]];
    const cells=data.map(([label,key])=>'<div class="diag"><span class="small">'+t(label)+'</span>'+this._plusIcon(key)+'</div>').join("");
    const missing=data.some(([,key])=>!["on","off"].includes(this._val(key)));
    return '<div class="plus-heading">'+t("plusDiagnostics")+'</div><div class="grid">'+cells+'</div>'
      +(missing?'<div class="plus-hint">'+t("plusDisabledHint")+'</div>':"");
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
    if(!this._config.show_history||this._loading||this._loaded)return;
    if(this._isDemo()){
      const now=Date.now(),start=now-this._config.history_hours*3600000;
      const metrics=[["gas_remaining",6.8,.9],["battery",84,5],["rssi",-59,8]];
      this._history=metrics.map(([key,value,range])=>{
        const id=this._id(key);
        return Array.from({length:9},(_,i)=>({
          entity_id:id,
          state:String(key==="gas_remaining"?(value+range*(1-i/8)).toFixed(1):Math.round(value+range*(1-i/8))),
          last_changed:new Date(start+(now-start)*i/8).toISOString()
        }));
      });
      this._loaded=true;this._error="";this._schedule();return;
    }
    if(!this._hass?.callApi)return;
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
  // A self-contained Mushroom-style view: no section toggles or numerical battery/RSSI values.
  // The same thresholds used by standard mode drive the colored icons.
  _batterySeverity(){
    const battery=this._number("battery");
    return battery===null?"neutral":battery<10?"bad":battery<20?"warn":"good";
  }
  _signalSeverity(){
    const rssi=this._number("rssi");
    return rssi===null?"neutral":rssi<-85?"bad":rssi<-70?"warn":"good";
  }
  // An omitted flag preserves the established Standard layout (buttons shown)
  // and the existing Mini layout (no buttons). Explicit true/false overrides it.
  _actionsVisible(){
    return this._config.show_actions===undefined
      ? this._config.size!=="mini"
      : this._config.show_actions;
  }
  _renderMini(){
    const title=this._esc(this._title());
    const plus=this._model()==="plus",anomaly=this._plusAlert();
    const battery=this._batterySeverity(),signal=this._signalSeverity();
    const batteryIcon=battery==="neutral"?"mdi:battery-unknown":"mdi:battery";
    const btIcon=signal==="neutral"?"mdi:bluetooth-off":"mdi:bluetooth";
    const actions=this._actionsVisible();
    const level=this._number("gas_level");
    const needsCalibration=this._val("needs_calibration")==="on";
    const t=key=>this._esc(this._t(key));
    this.shadowRoot.innerHTML=`
<style>${CSS}</style>
<ha-card class="mini-card" aria-label="${title}">
  <div class="mini-shell${actions?" with-actions":""}">
    <div class="mini-cylinder"><img src="${BRAND_ICON}" alt="Senso4s" loading="eager" decoding="async"></div>
    <div class="mini-weight-wrap"><div class="mini-weight" aria-label="${this._esc(this._t("weight"))}: ${this._display("gas_remaining",2,"kg")}">${this._display("gas_remaining",2,"kg")}</div>
    ${plus?`<span class="mini-plus ${anomaly?"warn":""}" title="${anomaly?t("plusWarning"):"Plus"}">${anomaly?"PLUS !":"PLUS"}</span>`:""}</div>
    ${actions?`<div class="mini-actions" aria-label="${t("plannedActions")}">
      ${level!==null&&level<10?`<button type="button" class="mini-action warn" disabled aria-label="${t("refillTank")} – ${t("comingLater")}" title="${t("refillTank")} – ${t("comingLater")}"><ha-icon icon="mdi:plus-circle-outline"></ha-icon></button>`:""}
      <button type="button" class="mini-action ${needsCalibration?"warn":""}" disabled aria-label="${t("recalibrateScale")} – ${t("comingLater")}" title="${t("recalibrateScale")} – ${t("comingLater")}"><ha-icon icon="mdi:scale-balance"></ha-icon></button>
    </div>`:""}
    <div class="mini-signals">
      <span class="mini-status ${battery}" role="img" aria-label="${this._esc(this._t("battery"))}" title="${this._esc(this._t("battery"))}"><ha-icon icon="${batteryIcon}"></ha-icon></span>
      <span class="mini-status ${signal}" role="img" aria-label="${this._esc(this._t("signal"))}" title="${this._esc(this._t("signal"))}"><ha-icon icon="${btIcon}"></ha-icon></span>
    </div>
  </div>
  ${this._isDemo()?`<div class="demo-note">${t("demoLabel")}</div>`:""}
</ha-card>`;
  }
  _render(){
    if(!this._hass)return;
    if(this._config.size==="mini"){this._renderMini();return;}
    const t=k=>this._esc(this._t(k));
    const list=this._candidates(),p=this._prefix(),weight=this._state("gas_remaining");
    const model=this._model(),plus=model==="plus",plusAlert=this._plusAlert();
    const level=this._number("gas_level"),filled=level===null?0:Math.max(0,Math.min(100,level));
    const seen=this._state("battery")?.attributes?.last_seen;
    const changed=weight?.last_changed;
    const hasError=this._val("error")==="on",cal=this._val("needs_calibration")==="on",low=this._val("low_gas")==="on";
    const age=Date.now()-new Date(seen||"").getTime();
    let status=["fresh","good"];
    if(!weight||this._val("gas_remaining")===null)status=["missing","warn"];
    else if(hasError)status=["error","bad"];
    else if(plusAlert)status=["plusWarningStatus","warn"];
    else if(cal)status=["calibration","warn"];
    else if(Number.isFinite(age)&&age>1800000)status=["stale","warn"];
    else if(!Number.isFinite(age))status=["noTime","warn"];
    // These color bands are UI guidance, not calibrated signal reliability.
    const batterySeverity=this._batterySeverity();
    const signalSeverity=this._signalSeverity();
    const openHistory=this._historyOpen,openDiag=this._diagOpen;
    this.shadowRoot.innerHTML=`
<style>${CSS}</style>
<ha-card>
 <div class="top"><div class="brand"><div class="logo"><img src="${BRAND_ICON}" alt="Senso4s" loading="eager" decoding="async"></div><div><h2>${this._esc(this._title())}</h2><div class="muted">${t(plus?"subPlus":"sub")}</div></div></div><span class="status ${status[1]}">${t(status[0])}</span></div>
 ${this._isDemo()?`<div class="demo-note">${t("demoLabel")}</div>`:""}
 ${!p||!weight?`<div class="alert">${list.length>1?t("multi"):t("noScale")}</div>`:`
 ${hasError||cal||low||plusAlert?`<div class="alert">${[hasError?t("error"):"",cal?t("calibration"):"",low?t("low"):"",plusAlert?t("plusWarning"):""].filter(Boolean).join(" · ")}</div>`:""}
 <div class="hero"><div class="bottle"><div class="handle"></div><div class="neck"></div><div class="body"><div class="fill" style="height:${filled}%"></div><div class="overlay"><ha-icon icon="mdi:fire"></ha-icon><strong>${level===null?"—":Math.round(level)+"%"}</strong></div></div></div>
 <div class="hero-details"><div class="label">${t("weight")}</div><div class="big">${this._display("gas_remaining",2,"kg")}</div>
 <div class="estimate"><ha-icon icon="mdi:calendar-clock"></ha-icon><span>${t("estimatedEmpty")}: <strong>${this._dateOnly(this._val("estimated_empty"))}</strong></span></div>
 <div class="hero-meta" aria-label="${t("battery")}, ${t("signal")}">
 <span class="hero-meta-item ${batterySeverity}" title="${t("battery")}"><ha-icon icon="mdi:battery"></ha-icon><strong>${this._display("battery",0,"%")}</strong></span>
 <span class="hero-meta-item ${signalSeverity}" title="${t("signal")}"><ha-icon icon="mdi:bluetooth"></ha-icon><strong>${this._display("rssi",0,"dBm")}</strong></span>
 </div></div></div>
 ${this._actionsVisible()&&level!==null&&level<10?`<div class="pending-actions refill-action"><button type="button" class="pending-btn" disabled title="${t("comingLater")}"><ha-icon icon="mdi:gas-cylinder"></ha-icon>${t("refillTank")}</button><span class="planned-hint">${t("comingLater")}</span></div>`:""}
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
  ${plus?this._plusDiagnostics():""}
 ${this._actionsVisible()?`<div class="pending-actions" aria-label="${t("plannedActions")}">
   <button type="button" class="pending-btn" disabled title="${t("comingLater")}"><ha-icon icon="mdi:scale-balance"></ha-icon>${t("recalibrateScale")}</button>
   <button type="button" class="pending-btn" disabled title="${t("comingLater")}"><ha-icon icon="mdi:cog-outline"></ha-icon>${t("settingsOnly")}</button>
   <span class="planned-hint">${t("comingLater")}</span>
 </div>`:""}</div>`:""}
 </section>`:""}`}
 ${this._config.show_history||this._config.show_diagnostics?`<footer><span>${plus?"Senso4s Plus":"Senso4s Basic"} · ${VERSION}</span><span>${t("readOnly")}</span></footer>`:""}
</ha-card>`;
    this.shadowRoot.querySelector('[data-toggle="history"]')?.addEventListener("click",()=>{this._historyOpen=!this._historyOpen;this._schedule();if(this._historyOpen&&!this._loaded)this._loadHistory();});
    this.shadowRoot.querySelector('[data-toggle="diag"]')?.addEventListener("click",()=>{this._diagOpen=!this._diagOpen;this._schedule();});
    this.shadowRoot.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>{this._view=btn.dataset.view;this._schedule();}));
    this.shadowRoot.querySelector("[data-refresh]")?.addEventListener("click",()=>{this._loaded=false;this._loadHistory();});
  }
}
if(!customElements.get("senso4s-basic-card-editor"))customElements.define("senso4s-basic-card-editor",Senso4sBasicCardEditor);
if(!customElements.get(TAG))customElements.define(TAG,Senso4sBasicCard);
window.customCards=window.customCards||[];
if(!window.customCards.some(card=>card.type===TAG))window.customCards.push({type:TAG,name:"Senso4s Basic / Plus",description:"Auto-detecting Basic / Plus gas cylinder scale card for Home Assistant",preview:false});
console.info("[Senso4s Basic / Plus] "+VERSION);
})();
