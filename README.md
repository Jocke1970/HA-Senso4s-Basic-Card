# Senso4s Card (Basic + Plus)

A standalone, read-only Home Assistant Lovelace card for **Senso4s Basic and Plus Bluetooth gas cylinder scales**. The same custom card automatically adapts to the connected model.

**Stable release: 0.1.3 (2026-11-03).** Native Home Assistant visual configuration, Swedish/English UI, matching Mini/Standard default widths and optional **disabled** quick-action placeholders. Real refill and calibration operations are not yet implemented.

## Beta 0.1.5b7 — Mini color test scenarios

**Released to `beta` for installation and practical testing; never install `dev` on Home Assistant.** The visual editor provides seven additional DEMO scenes for Mini: blue (20%), amber (15%), red (8%), grey (missing gas/battery/BLE values), a forced low-gas warning at 30%, and warning/critical battery and BLE signals. All samples are contained in the card; no device commands, real state changes or Recorder calls.

**Practical tests:** Select `Card size: Mini`, then choose each `Color test` under `Test device`. Verify the cylinder color and icons. Restore `Test device: Off – real Senso4s` after testing. Color boundaries 10/11/19/20% are covered by frontend regression tests.

## Development preview — 0.1.5b6 labeled history charts

**Dev only.** The Standard history view now draws a numeric Y axis and horizontal reference lines for gas mass, battery percentage, and Bluetooth signal, plus date/time markers on the X axis. For gas mass, the Y axis starts at zero and uses the reported cylinder capacity (e.g., 0–10 kg for P10); it expands if a historical measurement exceeds that capacity. The small number range above the chart still shows **observed minimum–maximum**, not the axis limits. Recorder data stays unchanged, and the weight graph remains a discrete step plot. There are no new language strings, Lovelace options, or HACS resources.

## Development preview — 0.1.5b5 diagnostic states and multi-language source files

**Dev only; beta and main remain unchanged.** Plus diagnostics hide disabled/missing optional entities, show **Problem** with a clear explanation for entities explicitly marked `unavailable`, and show neutral unknown indicators for active entities in state `unknown`. An entirely disabled Plus diagnostics set displays a short localized explanation instead of four empty tiles. The visual editor adds a synthetic `plus_unavailable` scenario.

Translations are maintained in `translations/en.json`, `sv.json`, `es.json`, and `fi.json`. Run `node scripts/build.mjs` to generate the existing one-file `senso4s-basic-card.js` HACS resource. The generated resource is **committed**; CI runs `node scripts/build.mjs --check` to prevent drift. The build requires Node.js 18+ (no extra dependencies). Existing `custom:senso4s-basic-card`, dashboard YAML and `/local/senso4s-basic-card.js` remain unchanged. `language: auto` respects supported HA locales and falls back to English for others (including Greek and Chinese until translated). Use `language: es` or `fi` to override.

Test the new Plus unavailable and disabled scenarios visually in Home Assistant before promoting dev to beta.

## Development preview — 0.1.5b4 Basic / Plus + simulated scale

**Status: dev only; the updated Mini layout still needs visual confirmation in Home Assistant.** The stable release on `main` is still 0.1.3. This is a read-only frontend build; it does not call Senso4s services or alter any real cylinder's values.

The same custom element, `custom:senso4s-basic-card`, now auto-detects **Basic** or **Plus** and uses a model-specific UI without changing the saved dashboard entity selector or resource path. Existing Basic cards are backward-compatible.

- Primary model source: `usage_mode` sensor attribute `is_plus_model` (the integration already publishes it).
- Fallback: the selected scale's Home Assistant entity/device registry model, `Senso4s BASIC` or `Senso4s PLUS`.
- Optional Plus anomaly sensors are **not used to decide whether a device is Plus**; model recognition still works if they are disabled.
- Plus Standard diagnostics expand to four extra indicators: overall anomaly, temperature anomaly, tilt anomaly and motion anomaly. Disabled/missing entities are shown as **unknown/disabled**, never green/healthy.
- Plus Mini remains a compact row, with a small `PLUS` label (`PLUS !` when the aggregate **or any individual** anomaly entity reports `on`).
- Plus warnings are visible even if the aggregate anomaly entity is disabled, as long as an individual anomaly entity reports `on`.
- The Standard header title automatically changes to `Senso4s Plus` if no custom title was supplied. Existing custom titles are preserved.
- Both **the SENSO logo and the gas-cylinder icon** appear side by side in Mini; Standard keeps the SENSO logo in the header. Swedish/English translations, the Basic view, history charts and disabled Refill/Calibration placeholders are retained.

### Mini gas cylinder color states (dev 0.1.5b4)

The Mini row now shows **SENSO + gas cylinder** next to the gas weight. The cylinder uses the integration's `low_gas` flag when available, with simple gas-level fallbacks:

- **Blue** for 20–100% gas remaining and no low-gas warning
- **Amber** for 11–19% remaining
- **Red** at 10% or less, or whenever the integration's `low_gas` binary sensor is `on` (including a custom low-gas threshold)
- **Neutral grey** for missing, unknown or out-of-range level data

The icon color is a UI status hint, not proof of a newly received physical weighing. These colors change only the Mini icon. The refill action threshold and all real-device behavior remain unchanged. On narrow cards, the two icons shrink while maintaining the same Section-width setting.

### Test a fictitious Senso4s without real hardware

Open the card's built-in visual editor and change **Test device (preview only)** to one of the simulated modes. Or temporarily add a separate manual card:

```yaml
type: custom:senso4s-basic-card
size: standard
language: sv
demo_mode: plus
show_diagnostics: true
```

Select `demo_mode` as follows:

| Value | Synthetic model | Expected result |
|---|---|---|
| `off` (default) | Real scale | All values come from Home Assistant |
| `basic` | Basic | Basic layout without Plus diagnostics |
| `plus` | Plus | Four healthy Plus indicators |
| `plus_warning` | Plus | An active overall/tilt anomaly with warning styling |
| `plus_disabled` | Plus | All optional anomaly entities missing; no false-green status |

Test data (e.g., 6.80 kg gas remaining and 84% battery), dates and histories live **only inside this card's JavaScript**. Nothing is written to HA's state or device registry; no real entities are created and no device commands or Recorder requests are made in preview mode. Every preview displays a clear **DEMO** banner. Set `demo_mode: off` or remove the option to return to the real scale.

**Demo history label:** In demo mode, the history panel explicitly says that the graph contains synthetic sample data and never claims the values came from Home Assistant Recorder. In real-device mode, the standard Recorder attribution remains.

Never install the `dev` branch in Home Assistant. Run automated checks in `dev` and install only the promoted `beta` resource at `/config/www/senso4s-basic-card.js` for practical testing. Keep `/local/senso4s-basic-card.js` as the existing dashboard resource and refresh the browser cache.

**Validation so far:** JavaScript syntax checks and 71 frontend simulation tests passed. Live HA visual confirmation and CI status are separate release gates. Continue `dev → beta → main` only after reviewing Mini, Standard, warning, and disabled-entity states.

## Development preview — 0.1.4b1 original SENSO branding

The `dev` branch embeds a 128 × 128 PNG cleaned from the user's **original SENSO logo**. In 0.1.5b4, **Mini shows both the SENSO logo and the gas-cylinder icon** next to each other, while Standard retains the logo in its header. The original dark lettering and lime accent remain unchanged.

Because the image is embedded in `senso4s-basic-card.js`, no extra `/local/` asset, external URL or new dashboard resource is needed. The original artwork is bundled into the generated JavaScript resource. Install only from `beta` or `main`, never `dev`.

This branding-only note documents the earlier 0.1.4b1 preview. The current 0.1.5b4 Mini uses two icons together, without affecting the Basic/Plus identification or the synthetic previews.

## Visual card editor — stable 0.1.3

Home Assistant's **Edit dashboard → Edit card** dialog now includes a native visual editor for Senso4s Basic Card, without requiring YAML editing. The editor is included in the [stable `main` card file](https://github.com/Jocke1970/HA-Senso4s-Basic-Card/blob/main/senso4s-basic-card.js), and works with Home Assistant's built-in live card preview.

The editor provides:

- Title field
- Senso4s scale selector (auto-detects a single scale or selects a particular `gas_remaining` entity)
- Card size selector: **Mini** or **Standard**
- Toggle for disabled quick-action icon placeholders (`show_actions`)
- UI language: automatic, Swedish or English
- Standard-only controls for showing History and Diagnostics, and the History window in hours (1–720)

Settings are sent back to Home Assistant as normal Lovelace card configuration, so the dashboard's built-in preview updates while editing. Switching to Mini hides the Standard-only controls without discarding their saved values. The editor preserves unknown/advanced YAML options when changing known settings; the YAML editor remains available in Home Assistant.

**Install/update:** use the [stable file](https://github.com/Jocke1970/HA-Senso4s-Basic-Card/blob/main/senso4s-basic-card.js) at `/config/www/senso4s-basic-card.js`. Keep the dashboard resource as `/local/senso4s-basic-card.js`, without `?v=`. If needed, clear browser cache using Chromium Developer Tools (**F12** → right-click reload → **Empty cache and hard reload**).

**Validation:** 49 simulated checks passed. Both card sizes, the visual editor and the full-width Mini layout were visually checked in Home Assistant. The new disabled quick-action placeholders still await a visual check.

## Card width and planned quick actions

In Home Assistant Sections layouts, Mini and Standard both request **12 columns** by default. Mini remains a short, single-row card. You can adjust widths in Home Assistant's **Layout** tab.

Older saved `grid_options` may override the default. Set the layout to full width, or use:

```yaml
grid_options:
  columns: 12
  rows: auto
```

In an ordinary `vertical-stack`, Mini follows the stack's available width.

To display quick-action placeholders in Mini, enable `show_actions` in YAML or the visual editor:

```yaml
type: custom:senso4s-basic-card
size: mini
show_actions: true
```

Both icons appear between gas weight and battery/Bluetooth. **They are disabled and perform no device commands.**

- **Refill:** only shown when Senso4s reports a gas level strictly below 10%; not shown for unknown/unavailable values
- **Calibrate:** shown whenever actions are enabled; warns visually when calibration is required
- Mini continues to show no numerical battery or Bluetooth readings
- Without `show_actions`, Mini remains unchanged with no quick-action buttons, and Standard retains its existing disabled placeholders. Explicit `show_actions: false` hides the placeholders in either size

Actual Refill and Calibrate features are reserved for future development, after backend support and confirmation safeguards have been verified.

## Card sizes

Choose either layout using `size`. Existing cards continue to use `standard` if no size is specified.

**Mini** — SENSO logo plus dynamically colored gas-cylinder icon, remaining gas mass, and dynamic battery/Bluetooth colors (no numbers for battery or RSSI, no history or diagnostics):

```yaml
type: custom:senso4s-basic-card
size: mini
entity: sensor.senso4s_gas_sensor_5d32_gas_remaining
```

**Standard** — full card with optional sections:

```yaml
type: custom:senso4s-basic-card
size: standard
show_history: true
show_diagnostics: false
```

Both visibility options default to `true`. You can hide both sections for a top-overview-only standard card, or show either one individually. In mini mode they are always hidden, but the configuration is retained if you switch back to standard. Mini advertises the same twelve-column default width as Standard in Sections layouts.

To hide both sections in standard mode:

```yaml
type: custom:senso4s-basic-card
size: standard
show_history: false
show_diagnostics: false
```

Use actual YAML booleans (`true`/`false`, not quoted strings). The resource path is always `/local/senso4s-basic-card.js`; no version query string is needed.

## Features

- Standard layout: gas amount (kg) beside the fill-level cylinder (%), plus small battery and Bluetooth/RSSI indicators
- Mini layout: a single, compact Mushroom-style row with a cylinder icon, gas mass and color-only battery/Bluetooth icons (no numeric battery/RSSI)
- A visual cylinder gauge
- Diagnostics expander with separate timestamps for **last processed BLE data** and **last Home Assistant weight change**
- Optional Home Assistant Recorder graphs for remaining gas (kg), battery (%) and signal strength (dBm); no noisy change log
- Estimated-empty date between the remaining mass and battery/RSSI indicators when the integration supplies a timestamp
- Battery icon color: green at 20% or higher, yellow at 10–19%, red below 10%; no reading shows neutral
- Bluetooth icon color (approximate heuristic): green at −70 dBm or better, yellow from below −70 through −85 dBm, red below −85 dBm; no reading shows neutral
- Disabled **Refill tank** placeholder shown only when the reported gas level is below 10%
- Disabled **Recalibrate Scale** and **Settings Only** placeholders in the Diagnostics expander
- Diagnostics: BLE processing and weight-change timestamps, plus a symmetric two-column, four-tile grid (usage mode, error, calibration and low-gas), each with a bold centered heading and a centered icon below it. Cylinder capacity is omitted from the card.
- Diagnostic status icons: green checkmark for explicitly inactive warnings, red for active error/low gas, yellow for calibration required, neutral question mark when unknown/unavailable
- Icons include localized accessible labels/tooltips; usage-mode color indicates category, not a fault
- Swedish and English UI, using Home Assistant's language by default
- Supports different device addresses and multiple Senso4s scales via configurable entity
- No dependency on the Wecamp heater, YAML packages, or third-party JS libraries
- Read-only: the card never sends service calls or writes to the gas scale. **All three future-action buttons are disabled placeholders in 0.1.2.**

### Important: BLE freshness versus actual weighing

A fresh BLE packet can repeat the previous mass; it **does not prove that the scale performed a new physical weighing**. Likewise, `last_changed` reflects when Home Assistant recorded a changed entity state, not necessarily the scale's internal weighing time.

## Installation

Install the stable JavaScript file from `main`:

1. Copy [senso4s-basic-card.js](https://github.com/Jocke1970/HA-Senso4s-Basic-Card/blob/main/senso4s-basic-card.js) to `/config/www/senso4s-basic-card.js`.
2. In **Settings → Dashboards → Resources**, add `/local/senso4s-basic-card.js` as a **JavaScript module**.
3. Reload the dashboard after updating the card file. If Chromium still shows an older version, open Developer Tools with **F12**, then hold or right-click Reload and select **Empty Cache and Hard Reload**.
4. Add a **Manual** card with the following YAML:

```yaml
type: custom:senso4s-basic-card
title: Senso4s Basic
language: auto
history_hours: 168
```

If Home Assistant has **more than one** Senso4s scale, specify the weight sensor for the desired device:

```yaml
type: custom:senso4s-basic-card
title: Gas cylinder
entity: sensor.senso4s_gas_sensor_5d32_gas_remaining
language: en
history_hours: 168
```

The example entity is specific to one device; use your own `gas_remaining` entity ID. With only one scale, `entity` may be omitted.

## Translations

The card supports **Swedish** (`sv`) and **English** (`en`). Both language dictionaries are embedded in `senso4s-basic-card.js` so only one JavaScript resource needs to be installed; there are no separate language JSON files. The dictionaries have matching keys and include all labels for status icons, the estimated-empty date, diagnostics and future action buttons. With `language: auto`, the card follows Home Assistant's language setting.

## Planned actions (not operational)

The three buttons are intentionally **disabled** in release 0.1.2. They are not wired to the Senso4s integration, and clicking/tapping them cannot refill, recalibrate or open settings. The refill action is hidden when the gas level is unavailable or 10% and above. We will evaluate supported backend operations and safeguards in a later beta before enabling any of them.

## Configuration

| Option | Default | Description |
|---|---|---|
| `type` | required | `custom:senso4s-basic-card` |
| `title` | `Senso4s Basic` | Card heading |
| `entity` | auto-detect | `sensor.…_gas_remaining` for the chosen scale |
| `language` | `auto` | `auto`, `sv`, or `en` |
| `history_hours` | `168` | Recorder history window, 1–720 hours |
| `show_history` | `true` | Show History in standard mode |
| `size` | `standard` | `mini` for a Mushroom-like tile; `standard` for the full card |
| `show_diagnostics` | `true` | Show Diagnostics in standard mode |
| `show_actions` | `false` (Mini), `true` (Standard) | Show disabled quick-action placeholders; Standard keeps existing buttons by default |

When history is opened, the card uses the built-in Home Assistant history API. Recorder must include the selected entities. Missing optional entities display as unavailable.

## HACS / Home Assistant Marketplace

The repository includes `hacs.json` with an explicit filename and supports installation as a **Dashboard** custom repository in HACS. The `main` branch contains stable `0.1.3`. The manual installation instructions above also work without HACS.

## Development and releases

Changes move through **`dev → beta → main`**.

- `dev`: feature work
- `beta`: candidate builds for Home Assistant testing
- `main`: approved stable builds only

See [CHANGELOG.md](CHANGELOG.md) for changes.

## License

[MIT](LICENSE).
