# Changelog

## 0.1.0b6 — 2026-11-02

- Remove the cylinder-capacity tile from Diagnostics; no backend entities are changed
- Arrange the four remaining diagnostic statuses in a symmetrical two-column, two-row grid
- Keep each heading above its icon, with consistent tile height and vertical alignment
- Preserve all dynamic mode and status icon colors, localized accessibility labels, graphs and disabled future-action controls
- Document the direct dashboard JavaScript resource path and optional Chromium hard-cache-refresh troubleshooting

**Validation:** Source syntax and 22 simulated component tests passed. The revised layout awaits real Home Assistant visual verification; `main` is untouched.


## 0.1.0b5 — 2026-11-02

- Replace raw diagnostic text for usage mode, error status, calibration-needed and low-gas with dynamic status icons
- Match all five Senso4s modes: Heating (radiator), BBQ (grill), Camping (tent), Caravanning (caravan) and Household (home)
- Green check mark for explicit `off` alarm/flag states; red warning for active error and low gas; yellow scale for calibration required
- Neutral question mark on unavailable/unknown values; never treat missing flags as healthy
- Localized Swedish/English icon titles and accessible labels
- Keep cylinder capacity numeric and preserve all v0.1.0b4 features; no backend control actions added

**Validation:** JavaScript syntax and 21 simulated frontend tests passed. Real Home Assistant UI verification remains pending. `main` unchanged.


## 0.1.0b4 — 2026-11-02

- Show a localized `estimated_empty` date between gas weight and battery/RSSI indicators, with a neutral dash when absent
- Color battery icon: green at 20%+, yellow at 10–19%, red below 10%, neutral if unavailable
- Color Bluetooth signal icon with illustrative RSSI bands: green ≥−70 dBm, yellow −85 to below −70 dBm, red below −85 dBm, neutral if unavailable
- Remove the verbose recent-changes log; keep graphs for remaining gas (kg), battery (%) and RSSI (dBm)
- Add three **disabled**, localized future-action placeholders: Refill tank shown only below 10% gas, Recalibrate Scale and Settings Only under Diagnostics
- No control operations or backend API/service calls added

**Validation:** JavaScript syntax and 18 simulated component checks passed. Real Home Assistant testing is pending. Main remains unchanged.


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
