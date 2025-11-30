FROM oven/bun:1 AS base

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    openssl \
    openssl-dev \
    openssl-libs-static \
    libc6-compat

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/

ENV CI=true
RUN bun install --frozen-lockfile

COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

RUN bun run db:generate
RUN bun run build:backend

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]