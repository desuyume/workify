FROM node:20-alpine AS base

RUN npm install -g pnpm@10.23.0

WORKDIR /app

COPY ../../package.json ./
COPY ../../pnpm-lock.yaml ./
COPY ../../apps/backend/ ./apps/backend/
COPY ../../packages/ ./packages/

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm run db:generate && pnpm run build:backend

EXPOSE 8000

CMD ["node", "apps/backend/dist/main.js"]