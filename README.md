# Senso4s Basic Card

A standalone, read-only Home Assistant Lovelace card for **Senso4s Basic Bluetooth gas cylinder scales**.

**Stable release: 0.1.1 (2026-11-03).** Home Assistant-verified standard card and Mushroom-style mini card, with optional History and Diagnostics in standard mode. Controls for refill/calibration/settings remain disabled placeholders.

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

Both visibility options default to `true`. You can hide both sections for a top-overview-only standard card, or show either one individually. In mini mode they are always hidden, but the configuration is retained if you switch back to standard. The mini version advertises a smaller width in Home Assistant Sections layouts.

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
- Read-only: the card never sends service calls or writes to the gas scale. **All three future-action buttons are disabled placeholders in 0.1.1.**

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

The three buttons are intentionally **disabled** in release 0.1.1. They are not wired to the Senso4s integration, and clicking/tapping them cannot refill, recalibrate or open settings. The refill action is hidden when the gas level is unavailable or 10% and above. We will evaluate supported backend operations and safeguards in a later beta before enabling any of them.

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

When history is opened, the card uses the built-in Home Assistant history API. Recorder must include the selected entities. Missing optional entities display as unavailable.

## HACS / Home Assistant Marketplace

The repository includes `hacs.json` with an explicit filename and supports installation as a **Dashboard** custom repository in HACS. The `main` branch contains stable `0.1.1`. The manual installation instructions above also work without HACS.

## Development and releases

Changes move through **`dev → beta → main`**.

- `dev`: feature work
- `beta`: candidate builds for Home Assistant testing
- `main`: approved stable builds only

See [CHANGELOG.md](CHANGELOG.md) for changes.

## License

[MIT](LICENSE).
