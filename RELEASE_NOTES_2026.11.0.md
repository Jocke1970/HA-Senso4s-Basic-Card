# Senso4s Card 2026.11.0

**Stable release — 2026-11-07**

First production release of **Senso4s Card** for Senso4s Basic and Plus in Home Assistant, promoted from the user-tested `2026.11.0b3`.

## Highlights

- Mini and Standard layouts with a common card name and visual editor.
- Gas remaining, gas level, battery, Bluetooth RSSI and estimated empty date.
- Read-only Home Assistant Recorder history and honest BLE-data freshness indicators.
- Basic/Plus auto-detection and conditional Plus anomaly diagnostics.
- Swedish, English, Spanish and Finnish translations.
- Dynamic LOW threshold from the integration: red LOW + warning text + visible disabled Refill, orange above the configured LOW threshold until threshold+10, blue from threshold+10, neutral when unknown.
- Safe DEMO previews. No service calls or commands to the scale.

## Installing / upgrading

Install the stable release using HACS or download `senso4s-card.js` and register the Lovelace resource. See [README](README.md) for installation and configuration.

New cards: `type: custom:senso4s-card`. Existing `custom:senso4s-basic-card` YAML remains supported. When upgrading a manual installation, change the resource to `/local/senso4s-card.js` and avoid loading both old and new scripts.

The Refill/calibration/settings buttons are display-only placeholders and remain disabled.

## Quality gate

- Automated frontend regression suite on the stable version, generated bundle and syntax checks, HACS metadata validation.
- Practical acceptance completed on beta: Mini/Standard colors and threshold changes, LOW label and Refill, four languages, history graphs, Plus diagnostics and real Senso4s Basic data.

The first release is `2026.11.0` (stable, not prerelease).
