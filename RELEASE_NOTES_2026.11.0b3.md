# Senso4s Card 2026.11.0b3 — beta

Release date: 2026-11-07

## What's changed
- Mini and Standard use the actual Senso4s integration LOW threshold from `binary_sensor.*_low_gas.attributes.threshold` (5–50%; default 10%).
- `low_gas=on` triggers LOW, while `off` is authoritative and is never overruled by a fixed 10% rule.
- Missing/unavailable LOW uses the available threshold attribute, falling back to 10% only if needed.
- Both card sizes use the same bottle colors: red LOW, orange until threshold+10%, blue from threshold+10%, grey for missing level.
- LOW text and disabled Refill both follow the same decision, regardless of configured LOW threshold.
- New DEMO modes: 15%-threshold at 15% (LOW/red), 20% (amber), 25% (blue). Existing 30% LOW preview now has threshold 30%.
- No changes to the integration configuration or real sensor data. The card stays read-only.

## Practical checks
1. Install this prerelease via HACS (never dev); refresh cache.
2. In Mini and Standard, choose `Tröskeltest · LOW vid 15 % (15 %)`: expect red + LOW text, and Refill if quick actions are enabled.
3. `Tröskeltest · Orange över 15 % (20 %)`: orange bottle, no LOW or Refill.
4. `Tröskeltest · Blå över 15 % (25 %)`: blue bottle, no LOW or Refill.
5. `Färgtest · Låg gasol-varning vid 30 %`: red LOW and Refill even at 30%.
6. Switch test device back to Off / real Senso4s after checking.

`main` remains on the previous stable release pending user acceptance.
