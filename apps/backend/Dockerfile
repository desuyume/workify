FROM node:20-alpine AS base

RUN npm install -g pnpm@10.23.0

WORKDIR /app

COPY ../.. .

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm run db:generate && pnpm run build:backend

EXPOSE 8000

CMD ["node", "apps/backend/dist/main.js"]