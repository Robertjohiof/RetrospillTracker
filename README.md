# RetrospillTracker

## Krav til å kjøre applikasjonen
* Node (Satt opp med på 22.19)
* PNPM (anbfefalt)


## Installasjon
1. Åpne terminal i rotmappen til prosjektet og kjør følgende kommando for å installerede node-modules:
```bash
pnpm install
```

2. Navngi **_env.txt_** filen i rotmappen til **_.env_**
3. Kjør følgende kommando for å generere **_.wrangler_** mappen:

```bash
pnpm dev:init
```

4. Kjør følgende kommando for å migrere den lokale databasen:
```bash
pnpm migrate:dev
```

4. Start lokalserveren:
```bash
pnpm dev
```

5. Gå til http://localhost:5173/seed i nettleseren for å populere databasen med testdata.

---
## Prosjektmedlemmer
| Profilbilde                                                                           | Navn               | GitHub brukernavn                                      |
|-------------------------------------------------------------------------------------------|--------------------|------------------------------------------------------|
| <img src="https://github.com/Lubbsaur.png" width="50" height="50"> | Anders Bergh       | [@Lubbsaur](https://github.com/Lubbsaur) |
| <img src="https://github.com/MaRoeIT.png" width="50" height="50">     | Marius Rørmark     | [@MaRoeIT](https://github.com/MaRoeIT)             |
| <img src="https://github.com/Robertjohiof.png" width="50" height="50">      | Robert Johannessen | [@Robertjohiof](https://github.com/Robertjohiof)               |
| <img src="https://github.com/Sell-Mango.png" width="50" height="50">   | Kjell-Magne Larsen | [@Sell-Mango](https://github.com/Sell-Mango)         |

