FROM oven/bun:1 AS base

FROM base AS deps
WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package.json bun.lock ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Копируем зависимости
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/bun.lock ./

# Копируем исходный код
COPY apps/frontend/ ./apps/frontend/
COPY packages/ ./packages/

# Переменные для отключения линтеров
ENV NEXT_TELEMETRY_DISABLED=1
ENV DISABLE_ESLINT_PLUGIN=true
ENV ESLINT_NO_DEV_ERRORS=true

# Собираем приложение
RUN bun run build:frontend

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 nodejs
RUN adduser -D -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "apps/frontend/server.js"]