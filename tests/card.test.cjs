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

test('auto-detects single Senso4s scale and distinguishes BLE from weight timestamps', async () => {
  const card = new Card();
  card.setConfig({ language: 'sv' });
  card.hass = { states: makeStates(), language: 'sv' };
  await Promise.resolve();
  assert.match(card.shadowRoot.innerHTML, /9,50 kg/);
  assert.match(card.shadowRoot.innerHTML, /95%/);
  assert.match(card.shadowRoot.innerHTML, /Senast behandlad BLE-data/);
  assert.match(card.shadowRoot.innerHTML, /Senast ändrad vikt i HA/);
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
  card.hass = { states: makeStates(), language: 'sv', callApi: async () => [
    [
      { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.7', last_changed: oldTime },
      { entity_id: 'sensor.' + base + '_gas_remaining', state: '9.5', last_changed: newTime },
    ],
  ] };
  card._historyOpen = true;
  await card._loadHistory();
  await Promise.resolve();
  assert.match(card._chart(), /stroke-width="3"/);
  assert.match(card._eventsHtml(), /9.7/);
  assert.match(card._eventsHtml(), /9.5/);
});
