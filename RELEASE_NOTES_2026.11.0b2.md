# Senso4s Card 2026.11.0b2 (beta)

Released 2026-11-07.

- When integration `low_gas` reports `on`, Mini shows a red gas cylinder and a visible localized LOW warning, even above 10%.
- Standard shows LOW in red status, red bottle, and existing warning banner.
- Refill is now shown in both sizes during LOW when quick actions are enabled. It stays disabled and cannot change any gas data.
- Percent <=10% is also LOW as a fallback. An unavailable percent with no LOW flag is neutral.

Test `mini_low_gas` in Mini and Standard at 30%. Also check red (8%), amber (15%), neutral missing data, and return Demo to Off. Install beta only; main unchanged.
