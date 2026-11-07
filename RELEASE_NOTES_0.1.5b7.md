# Senso4s Card 0.1.5b7 (beta) — 2026-11-07

## Omfattning
- Samma read-only Lovelace-kort för Senso4s Basic och Plus med nya Plus-diagnostiklägen.
- Mini har SENSO-logotyp och gasolflaska, vars färg följer gasolnivå/låg-gasolvarning.
- Språkstödet innehåller svenska, engelska, finska och spanska.
- Historik visar graderade Y-axlar, stödlinjer och tidsangivelser för gasol, batteri och RSSI.
- Plus-diagnostik skiljer mellan avaktiverade, okända och otillgängliga sensorer.
- Sju nya Mini-DEMO-lägen: mini_blue (20%), mini_amber (15%), mini_red (8%),
  mini_neutral (saknade värden), mini_low_gas (30% + varningsflagga),
  mini_icons_warn (15% batteri / -78 dBm) och mini_icons_critical (8% / -90 dBm).

## Teststatus
- GitHub Actions på dev: godkänt (testpaket, översättningsbygge, JavaScript och HACS metadata).
- Praktiska skärmbildskontroller gjorda av användaren: Plus Mini/Standard,
  saknade/otillgängliga Plus-sensorer, språk sv/en/es/fi samt verklig Basic och historik.
- Återstår i beta: Mini-färgernas sju nya lägen; därefter sista regression med real Basic.

## Praktisk testning (endast beta)
1. Hämta endast beta/senso4s-basic-card.js och uppdatera befintlig
   /config/www/senso4s-basic-card.js. Uppdatera webbläsarens cache.
2. I kortredigeraren välj Kortstorlek = Mini och Testenhet = ett av färgtesterna.
3. Kontrollera flaska och batteri/BLE-ikoner. Inga fiktiva värden ska skrivas till HA.
4. Återställ Testenhet = Av – riktig Senso4s efter kontrollen.
5. Kontrollera att riktiga Basic-värden och historik fungerar som innan.

## Förväntade färger
- 20%: blå; 15%: orange; 8%: röd; saknad nivå: grå.
- 30% + low_gas=on: röd trots att gasolnivån är över 10%.
- Batteri 15% / RSSI -78 dBm: varning; batteri 8% / RSSI -90 dBm: kritisk.

**Viktigt:** Testlägen är endast syntetiska förhandsvisningar.
De skapar inga HA-entiteter, skriver inga sensorvärden, anropar inga
servicefunktioner och hämtar ingen verklig Recorder-historik.

main = stabil 0.1.3 (orörd).
