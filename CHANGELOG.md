# Changelog

## 0.1.3 — 2026-11-03 (stable)

- Mini now requests the same 12-column default width as Standard in Home Assistant Sections layouts while retaining its compact single-row height
- Add `show_actions` in YAML and the visual editor for disabled quick-action placeholders
- When Mini actions are enabled, show a disabled Calibrate icon; show disabled Refill only when gas level is strictly below 10%
- Calibration icon gets warning styling if the scale flags calibration as necessary
- Backward compatible defaults: Mini has no action icons unless enabled; Standard retains its existing disabled placeholders unless explicitly hidden
- Swedish and English translations remain synchronized (66 entries each)
- No service calls or device actions are added. Real Refill/Calibrate functionality will be implemented and reviewed separately

**Verification:** JavaScript syntax and 49 simulated frontend checks passed. Mini, Standard, the visual editor, and the matching card widths were visually confirmed in Home Assistant. The new disabled action placeholders still await direct visual verification.


## 0.1.3b2 — 2026-11-03

- Add disabled **Refill** and **Calibrate** icon buttons to Mini, positioned between gas weight and battery/Bluetooth status
- Refilling placeholder appears only when gas level is strictly below 10%; calibration placeholder appears when actions are enabled and receives warning styling if calibration is needed
- Add `show_actions: true|false` in YAML and the native visual card editor, localized in Swedish and English
- Keep previous appearance by default: Standard shows its existing placeholders; Mini has none unless opted in
- Allow hiding Standard's existing disabled action buttons with `show_actions: false`
- Add accessibility labels, neutral inactive styling, and safeguard that no frontend service calls or state-changing actions are performed
- Preserve full-width Mini layout and existing Mini/Standard sensors, history, localization and visual editor

**Validation:** JavaScript syntax and 49 simulated frontend tests passed. HA dashboard verification pending. `main` remains stable 0.1.2.


## 0.1.3b1 — 2026-11-03

- Change Mini's default Sections grid width from 6 to 12 columns, matching Standard while keeping Mini's compact one-row content
- Allow Home Assistant's Layout tab or explicitly saved `grid_options` to choose a narrower width when desired
- No changes to sensor readings, languages, visual editor, disabled buttons, or card behavior beyond the layout default
- Document how to update previously saved 6-column configurations

**Validation:** JavaScript source syntax and 42 simulated frontend tests passed. Home Assistant layout verification is still pending; `main` remains stable 0.1.2.


## 0.1.2 — 2026-11-03 (stable)

- Promote the native Home Assistant visual card editor after real-dashboard testing
- Edit title, detected Senso4s scale, Mini/Standard size, UI language and optional History/Diagnostics without hand-writing YAML
- Show history-hours input only when relevant; retain settings when switching to Mini
- Update Lovelace's preview via complete `config-changed` events; keep manual YAML editing available
- Preserve all existing sensor display, color logic, and disabled future-action placeholders
- Swedish and English translations verified complete and synchronized (64 keys each)

**Release verification:** JavaScript syntax and 41 simulated frontend tests passed, including editor configuration changes. User verified the editor visually in Home Assistant, with both languages, card sizes and section visibility. Released using `dev → beta → main`.


## 0.1.2b1 — 2026-11-03

- Add a native Home Assistant visual card editor through `getConfigElement()`
- Select a Senso4s scale from detected `gas_remaining` sensors, or choose automatic selection
- Configure card title, Mini/Standard size, Swedish/English/automatic UI, History and Diagnostics visibility, and Recorder history hours (1–720)
- Standard-only settings are hidden in Mini while their saved values remain intact
- Send `config-changed` with the complete Lovelace configuration and preserve custom/unknown fields
- Provide visual configuration in the HA card editor while retaining manual YAML mode
- Preserve read-only sensor UI; no service calls or actions to the scale
- Update English documentation and add editor test coverage

**Validation:** JavaScript syntax and 41 simulated tests passed. Home Assistant's actual edit-card dialog and live preview still require manual UI verification. `main` remains stable 0.1.1.


## 0.1.1 — 2026-11-03 (stable)

- Introduce two Lovelace card sizes: `size: mini` for a single-row, Mushroom-style tile and `size: standard` (backward-compatible default)
- Mini shows a gas-cylinder icon, the latest gas weight and status-colored battery/Bluetooth icons **without numerical battery or RSSI readings**
- The mini tile omits gas percentage, estimated-empty date, expansion panels and footer
- Standard mode adds independent `show_history` and `show_diagnostics` boolean controls, defaulting to `true`
- A compact top-only standard card and either single-section combination are supported
- Read-only design retained: future refill, calibration and settings buttons remain disabled
- Swedish and English translation dictionaries remain synchronized (53 keys each)
- Resource path remains `/local/senso4s-basic-card.js` without a cache-busting query parameter

**Release verification:** 35 simulated component tests and JavaScript syntax passed; user visually verified mini layout and standard/optional-section layouts in Home Assistant. Changes promoted using `dev → beta → main`.


## 0.1.1b2 — 2026-11-03

- Add `size: mini` and `size: standard` configuration options; standard is the default, preserving existing cards
- Mini is a compact Mushroom-style single row with a gas-cylinder icon, remaining mass (kg) and color-only battery/Bluetooth status icons
- Mini does not show battery %, dBm, gas %, estimated-empty date, section toggles, extra controls or footer
- Mini follows existing color thresholds (battery green ≥20%, amber 10–19%, red below 10%; BT green ≥−70 dBm, amber down to −85 dBm, red below −85 dBm)
- Unavailable readings render neutral icons; no invented values
- Keep both collapsible sections and existing visibility flags in standard mode, with unchanged default behavior
- Advertise a smaller Sections layout grid width for mini, and retain read-only operation
- Add regression tests for mini/standard layouts, both language labels, status thresholds and configuration validation

**Validation:** JavaScript syntax and 35 simulated frontend tests passed. Real Home Assistant layout test pending. `main` remains at stable `0.1.0`.


## 0.1.1b1 — 2026-11-03

- Add `show_history` and `show_diagnostics` card configuration booleans, both enabled by default
- Support a compact top-overview-only mode by disabling both sections (and hiding the footer)
- Support History-only and Diagnostics-only layouts without affecting other modes
- Avoid Recorder API calls when History is disabled; invalidate pending requests on configuration changes
- Preserve existing behavior, read-only operation, disabled action placeholders and Swedish/English UI
- Add coverage for all four visibility combinations, validation, and history-load cancellation

**Validation:** JavaScript syntax and 29 simulated component tests passed. Real Home Assistant visual verification is pending; `main` remains at stable `0.1.0`.


## 0.1.0 — 2026-11-03 (stable)

First stable release of the standalone Senso4s Basic Lovelace card, based on the visually approved `0.1.0b7` beta.

- Compact cylinder overview showing gas remaining, percentage, estimated empty date and color-coded battery/Bluetooth status
- Symmetrical 2×2 diagnostics grid with bold centered labels and dynamic mode/error/calibration/low-gas icons
- Expandable Recorder graphs for gas remaining, battery and RSSI
- Swedish and English localization with matching embedded translation keys
- Auto-discovery for one scale, explicit selection when multiple scales are present
- `Refill tank`, `Recalibrate Scale` and `Settings Only` remain disabled future-action placeholders
- Read-only frontend with no Wecamp dependency and no backend control commands

**Validation:** User-verified Home Assistant layout, JavaScript syntax and automated/simulated frontend test coverage including translation parity. Stable assets are promoted through `dev → beta → main`.


## 0.1.0b7 — 2026-11-03

- Center each diagnostic tile's title and status icon horizontally
- Increase title font size and weight for quicker scanning
- Vertically align label/icon groups within four equal-height tiles in a 2×2 grid
- Preserve all existing frontend behavior; no backend changes or action handlers

**Validation:** JavaScript source syntax and 22 simulated frontend tests passed. Final Home Assistant visual acceptance required before promotion to `main`.


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
