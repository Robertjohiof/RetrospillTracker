# RetrospillTracker

En portal for videospill entusiaster og samlere.

## Krav til å kjøre applikasjonen
* Node (Satt opp med på 22.19)
* PNPM (anbfefalt)


## Installasjon
1. Åpne terminal i rotmappen til prosjektet og kjør følgende kommando for å installerede node-modules:
```bash
pnpm install
```

2. Navngi **_env.txt_** filen i rotmappen til **_.env_**

### Kjøre remote eller lokal database.
Som standard leser applikasjonen data direkte fra D1 databasen gjennom en worker proxy, men kan enkelt bytte til lokal dersom ekstern kontakt ikke oppnås.

3. Kjør følgende kommando for å generere **_.wrangler_** mappen og starte dev serveren.:

```bash
pnpm dev
-- eller --
npm run dev
```

4. Når applikasjonen har startet, test følgende URL for å sjekke at APIet fungerer: http://localhost:5173/api/v1/users
----
### Hvis APIet ikke returnerer brukere i databasen

1. Bytt til å lese fra lokal database ved å gå endre **USE_REMOTE_DB** fra _true_ til _false_ i .env filen.
2. Terminer applikasjonen, og kjør følgende kommandoer i terminalen

```bash
pnpm migrate:nev
pnpm migrate:dev
```

3. Start lokalserveren igjen:
```bash
pnpm dev
```

4. Gå til http://localhost:5173/seed i nettleseren for å populere databasen med testdata.

---
## Prosjektmedlemmer
| Profilbilde                                                                           | Navn               | GitHub brukernavn                                      |
|-------------------------------------------------------------------------------------------|--------------------|------------------------------------------------------|
| <img src="https://github.com/Lubbsaur.png" width="50" height="50"> | Anders Bergh       | [@Lubbsaur](https://github.com/Lubbsaur) |
| <img src="https://github.com/MaRoeIT.png" width="50" height="50">     | Marius Rørmark     | [@MaRoeIT](https://github.com/MaRoeIT)             |
| <img src="https://github.com/Robertjohiof.png" width="50" height="50">      | Robert Johannessen | [@Robertjohiof](https://github.com/Robertjohiof)               |
| <img src="https://github.com/Sell-Mango.png" width="50" height="50">   | Kjell-Magne Larsen | [@Sell-Mango](https://github.com/Sell-Mango)         |

