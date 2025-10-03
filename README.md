# RetrospillTracker

## Krav til å kjøre applikasjonen
* Docker engine
* Node (Satt opp med på 22.19)

Kjør følgende kommando i rot:
```bash
docker compose up --build
```

vis denne feiler så kan det hende du først må slette node_modules og lock filen. Deretter installere og prøve å starte serveren med uten docker. Dette for å få laget ".wrangler" mappen.

Med pnpm:
```bash
pnpm install
pnpm run dev
```

Med npm:
```bash
npm install
npm run dev
```

Deretter prøver å starte med docker igjen.
```bash
docker compose up --build
```
