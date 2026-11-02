const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const js = fs.readFileSync(path.join(__dirname, '..', 'senso4s-basic-card.js'), 'utf8');
const registry = new Map();
class HTMLElementMock {
  attachShadow() {
    const shadow = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [] };
    this.shadowRoot = shadow;
    return shadow;
  }
}
const sandbox = {
  window: { customCards: [] },
  customElements: { get: (tag) => registry.get(tag), define: (tag, klass) => registry.set(tag, klass) },
  HTMLElement: HTMLElementMock,
  console,
};
vm.runInNewContext(js, sandbox, { filename: 'senso4s-basic-card.js' });
const Card = registry.get('senso4s-basic-card');
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
  assert.ok(html.includes('flex-direction:column;align-items:flex-start'));
});
