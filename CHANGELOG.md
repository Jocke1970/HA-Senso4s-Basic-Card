# Changelog

## 0.1.0b3 — 2026-11-02

- Remove redundant gas-level, battery, and RSSI statistic tiles from the main card
- Show battery and Bluetooth icons with their respective values alongside the gas amount
- Move last processed BLE data and last HA weight change into the Diagnostics expander
- Move the explanation of BLE freshness and weighing into Diagnostics
- Preserve read-only behavior, multilingual support, historic graphs, and previous fixes
- Add layout and diagnostic regression tests

**Validation:** JavaScript syntax and 12 simulated render/behavior checks passed. Testing the layout in an actual Home Assistant dashboard is still pending.


## 0.1.0b2 — 2026-11-02

- Fix Recorder history API query to supply `end_time` explicitly: with a 168-hour default window, HA otherwise returns only the first 24 hours from the start of the requested period
- Keep the existing history tabs and changes list, now backed by the full requested time range
- Remove a duplicated BLE freshness explanation in the main card
- Make the footer concise; clarify that the card is read-only
- Add a regression test for the explicit history range and repeated text

**Validation:** Source syntax and simulated history-request/rendering checks passed. Real Home Assistant verification is pending.


## 0.1.0b1 — 2026-11-02

Initial beta candidate of the standalone Senso4s Basic Lovelace card.

- Gas amount, percent, battery, Bluetooth signal and bottle gauge
- Explicit BLE processing time versus Home Assistant weight-change time
- Expandable diagnostics and Recorder history
- Swedish/English translations, automatic or explicit device selection
- HACS metadata and English documentation
- Read-only by design; no Wecamp dependency

**Validation:** Source syntax check and six simulated runtime checks passed. Real Home Assistant UI/device testing remains outstanding. `main` stays unchanged.
