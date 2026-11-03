const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const js = fs.readFileSync(path.join(__dirname, '..', 'senso4s-basic-card.js'), 'utf8');
const registry = new Map();
class HTMLElementMock {
  attachShadow() {
    const shadow = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {}, activeElement: null };
    this.shadowRoot = shadow;
    return shadow;
  }
  dispatchEvent(event) {
    this.events = this.events || [];
    this.events.push(event);
    return true;
  }
}
const sandbox = {
  window: { customCards: [] },
  customElements: { get: (tag) => registry.get(tag), define: (tag, klass) => registry.set(tag, klass) },
  HTMLElement: HTMLElementMock,
  document: { createElement: tag => new (registry.get(tag))() },
  CustomEvent: class CustomEvent { constructor(type,options){this.type=type;Object.assign(this,options);} },
  console,
};
vm.runInNewContext(js, sandbox, { filename: 'senso4s-basic-card.js' });
const Card = registry.get('senso4s-basic-card');
const Editor = registry.get('senso4s-basic-card-editor');
const base = 'senso4s_gas_sensor_5d32';
const oldTime = '2026-11-02T21:00:54+00:00';
const newTime = '2026-11-02T21:30:54+00:00';
const entity = (key, value, extra={}) => ({
  entity_id: 'sensor.' + base + '_' + key,
  state: String(value),
  last_changed: newTime,
  attributes: extra,
});
const makeStates = () => ({
  ['sensor.' + base + '_gas_remaining']: entity('gas_remaining', 9.5),
  ['sensor.' + base + '_gas_level']: entity('gas_level', 95),
  ['sensor.' + base + '_battery']: entity('battery', 100, { last_seen: newTime }),
  ['sensor.' + base + '_signal_strength']: entity('signal_strength', -51),
  ['sensor.' + base + '_gas_capacity']: entity('gas_capacity', 10),
});

test('registers standalone custom card with no service calls', () => {
  assert.equal(typeof Card, 'function');
  assert.equal(js.includes('callService('), false);
  assert.equal(/wecamp/i.test(js), false);
});

test('auto-detects single Senso4s scale and shows compact overview', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /9,50 kg/);
  assert.match(card.shadowRoot.innerHTML, /95%/);
  assert.equal(card.shadowRoot.innerHTML.includes('Senast behandlad BLE-data'), false);
});

test('English UI and explicit scale selection', async () => {
  const card = new Card();
  card.setConfig({ entity: 'sensor.' + base + '_gas_remaining', language: 'en' });
  card.hass = { states: makeStates(), language: 'en' };
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /Gas remaining/);
});

test('prompts for a device with multiple discovered scales', async () => {
  const states = { ...makeStates() };
  states['sensor.senso4s_other_gas_remaining'] = {
    entity_id: 'sensor.senso4s_other_gas_remaining', state: '8.8', attributes: {}
  };
  const card = new Card();
  card.setConfig({});
  card.hass = { states, language: 'sv' };
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /Flera Senso4s-vågar/);
});

test('reads history and includes discrete mass changes', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  let historyPath = '';
  card.hass = { states: makeStates(), language: 'sv', callApi: async (method, path) => {
    assert.equal(method, 'GET');
    historyPath = path;
    return [
      [
        { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.7', last_changed: oldTime },
        { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.5', last_changed: newTime },
      ],
    ];
  } };
  card._historyOpen = true;
  await card._loadHistory();
  await Promise.resolve();
  const params = new URLSearchParams(historyPath.split('?')[1]);
  assert.ok(params.has('end_time'), 'history request must explicitly end at current time');
  const start = new Date(decodeURIComponent(historyPath.split('/period/')[1].split('?')[0]));
  const end = new Date(params.get('end_time'));
  const windowHours = (end - start) / 3600000;
  assert.ok(windowHours >= 167.9 && windowHours <= 168.1, 'complete 7-day history window');
  assert.match(card._chart(), /stroke-width="3"/);
  assert.match(card._chart(), / H[0-9.]+ V[0-9.]+/);
  assert.equal(card.shadowRoot.innerHTML.includes('Senaste ändringar'), false);
});

test('weight note is tucked under diagnostics and footer remains concise', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  assert.equal(card.shadowRoot.innerHTML.includes('Senaste BLE-kontakt är inte samma sak'), false);
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  assert.equal(card.shadowRoot.innerHTML.split('Senaste BLE-kontakt är inte samma sak').length - 1, 1);
  assert.match(card.shadowRoot.innerHTML, /Endast läsning/);
});

test('compact hero shows battery and Bluetooth without duplicate tiles', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  assert.match(html, /9,50 kg/);
  assert.match(html, /<ha-icon icon="mdi:battery"><\/ha-icon><strong>100 %<\/strong>/);
  assert.match(html, /<ha-icon icon="mdi:bluetooth"><\/ha-icon><strong>[−-]51 dBm<\/strong>/);
  assert.equal(html.includes('<div class="stats">'), false);
  assert.equal(html.includes('<div class="times">'), false);
  assert.equal(html.includes('Senaste BLE-kontakt är inte samma sak'), false);
});

test('measurement timestamps and BLE explanation appear only under diagnostics', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  assert.match(html, /Senast behandlad BLE-data/);
  assert.match(html, /Senast ändrad vikt i HA/);
  assert.match(html, /Användningsläge/);
  assert.equal(html.includes('Flaskkapacitet'), false);
  assert.equal(html.split('Senaste BLE-kontakt är inte samma sak').length - 1, 1);
  assert.equal(html.split('<div class="times">').length - 1, 1);
});

test('English diagnostic timestamps are translated', async () => {
  const card = new Card();
  card.setConfig({ language: 'en' });
  card.hass = { states: makeStates(), language: 'en' };
  await Promise.resolve();
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /Last processed BLE data/);
  assert.match(card.shadowRoot.innerHTML, /Last weight change in HA/);
});

test('history only shows mass, battery, RSSI charts without a change log', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  let historyPath = '';
  card.hass = { states: makeStates(), language: 'sv', callApi: async (_method, path) => {
    historyPath = path;
    return [[
      { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.7', last_changed: oldTime },
      { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.5', last_changed: newTime },
    ]];
  } };
  card._historyOpen = true;
  await card._loadHistory();
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  assert.equal(html.includes('data-view="gas_level"'), false);
  for (const key of ['gas_remaining', 'battery', 'rssi']) assert.ok(html.includes('data-view="' + key + '"'));
  assert.equal(html.includes('Senaste ändringar'), false);
  assert.equal(historyPath.includes('senso4s_gas_sensor_5d32_gas_level'), false);
  assert.equal(typeof card._eventsHtml, 'undefined');
});

test('battery indicator colors follow 20 percent and 10 percent boundaries', async () => {
  for (const [level, expected] of [[100,'good'],[20,'good'],[19,'warn'],[10,'warn'],[9,'bad']]) {
    const states = makeStates();
    states['sensor.' + base + '_battery'] = entity('battery', level, { last_seen: newTime });
    const card = new Card();
    card.setConfig({ language: 'sv' });
    card.hass = { states, language: 'sv' };
    await Promise.resolve();
    assert.ok(card.shadowRoot.innerHTML.includes('class="hero-meta-item ' + expected + '" title="Batteri"'), String(level));
  }
});

test('RSSI indicator colors are a noncalibrated signal-strength heuristic', async () => {
  for (const [rssi, expected] of [[-49,'good'],[-70,'good'],[-71,'warn'],[-85,'warn'],[-86,'bad']]) {
    const states = makeStates();
    states['sensor.' + base + '_signal_strength'] = entity('signal_strength', rssi);
    const card = new Card();
    card.setConfig({ language: 'sv' });
    card.hass = { states, language: 'sv' };
    await Promise.resolve();
    assert.ok(card.shadowRoot.innerHTML.includes('class="hero-meta-item ' + expected + '" title="Bluetooth-signal"'), String(rssi));
  }
});

test('missing battery and RSSI are neutral, not false green', async () => {
  const states = makeStates();
  delete states['sensor.' + base + '_battery'];
  delete states['sensor.' + base + '_signal_strength'];
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states, language: 'sv' };
  await Promise.resolve();
  assert.ok(card.shadowRoot.innerHTML.includes('class="hero-meta-item neutral" title="Batteri"'));
  assert.ok(card.shadowRoot.innerHTML.includes('class="hero-meta-item neutral" title="Bluetooth-signal"'));
});

test('estimated empty date sits between weight and battery/RSSI in either language', async () => {
  for (const [lang, label] of [['sv', 'Beräknat tom'], ['en', 'Estimated empty']]) {
    const states = makeStates();
    states['sensor.' + base + '_estimated_empty'] = entity(
      'estimated_empty', '2026-11-29T17:00:00+01:00'
    );
    const card = new Card();
    card.setConfig({ language: lang });
    card.hass = { states, language: lang };
    await Promise.resolve();
    const html = card.shadowRoot.innerHTML;
    const iWeight = html.indexOf('class="big"');
    const iEstimate = html.indexOf('class="estimate"');
    const iBattery = html.indexOf('class="hero-meta"');
    assert.ok(iWeight < iEstimate && iEstimate < iBattery);
    assert.ok(html.includes(label));
    assert.ok(html.includes('icon="mdi:calendar-clock"'));
    assert.ok(/29\s+(nov\.|Nov)\s+2026/.test(html));
  }
});

test('unavailable estimated empty state shows dash instead of invented date', async () => {
  for (const unavailable of ['unknown', 'unavailable']) {
    const states = makeStates();
    states['sensor.' + base + '_estimated_empty'] = entity('estimated_empty', unavailable);
    const card = new Card();
    card.setConfig({ language: 'sv' });
    card.hass = { states, language: 'sv' };
    await Promise.resolve();
    assert.match(card.shadowRoot.innerHTML, /Beräknat tom: <strong>—<\/strong>/);
  }
});

test('refill placeholder appears strictly below 10 percent and cannot execute', async () => {
  for (const [percent, visible] of [[0,true],[9,true],[9.9,true],[10,false],[11,false],[95,false]]) {
    const states = makeStates();
    states['sensor.' + base + '_gas_level'] = entity('gas_level', percent);
    const card = new Card();
    card.setConfig({ language: 'en' });
    card.hass = { states, language: 'en' };
    await Promise.resolve();
    const html = card.shadowRoot.innerHTML;
    assert.equal(html.includes('Refill tank'), visible, String(percent));
    if (visible) assert.match(html, /class="pending-btn" disabled title="Coming later"/);
  }
  for (const missing of ['unknown','unavailable']) {
    const states = makeStates();
    states['sensor.' + base + '_gas_level'] = entity('gas_level', missing);
    const card = new Card();
    card.setConfig({ language: 'en' });
    card.hass = { states, language: 'en' };
    await Promise.resolve();
    assert.equal(card.shadowRoot.innerHTML.includes('Refill tank'), false, missing);
  }
});

test('recalibrate and settings placeholders belong inside expanded diagnostics', async () => {
  const card = new Card();
  card.setConfig({ language: 'en' });
  card.hass = { states: makeStates(), language: 'en' };
  await Promise.resolve();
  assert.equal(card.shadowRoot.innerHTML.includes('Recalibrate Scale'), false);
  assert.equal(card.shadowRoot.innerHTML.includes('Settings Only'), false);
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  assert.match(html, /class="pending-btn" disabled title="Coming later"><ha-icon icon="mdi:scale-balance"><\/ha-icon>Recalibrate Scale/);
  assert.match(html, /class="pending-btn" disabled title="Coming later"><ha-icon icon="mdi:cog-outline"><\/ha-icon>Settings Only/);
  assert.equal(html.includes('Refill tank'), false);
});

test('Swedish placeholders are localized, disabled and preserve estimated empty', async () => {
  const states = makeStates();
  states['sensor.' + base + '_gas_level'] = entity('gas_level', 9);
  states['sensor.' + base + '_estimated_empty'] = entity('estimated_empty', '2026-11-29T17:00:00+01:00');
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states, language: 'sv' };
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /Fyll på flaskan/);
  assert.match(card.shadowRoot.innerHTML, /Beräknat tom/);
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /Kalibrera vågen/);
  assert.match(card.shadowRoot.innerHTML, /Endast inställningar/);
  assert.equal(card.shadowRoot.innerHTML.split('class="pending-btn" disabled').length - 1, 3);
});

test('usage modes render their matching colored icons and accessible localized titles', async () => {
  const modes = [
    ['Heating','mdi:radiator','warn','Uppvärmning'],
    ['BBQ','mdi:grill','warn','Grillning'],
    ['Camping','mdi:tent','good','Camping'],
    ['Caravanning','mdi:caravan','info','Husvagn'],
    ['Household','mdi:home','info','Hushåll'],
  ];
  for (const [mode,icon,tone,title] of modes) {
    const states=makeStates();
    states['sensor.'+base+'_usage_mode']=entity('usage_mode',mode);
    const card=new Card();card.setConfig({language:'sv'});card.hass={states,language:'sv'};
    await Promise.resolve();card._diagOpen=true;card._schedule();await Promise.resolve();
    const html=card.shadowRoot.innerHTML;
    assert.ok(html.includes('class="diag-visual '+tone+'" role="img" aria-label="'+title+'"'),mode);
    assert.ok(html.includes('icon="'+icon+'"'),mode);
    assert.equal(html.includes('<strong>'+mode+'</strong>'),false,mode);
  }
});

test('error, calibration and low-gas fields use icons with severity colors', async () => {
  const fields=[
    ['error','Felstatus','mdi:alert-circle','bad'],
    ['needs_calibration','Behöver kalibrering','mdi:scale-balance','warn'],
    ['low_gas','Låg gasol','mdi:alert-circle','bad'],
  ];
  for (const [key,label,onIcon,onTone] of fields) {
    for(const [state,icon,tone,access] of [
      ['off','mdi:check-circle','good','Nej'],
      ['on',onIcon,onTone,'Ja'],
      ['unavailable','mdi:help-circle-outline','neutral','Ej tillgängligt']
    ]){
      const states=makeStates();
      states['binary_sensor.'+base+'_'+key]={entity_id:'binary_sensor.'+base+'_'+key,state};
      const card=new Card();card.setConfig({language:'sv'});card.hass={states,language:'sv'};
      await Promise.resolve();card._diagOpen=true;card._schedule();await Promise.resolve();
      const html=card.shadowRoot.innerHTML;
      const start=html.indexOf('<span class="small">'+label+'</span>');
      const part=html.slice(start,start+340);
      assert.ok(start>=0,key);
      assert.ok(part.includes('class="diag-visual '+tone+'"'),key+' '+state);
      assert.ok(part.includes('icon="'+icon+'"'),key+' '+state);
      assert.ok(part.includes('aria-label="'+access+'"'),key+' '+state);
      assert.equal(part.includes('<strong>'+access+'</strong>'),false,key+' '+state);
    }
  }
});

test('unrecognized usage mode stays neutral without inventing a category', async () => {
  for(const state of ['unknown','Unknown future mode']) {
    const states=makeStates();states['sensor.'+base+'_usage_mode']=entity('usage_mode',state);
    const card=new Card();card.setConfig({language:'en'});card.hass={states,language:'en'};
    await Promise.resolve();card._diagOpen=true;card._schedule();await Promise.resolve();
    const html=card.shadowRoot.innerHTML;
    assert.match(html,/class="diag-visual neutral" role="img" aria-label="Unknown usage mode"/);
    assert.match(html,/icon="mdi:help-circle-outline"/);
  }
});

test('diagnostic panel has a symmetric two-by-two grid with icons below labels', async () => {
  const states = makeStates();
  states['sensor.' + base + '_usage_mode'] = entity('usage_mode', 'Heating');
  for (const key of ['error', 'needs_calibration', 'low_gas']) {
    states['binary_sensor.' + base + '_' + key] = {
      entity_id: 'binary_sensor.' + base + '_' + key,
      state: 'off'
    };
  }
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states, language: 'sv' };
  await Promise.resolve();
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  const grid = html.slice(html.indexOf('<div class="grid">'), html.indexOf('<div class="pending-actions"', html.indexOf('<div class="grid">')));
  assert.equal(grid.split('<div class="diag">').length - 1, 4);
  assert.equal(grid.split('class="diag-visual').length - 1, 4);
  assert.equal(grid.includes('Flaskkapacitet'), false);
  assert.equal(grid.includes('10,00 kg'), false);
  for (const label of ['Användningsläge', 'Felstatus', 'Behöver kalibrering', 'Låg gasol']) {
    const start = grid.indexOf('<span class="small">' + label + '</span>');
    assert.ok(start >= 0, label);
    const next = grid.indexOf('<div class="diag">', start);
    const tile = grid.slice(start, next < 0 ? undefined : next);
    assert.ok(tile.indexOf('class="diag-visual') > tile.indexOf('</span>'), label);
  }
  assert.ok(html.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
  assert.ok(html.includes('flex-direction:column;align-items:center;justify-content:center'));
  assert.ok(html.includes('min-height:104px'));
  assert.ok(html.includes('.diag .small{display:flex;align-items:center;justify-content:center'));
  assert.ok(html.includes('font-size:13px;font-weight:700;text-align:center'));
});

test('both embedded Swedish and English translation dictionaries remain synchronized', () => {
  const match = js.match(/const L=(\{[\s\S]*?\});\s*const CSS=/);
  assert.ok(match, 'embedded Swedish/English translation object exists');
  const translations = JSON.parse(match[1]);
  const sv = Object.keys(translations.sv).sort();
  const en = Object.keys(translations.en).sort();
  assert.equal(sv.length, 66);
  assert.deepEqual(sv, en);
  for (const key of sv) {
    assert.ok(translations.sv[key].trim(), 'Swedish: ' + key);
    assert.ok(translations.en[key].trim(), 'English: ' + key);
  }
  for (const key of ['mode', 'errorTitle', 'calibrationTitle', 'lowTitle',
                     'estimatedEmpty', 'refillTank', 'recalibrateScale',
                     'settingsOnly', 'comingLater', 'modeHeating']) {
    assert.ok(translations.sv[key], key + ' Swedish');
    assert.ok(translations.en[key], key + ' English');
  }
  assert.match(js, /VERSION="0\.1\.4b1"/);
});

test('show_history and show_diagnostics default to true for existing dashboards', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  assert.match(html, /data-toggle="history"/);
  assert.match(html, /data-toggle="diag"/);
  assert.match(html, /Senso4s Basic · 0\.1\.4b1/);
  assert.equal(card.getCardSize(), 6);
});

test('top-only mode omits both sections and footer but retains gas metrics', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv', show_history: false, show_diagnostics: false });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  const html = card.shadowRoot.innerHTML;
  assert.match(html, /9,50 kg/);
  assert.match(html, /95%/);
  assert.match(html, /mdi:battery/);
  assert.match(html, /mdi:bluetooth/);
  assert.equal(html.includes('data-toggle="history"'), false);
  assert.equal(html.includes('data-toggle="diag"'), false);
  assert.equal(html.includes('<footer>'), false);
  assert.equal(card.getCardSize(), 4);
});

test('history-only mode excludes diagnostics and supports Recorder graphs', async () => {
  const card = new Card();
  card.setConfig({ language: 'en', show_history: true, show_diagnostics: false });
  let calls = 0;
  card.hass = { states: makeStates(), language: 'en', callApi: async () => {
    calls++;
    return [[
      { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.7', last_changed: oldTime },
      { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.5', last_changed: newTime }
    ]];
  } };
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /data-toggle="history"/);
  assert.equal(card.shadowRoot.innerHTML.includes('data-toggle="diag"'), false);
  card._historyOpen = true;
  await card._loadHistory();
  await Promise.resolve();
  assert.equal(calls, 1);
  assert.match(card.shadowRoot.innerHTML, /data-view="gas_remaining"/);
  assert.match(card.shadowRoot.innerHTML, /<footer>/);
});

test('diagnostics-only mode hides history and prevents Recorder requests', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv', show_history: false, show_diagnostics: true });
  let calls = 0;
  card.hass = { states: makeStates(), language: 'sv', callApi: async () => { calls++; return []; } };
  await Promise.resolve();
  assert.equal(card.shadowRoot.innerHTML.includes('data-toggle="history"'), false);
  assert.match(card.shadowRoot.innerHTML, /data-toggle="diag"/);
  card._diagOpen = true;
  card._schedule();
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /Felstatus/);
  assert.match(card.shadowRoot.innerHTML, /Kalibrera vågen/);
  await card._loadHistory();
  assert.equal(calls, 0);
  assert.equal(card.getCardSize(), 6);
});

test('configuration rejects non-boolean visibility flags', () => {
  for (const config of [
    { show_history: 'false' },
    { show_history: 0 },
    { show_diagnostics: 'true' },
    { show_diagnostics: null },
  ]) {
    const card = new Card();
    assert.throws(() => card.setConfig(config), /must be boolean/);
  }
});

test('switching from history-enabled to hidden invalidates pending history request', async () => {
  const card = new Card();
  card.setConfig({ show_history: true, show_diagnostics: false });
  let finish;
  card.hass = { states: makeStates(), language: 'sv', callApi: () =>
    new Promise(resolve => { finish = resolve; })
  };
  const pending = card._loadHistory();
  card.setConfig({ show_history: false, show_diagnostics: false });
  finish([[{ entity_id: 'sensor.' + base + '_gas_remaining', state: '9.5', last_changed: newTime }]]);
  await pending;
  await Promise.resolve();
  assert.equal(card._history.length, 0);
  assert.equal(card.shadowRoot.innerHTML.includes('data-toggle="history"'), false);
});

test('standard is the default size and preserves existing sections and metrics', async () => {
  const card=new Card();
  card.setConfig({language:'sv'});
  card.hass={states:makeStates(),language:'sv'};
  await Promise.resolve();
  const html=card.shadowRoot.innerHTML;
  assert.equal(card._config.size, 'standard');
  assert.match(html, /data-toggle="history"/);
  assert.match(html, /data-toggle="diag"/);
  assert.match(html, /mini-card/);
  assert.match(html, /9,50 kg/);
  assert.match(html, /100 %/);
  assert.match(html, /51 dBm/);
  assert.equal(card.getGridOptions().columns, 12);
});

test('mini is a single-row Mushroom-style display with only the requested data', async () => {
  const card=new Card();
  card.setConfig({size:'mini',language:'sv'});
  card.hass={states:makeStates(),language:'sv'};
  await Promise.resolve();
  const html=card.shadowRoot.innerHTML;
  assert.match(html, /<ha-card class="mini-card"/);
  assert.match(html, /class="mini-cylinder"/);
  assert.match(html, /<img src="data:image\/png;base64,/);
  assert.match(html, /class="mini-weight"[^>]*>9,50 kg<\/div>/);
  assert.match(html, /class="mini-signals"/);
  assert.match(html, /class="mini-status good" role="img" aria-label="Batteri"/);
  assert.match(html, /class="mini-status good" role="img" aria-label="Bluetooth-signal"/);
  assert.equal(html.includes('100 %'), false);
  assert.equal(html.includes('dBm'), false);
  assert.equal(html.includes('95%'), false);
  assert.equal(html.includes('Beräknat tom'), false);
  assert.equal(html.includes('data-toggle="history"'), false);
  assert.equal(html.includes('data-toggle="diag"'), false);
  assert.equal(html.includes('<footer>'), false);
  assert.equal(card.getCardSize(),1);
  assert.equal(card.getGridOptions().columns,12);
  assert.ok(html.includes('.mini-card{padding:0}'));
});

test('mini ignores section visibility flags without mutating them', async () => {
  const card=new Card();
  card.setConfig({size:'mini',show_history:true,show_diagnostics:true});
  card.hass={states:makeStates(),language:'en',callApi:async()=>{throw Error('Recorder must not be requested');}};
  await Promise.resolve();
  assert.equal(card.shadowRoot.innerHTML.includes('data-toggle="history"'),false);
  assert.equal(card.shadowRoot.innerHTML.includes('data-toggle="diag"'),false);
  card.setConfig({size:'standard',show_history:true,show_diagnostics:true});
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML,/data-toggle="history"/);
  assert.match(card.shadowRoot.innerHTML,/data-toggle="diag"/);
});

test('mini status icon colors follow existing battery and RSSI thresholds', async () => {
  const levels=[[100,'good'],[20,'good'],[19,'warn'],[10,'warn'],[9,'bad']];
  const signals=[[-49,'good'],[-70,'good'],[-71,'warn'],[-85,'warn'],[-86,'bad']];
  for(const [value,tone] of levels){
    const states=makeStates();
    states['sensor.'+base+'_battery']=entity('battery',value,{last_seen:newTime});
    const card=new Card();card.setConfig({size:'mini',language:'sv'});
    card.hass={states,language:'sv'};await Promise.resolve();
    assert.ok(card.shadowRoot.innerHTML.includes('class="mini-status '+tone+'" role="img" aria-label="Batteri"'),String(value));
    assert.equal(card.shadowRoot.innerHTML.includes(String(value)+' %'),false);
  }
  for(const [value,tone] of signals){
    const states=makeStates();
    states['sensor.'+base+'_signal_strength']=entity('signal_strength',value);
    const card=new Card();card.setConfig({size:'mini',language:'sv'});
    card.hass={states,language:'sv'};await Promise.resolve();
    assert.ok(card.shadowRoot.innerHTML.includes('class="mini-status '+tone+'" role="img" aria-label="Bluetooth-signal"'),String(value));
    assert.equal(card.shadowRoot.innerHTML.includes(value+' dBm'),false);
  }
});

test('mini missing battery, BT and gas mass produce neutral indicators and dash', async () => {
  const states=makeStates();
  delete states['sensor.'+base+'_battery'];
  delete states['sensor.'+base+'_signal_strength'];
  states['sensor.'+base+'_gas_remaining']=entity('gas_remaining','unavailable');
  const card=new Card();card.setConfig({size:'mini',language:'en'});
  card.hass={states,language:'en'};await Promise.resolve();
  const html=card.shadowRoot.innerHTML;
  assert.match(html,/class="mini-weight"[^>]*>—<\/div>/);
  assert.match(html,/class="mini-status neutral" role="img" aria-label="Battery"/);
  assert.match(html,/class="mini-status neutral" role="img" aria-label="Bluetooth signal"/);
  assert.match(html,/mdi:battery-unknown/);
  assert.match(html,/mdi:bluetooth-off/);
});

test('mini and standard are the only supported size values', () => {
  for(const size of ['small','large','compact','','MINI',null,1]){
    const card=new Card();
    assert.throws(()=>card.setConfig({size}),/size must be mini or standard/);
  }
});

test('HA card exposes a visual editor element', () => {
  assert.equal(typeof Editor, 'function');
  const editor = Card.getConfigElement();
  assert.ok(editor instanceof Editor);
  editor.setConfig({});
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="title"'));
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="size"'));
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="entity"'));
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="language"'));
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="history_hours"'));
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="show_history"'));
  assert.ok(editor.shadowRoot.innerHTML.includes('data-field="show_diagnostics"'));
});

test('visual editor localizes labels in Swedish and English', () => {
  const editor = new Editor();
  editor.setConfig({ language: 'sv' });
  editor.hass = { states: makeStates(), language: 'sv' };
  assert.ok(editor.shadowRoot.innerHTML.includes('Rubrik'));
  assert.ok(editor.shadowRoot.innerHTML.includes('Kortstorlek'));
  assert.ok(editor.shadowRoot.innerHTML.includes('Visa sektioner'));
  editor.setConfig({ language: 'en' });
  assert.ok(editor.shadowRoot.innerHTML.includes('Card size'));
  assert.ok(editor.shadowRoot.innerHTML.includes('Display sections'));
});

test('visual editor discovers scale entities and retains manually configured IDs', () => {
  const id='sensor.'+base+'_gas_remaining';
  const editor=new Editor();
  editor.setConfig({entity: 'sensor.senso4s_missing_gas_remaining'});
  editor.hass={ states: makeStates(), language:'en' };
  const html=editor.shadowRoot.innerHTML;
  assert.ok(html.includes(id));
  assert.ok(html.includes('sensor.senso4s_missing_gas_remaining'));
  assert.ok(html.includes('Auto-detect'));
});

test('editor emits full config-changed with all existing settings preserved', () => {
  const editor=new Editor();
  editor.setConfig({type:'custom:senso4s-basic-card',title:'Old title',entity:'sensor.'+base+'_gas_remaining',other_extension:'keep',size:'standard'});
  editor._handleChange({target:{dataset:{field:'size'},type:'select-one',value:'mini'}});
  assert.equal(editor.events?.length,1);
  const ev=editor.events[0];
  assert.equal(ev.type,'config-changed');
  assert.equal(ev.bubbles,true);
  assert.equal(ev.composed,true);
  assert.equal(ev.detail.config.size,'mini');
  assert.equal(ev.detail.config.other_extension,'keep');
  assert.equal(ev.detail.config.type,'custom:senso4s-basic-card');
  editor._handleChange({target:{dataset:{field:'show_history'},type:'checkbox',checked:false}});
  assert.equal(editor.events.at(-1).detail.config.show_history,false);
  editor._handleChange({target:{dataset:{field:'language'},type:'select-one',value:'sv'}});
  assert.equal(editor.events.at(-1).detail.config.language,'sv');
});

test('editor updates history window and removes cleared optional fields', () => {
  const editor=new Editor();
  editor.setConfig({title:'Original',entity:'sensor.'+base+'_gas_remaining',history_hours:168});
  editor._handleChange({target:{dataset:{field:'history_hours'},type:'number',value:'999'}});
  assert.equal(editor.events.at(-1).detail.config.history_hours,720);
  editor._handleChange({target:{dataset:{field:'title'},type:'text',value:''}});
  assert.equal(Object.hasOwn(editor.events.at(-1).detail.config,'title'),false);
  editor._handleChange({target:{dataset:{field:'entity'},type:'select-one',value:''}});
  assert.equal(Object.hasOwn(editor.events.at(-1).detail.config,'entity'),false);
  const oldCount=editor.events.length;
  editor._handleChange({target:{dataset:{field:'unknown_setting'},type:'text',value:'unsafe'}});
  assert.equal(editor.events.length,oldCount);
});

test('switching size preserves standard-only settings in visual editor', () => {
  const editor=new Editor();
  editor.setConfig({size:'standard',show_history:false,show_diagnostics:true,history_hours:72});
  editor._handleChange({target:{dataset:{field:'size'},type:'select-one',value:'mini'}});
  const mini=editor.events.at(-1).detail.config;
  assert.equal(mini.size,'mini');
  assert.equal(mini.show_history,false);
  assert.equal(mini.show_diagnostics,true);
  assert.equal(mini.history_hours,72);
  editor._handleChange({target:{dataset:{field:'size'},type:'select-one',value:'standard'}});
  assert.equal(editor.events.at(-1).detail.config.show_history,false);
  assert.equal(editor.events.at(-1).detail.config.history_hours,72);
});

test('mini default Section width matches standard and remains resizable in HA layout', () => {
  const mini=new Card();
  mini.setConfig({size:'mini',show_history:false,show_diagnostics:false});
  const standard=new Card();
  standard.setConfig({size:'standard'});
  assert.equal(mini.getGridOptions().columns,12);
  assert.equal(standard.getGridOptions().columns,12);
  assert.equal(mini.getGridOptions().rows,'auto');
  assert.equal(mini.getCardSize(),1);
  assert.equal(js.includes('grid-template-columns:40px minmax(0,1fr) auto'),true);
});

test('existing Mini remains minimal by default; Standard retains its placeholders', async () => {
  const mini=new Card();mini.setConfig({size:'mini',language:'sv'});
  mini.hass={states:makeStates(),language:'sv'};await Promise.resolve();
  const miniHtml=mini.shadowRoot.innerHTML;
  assert.equal(mini._actionsVisible(),false);
  assert.equal(miniHtml.includes('<div class="mini-actions"'),false);
  assert.equal(miniHtml.includes('class="mini-shell with-actions"'),false);
  const standard=new Card();standard.setConfig({size:'standard',show_diagnostics:true,language:'sv'});
  standard.hass={states:makeStates(),language:'sv'};await Promise.resolve();
  standard._diagOpen=true;standard._schedule();await Promise.resolve();
  assert.equal(standard._actionsVisible(),true);
  assert.match(standard.shadowRoot.innerHTML,/Kalibrera vågen/);
  assert.match(standard.shadowRoot.innerHTML,/Endast inställningar/);
});

test('Mini with show_actions displays only disabled Calibrate between mass and Bluetooth', async () => {
  const card=new Card();card.setConfig({size:'mini',show_actions:true,language:'sv'});
  card.hass={states:makeStates(),language:'sv'};await Promise.resolve();
  const html=card.shadowRoot.innerHTML;
  assert.equal(card._actionsVisible(),true);
  assert.match(html,/class="mini-shell with-actions"/);
  const mass=html.indexOf('class="mini-weight"');
  const actions=html.indexOf('<div class="mini-actions"');
  const signals=html.indexOf('<div class="mini-signals"');
  assert.ok(mass<actions&&actions<signals);
  const actionsHtml=html.slice(actions,signals);
  assert.match(actionsHtml,/mdi:scale-balance/);
  assert.equal(actionsHtml.includes('mdi:plus-circle-outline'),false);
  assert.equal((actionsHtml.match(/<button/g)||[]).length,1);
  assert.equal((actionsHtml.match(/ disabled /g)||[]).length,1);
  assert.match(actionsHtml,/Kalibrera vågen – Kommer senare/);
  assert.equal(html.includes('dBm'),false);
  assert.equal(html.includes('100 %'),false);
});

test('Mini Refill appears strictly below 10 percent and all actions remain disabled', async () => {
  for(const [value,shouldRefill] of [[0,true],[9,true],[9.99,true],[10,false],[11,false],[95,false],['unknown',false],['unavailable',false]]){
    const states=makeStates();
    states['sensor.'+base+'_gas_level']=entity('gas_level',value);
    const card=new Card();card.setConfig({size:'mini',show_actions:true,language:'en'});
    card.hass={states,language:'en'};await Promise.resolve();
    const html=card.shadowRoot.innerHTML;
    const actions=html.slice(html.indexOf('<div class="mini-actions"'),html.indexOf('<div class="mini-signals"'));
    assert.equal(actions.includes('mdi:plus-circle-outline'),shouldRefill,String(value));
    assert.match(actions,/mdi:scale-balance/);
    const count=(actions.match(/<button/g)||[]).length;
    assert.equal(count,shouldRefill?2:1,String(value));
    assert.equal((actions.match(/ disabled /g)||[]).length,count,String(value));
    assert.equal(html.includes('call-service'),false);
  }
});

test('calibration placeholder gets warning color only when calibration is needed', async () => {
  for(const [state,expected] of [['on',true],['off',false],['unavailable',false]]){
    const states=makeStates();
    states['binary_sensor.'+base+'_needs_calibration']={entity_id:'binary_sensor.'+base+'_needs_calibration',state};
    const card=new Card();card.setConfig({size:'mini',show_actions:true});
    card.hass={states,language:'sv'};await Promise.resolve();
    const action=card.shadowRoot.innerHTML.slice(card.shadowRoot.innerHTML.indexOf('<div class="mini-actions"'));
    assert.equal(action.includes('class="mini-action warn" disabled aria-label="Kalibrera vågen'),expected,state);
  }
});

test('show_actions false hides Standard diagnostic and refill placeholders', async () => {
  const states=makeStates();
  states['sensor.'+base+'_gas_level']=entity('gas_level',9);
  for(const enabled of [false,true]){
    const card=new Card();card.setConfig({size:'standard',show_actions:enabled,show_diagnostics:true,language:'sv'});
    card.hass={states,language:'sv'};await Promise.resolve();
    card._diagOpen=true;card._schedule();await Promise.resolve();
    const html=card.shadowRoot.innerHTML;
    assert.equal(html.includes('<div class="pending-actions refill-action"'),enabled);
    assert.equal(html.includes('<div class="pending-actions" aria-label="Planerade funktioner">'),enabled);
    assert.equal(html.includes('Kalibrera vågen'),enabled);
    assert.equal(html.includes('Endast inställningar'),enabled);
  }
});

test('visual editor offers localized show_actions control and preserves explicit toggle', () => {
  for(const [size,locale,label,implicit] of [['mini','sv','Visa snabbknappar',false],['standard','en','Show quick actions',true]]){
    const editor=new Editor();editor.setConfig({size,language:locale});
    assert.match(editor.shadowRoot.innerHTML,new RegExp(label));
    assert.match(editor.shadowRoot.innerHTML,/data-field="show_actions"/);
    assert.equal(editor._actionsVisible(),implicit);
    editor._handleChange({target:{dataset:{field:'show_actions'},type:'checkbox',checked:!implicit}});
    assert.equal(editor.events?.at(-1).detail.config.show_actions,!implicit);
    editor._handleChange({target:{dataset:{field:'size'},type:'select-one',value:size==='mini'?'standard':'mini'}});
    assert.equal(editor.events?.at(-1).detail.config.show_actions,!implicit);
  }
});

test('show_actions only accepts boolean values', () => {
  for(const v of ['true','false',0,1,null]){
    const card=new Card();
    assert.throws(()=>card.setConfig({show_actions:v}),/show_actions must be a boolean/);
  }
});

test('original SENSO brand icon is bundled into standalone JS as PNG data', () => {
  assert.match(js,/const BRAND_ICON="data:image\\/png;base64,/);
  const encoded=js.match(/const BRAND_ICON="data:image\\/png;base64,([^"]+)"/);
  assert.ok(encoded&&encoded[1]);
  const png=Buffer.from(encoded[1],'base64');
  assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16),128);
  assert.equal(png.readUInt32BE(20),128);
  assert.ok(png.length>1000);
  assert.equal(js.includes('cdn.'),false);
});

test('SENSO icon is displayed in both Standard header and Mini without additional assets', async () => {
  for(const size of ['standard','mini']){
    const card=new Card();
    card.setConfig({size,show_actions:size==='mini'});
    card.hass={states:makeStates(),language:'sv'};
    await Promise.resolve();
    const html=card.shadowRoot.innerHTML;
    assert.match(html,/alt="Senso4s"/);
    assert.match(html,/src="data:image\\/png;base64,/);
    assert.equal(html.includes('icon="mdi:gas-cylinder"'),false);
    assert.equal(html.includes('http://'),false);
    assert.equal(html.includes('https://'),false);
    assert.ok(html.includes(size==='mini'?'class="mini-cylinder"':'class="logo"'));
  }
});

test('branding update preserves read-only semantics and mini width', () => {
  const card=new Card();
  card.setConfig({size:'mini'});
  assert.equal(card.getGridOptions().columns,12);
  assert.equal(js.includes('callService('),false);
  assert.equal(js.includes('BRAND_ICON'),true);
});
