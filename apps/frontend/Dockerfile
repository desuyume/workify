FROM oven/bun:1 AS base

FROM base AS deps
WORKDIR /app

# Копируем ВСЕ необходимые файлы для workspace разрешения
COPY package.json bun.lock* turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/
COPY tsconfig.json ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Копируем зависимости и конфигурационные файлы
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/bun.lock* ./
COPY --from=deps /app/turbo.json ./

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

# Копируем собранное приложение
COPY --from=builder /app/apps/frontend/.next/standalone/ ./
COPY --from=builder /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "apps/frontend/server.js"]