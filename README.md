# Workify

Service for search and promotion of self-employed citizens

# Development

## Requirements

* [Node.js (21.7.3+)](https://nodejs.org/en)
* [Bun (1.3.3+)](https://bun.com)

## Run project

* Clone repository
```bash
git clone https://github.com/desuyume/workify.git
```

* Create a .env file and transfer the data from .env.dev into it

* Install dependencies
```bash
bun install
```

* Run needed services (Postgres, Adminer)
```bash
docker compose -f docker-compose.dev.yml up -d
```

* Start dev mode
```bash
bun dev
```
* Visit https://localhost:3000
