# Senso4s Card — beta 2026.11.0b1

Release date: 2026-11-07

The Senso4s Lovelace card supports Basic and Plus with a single product name and calendar-based version scheme.

### Changes
- Unified card name: **Senso4s Card**, including picker, editor default, footer, HACS metadata and console output.
- Primary card type: `custom:senso4s-card`; primary HACS file: `senso4s-card.js`.
- Backward-compatible old type `custom:senso4s-basic-card` and legacy JS file are retained.
- Beta uses `2026.11.0b1`; the stable version, after acceptance, will be `2026.11.0`.
- All previous Plus/Basic, color-demo, multi-language, historical graphs and diagnostics work remains included.

### Practical upgrade
1. Install beta; do not use dev.
2. Change Lovelace resource from `/local/senso4s-basic-card.js` to `/local/senso4s-card.js`. Load only one resource.
3. Saved card YAML with `type: custom:senso4s-basic-card` still works. Use `custom:senso4s-card` for new cards.
4. Refresh cache; verify footer **Senso4s Card · 2026.11.0b1** and real Basic/Plus data.
5. The old default title is normalized automatically, but explicit unrelated custom titles are preserved.

### Verification
- Automated checks on dev and beta: generated translation bundle, JavaScript syntax, component tests, HACS metadata and independence from Wecamp.
- Manual verification remaining: migrated HACS resource in actual Home Assistant, legacy type and new type, Mini color demos, real Basic and Plus simulations.
- `main` remains old stable 0.1.3 until approval.

### Repository
Repository renamed and verified: [Jocke1970/HA-Senso4s-Card](https://github.com/Jocke1970/HA-Senso4s-Card). The old Lovelace card type remains available only as a compatibility alias.
