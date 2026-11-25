# Webstránka projektu Chess Journeys (`site/`)

Statická prezentačná stránka (`index.html`) a Zásady ochrany súkromia (`privacy.html`) pre verejnú Google Play verziu aplikácie **Chess Journeys** (dvojjazyčná EN/SK, bez externých závislostí, bez cookies a bez sledovania).

## Úprava pred zverejnením
- **Odkaz na Google Play**: v `site/index.html` uprav `href` pri tlačidle `#play-btn`.
- **Odkaz na dobrovoľnú podporu**: v `site/index.html` v sekcii `#support` odkomentuj pripravené tlačidlo a doplň vlastný odkaz (napr. Ko-fi, Buy Me a Coffee alebo PayPal.me).

## Nasadenie (zadarmo)
Priečinok `site/` obsahuje len čisté HTML bez buildu. Dá sa nasadiť priamo cez:
- **Cloudflare Pages** alebo **Netlify** (drag & drop priečinka `site/`),
- **Verejný GitHub Pages repozitár** (napr. `chess-journeys-site`),
- **Firebase Hosting** (ako samostatný web pre verejnú aplikáciu).

Do Google Play Console (časť *App content → Privacy policy*) potom vložíš priamu adresu na `.../privacy.html`.
