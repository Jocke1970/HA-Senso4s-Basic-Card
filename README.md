# Senso4s Card (Basic + Plus)

A standalone, read-only Home Assistant Lovelace card for **Senso4s Basic and Plus Bluetooth gas cylinder scales**. The same custom card automatically adapts to the connected model.

**Stable release: 0.1.3 (2026-11-03).** Native Home Assistant visual configuration, Swedish/English UI, matching Mini/Standard default widths and optional **disabled** quick-action placeholders. Real refill and calibration operations are not yet implemented.

## Development preview — 0.1.5b1 Basic / Plus + simulated scale

**Status: dev only; not yet visually tested on a live Home Assistant dashboard.** The stable release on `main` is still 0.1.3. This is a read-only frontend build; it does not call Senso4s services or alter any real cylinder's values.

The same custom element, `custom:senso4s-basic-card`, now auto-detects **Basic** or **Plus** and uses a model-specific UI without changing the saved dashboard entity selector or resource path. Existing Basic cards are backward-compatible.

- Primary model source: `usage_mode` sensor attribute `is_plus_model` (the integration already publishes it).
- Fallback: the selected scale's Home Assistant entity/device registry model, `Senso4s BASIC` or `Senso4s PLUS`.
- Optional Plus anomaly sensors are **not used to decide whether a device is Plus**; model recognition still works if they are disabled.
- Plus Standard diagnostics expand to four extra indicators: overall anomaly, temperature anomaly, tilt anomaly and motion anomaly. Disabled/missing entities are shown as **unknown/disabled**, never green/healthy.
- Plus Mini remains a compact row, with a small `PLUS` label (`PLUS !` when the aggregate **or any individual** anomaly entity reports `on`).
- Plus warnings are visible even if the aggregate anomaly entity is disabled, as long as an individual anomaly entity reports `on`.
- The Standard header title automatically changes to `Senso4s Plus` if no custom title was supplied. Existing custom titles are preserved.
- SENSO logo, Swedish/English translations, current Basic view, history charts, and disabled Refill/Calibration placeholders are retained.

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

To visually test the `dev` version, install/update [senso4s-basic-card.js from dev](https://github.com/Jocke1970/HA-Senso4s-Basic-Card/blob/dev/senso4s-basic-card.js) at `/config/www/senso4s-basic-card.js` and keep your existing resource at `/local/senso4s-basic-card.js`. Refresh the browser cache. Do not use this pre-release for production monitoring.

**Validation so far:** JavaScript syntax checks and 65 frontend simulation tests passed. Live HA visual confirmation and CI status are separate release gates. Continue `dev → beta → main` only after reviewing Mini, Standard, warning, and disabled-entity states.

## Development preview — 0.1.4b1 original SENSO branding

The `dev` branch now embeds a transparent 128 × 128 PNG cropped/cleaned from the user's **original SENSO logo**. It replaces the blue gas-cylinder placeholder icon in the **Standard header** and **Mini tile**. The original dark lettering, lime accent and white round tile are preserved without generated shadows or gray patches.

Because the image is embedded in `senso4s-basic-card.js`, no extra `/local/` asset, external URL or new dashboard resource is needed. Use the [dev JS file](https://github.com/Jocke1970/HA-Senso4s-Basic-Card/blob/dev/senso4s-basic-card.js) only for testing; `beta` and stable `main` remain on their previous release until approved.

This branding-only note applies to 0.1.4b1; the later 0.1.5b1 preview also adds Basic/Plus layouts and the synthetic test scenarios above.

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

**Mini** — single-row gas-cylinder icon, remaining gas mass, and dynamic battery/Bluetooth colors (no numbers for battery or RSSI, no history or diagnostics):

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
