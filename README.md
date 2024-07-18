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
  
* Create two databases in Postgres and edit DATABASE_URL and SHADOW_DATABASE_URL variables in .env file with your created data

* Install dependencies
```bash
pnpm install
```

* Build libs
```bash
pnpm run build:libs
```

* Start dev mode
```bash
pnpm run dev
```
* Visit https://localhost:3000
