# Senso4s Card

A read-only Home Assistant Lovelace card for **Senso4s Basic and Senso4s Plus** Bluetooth gas-cylinder scales. The card is called **Senso4s Card** regardless of which model is connected.

**Current beta candidate: 2026.11.0b3 (7 November 2026)** · Stable `main`: 2026.11.0.

## Install and upgrade

**Install from `beta` for testing, or `main` for the existing stable release. Never install from `dev`.**

For the renamed beta, the preferred HACS resource is `senso4s-card.js`. In Home Assistant, make sure the dashboard resource points to:

```text
/local/senso4s-card.js
```

and create a card with:

```yaml
type: custom:senso4s-card
size: standard
language: auto
history_hours: 168
show_history: true
show_diagnostics: true
```

## Card features

- **Mini:** compact row with SENSO logo, color-coded cylinder, kg and status icons. LOW produces a clear red warning text and an emphasized disabled Refill placeholder (if actions are enabled).
- **Standard:** remaining gas, battery and RSSI, expandable history and diagnostics. LOW makes the status and bottle red, shows warning text and offers the disabled Refill placeholder when actions are enabled.
- **Basic and Plus:** automatic model detection using the integration's `usage_mode.attributes.is_plus_model`, with device-registry fallback. Plus adds anomaly, temperature, tilt and motion diagnostics when their entities are available.
- **Honest data freshness:** last BLE receipt and last HA weight change are separate; neither is proof of a fresh physical weighing.
- **Recorder history:** gas-mass step chart, battery and RSSI graphs with numerical Y axes, gridlines, date labels, and scales appropriate to each measurement. Real-device history comes from Home Assistant Recorder.
- **Languages:** Swedish, English, Spanish and Finnish; choose manually or use the HA locale via `language: auto`.
- All device functions are **read-only**. Calibration and refill buttons are disabled placeholders, not service calls.

## Safe visual test scenes

In the visual editor, select a card size and use **Test device (preview only)**. Synthetic data stays inside the card. No real entities, Recorder history, or service calls are changed.

| Demo mode | Purpose |
|---|---|
| `basic`, `plus` | Normal Basic / Plus rendering |
| `plus_warning` | Plus tilt warning |
| `plus_disabled` | Plus extra sensors disabled |
| `plus_unavailable` | One Plus sensor unavailable |
| `mini_blue` | Blue cylinder at 20% |
| `mini_amber` | Amber cylinder at 15% |
| `mini_red` | Red cylinder at 8% |
| `mini_neutral` | Grey cylinder with missing values |
| `mini_low_gas` | Red at 30% due to low-gas warning flag |
| `mini_icons_warn` | Battery/BLE warning |
| `mini_icons_critical` | Battery/BLE critical |

To finish, set `demo_mode: off` (or choose the real device in the editor). DEMO values do not represent the actual cylinder.

## Contribute a translation

Want Senso4s Card in another language? You can help by creating a translation file:

1. Copy [`translations/en.json`](translations/en.json) to a new file, for example `translations/de.json`.
2. Translate the **text values** into your language. Keep all JSON keys and any placeholders unchanged; save the file as UTF-8.
3. Open a pull request with your new language file. The language also needs to be registered in the build script and the card's language selector before it can be included in a release.

Translations are **bundled into `senso4s-card.js`**. Copying a JSON file into Home Assistant does not automatically enable the language.

## Build and validation

The single-file card is built from `src/senso4s-card.template.js` plus `translations/{en,sv,es,fi}.json`. The build produces the bundled JavaScript module used by the dashboard.

```bash
node scripts/build.mjs
node scripts/build.mjs --check
node --check senso4s-card.js
node --test tests/*.test.cjs
```

GitHub Actions runs these checks on pushes to `dev`, `beta` and `main`. Follow **dev → beta → main**: code is developed and tested in `dev`, installed for practical testing no earlier than `beta`, then promoted to `main` after acceptance.

## Dynamic LOW threshold (2026.11.0b3)

The card follows the integration's `low_gas` sensor state and its `threshold` attribute. The integration permits 5–50% (default 10%). A sensor state `on` forces red LOW, warning text and visible disabled Refill (if quick actions are enabled); an explicit `off` remains authoritative and is never overridden by a local 10% rule. If LOW is missing, unknown or unavailable, the card compares a valid percentage with the threshold attribute, or 10% as a final fallback. Invalid/missing level without active LOW is neutral.

Both Mini and Standard now follow the same color bands: **red at LOW**, **orange above LOW but below threshold + 10 percentage points**, **blue from threshold + 10 and above**. Inconsistent data (LOW off but level below threshold) stays non-red. The standard bottle fill follows these colors too.

Three safe synthetic scenes demonstrate threshold 15%: at 15% red LOW, 20% orange and 25% blue. The existing 30% LOW preview now exposes `threshold: 30` to match. These previews never update real HA states or settings.

## Version convention

Starting now:

- Beta: `YYYY.MM.patchbN`, for example `2026.11.0b1`.
- Stable: `YYYY.MM.patch`, for example `2026.11.0`.

See [release notes](RELEASE_NOTES_2026.11.0b3.md) and [changelog](CHANGELOG.md). An explicit release request on `beta` publishes a GitHub prerelease only after release-specific tests pass.
