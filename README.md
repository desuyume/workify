# Workify

Service for search and promotion of self-employed citizens

# Development

## Requirements

* [Node.js (21.7.3+)](https://nodejs.org/en)
* [Pnpm (9.1.2+)](https://pnpm.io/)

## Run project

* Clone repository
```bash
git clone https://github.com/desuyume/workify.git
```

* Create a .env file and transfer the data from .env.dev into it

* Install dependencies
```bash
pnpm install
```

* Run needed services (Postgres, Adminer)
```bash
docker compose -f docker-compose.dev.yml up -d
```

* Build packages
```bash
pnpm run build:packages
```

* Start dev mode
```bash
pnpm run dev
```
* Visit https://localhost:3000

* Run build on local
```bash
pnpm run build:local
```