FROM node:20-alpine AS base

# Устанавливаем pnpm
RUN npm install -g pnpm@10.23.0

FROM base AS deps
WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Копируем зависимости
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/pnpm-lock.yaml ./
COPY --from=deps /app/pnpm-workspace.yaml ./

# Копируем исходный код
COPY apps/frontend/ ./apps/frontend/
COPY packages/ ./packages/

# Переменные для отключения линтеров
ENV NEXT_TELEMETRY_DISABLED=1
ENV DISABLE_ESLINT_PLUGIN=true
ENV ESLINT_NO_DEV_ERRORS=true

# Собираем приложение
RUN pnpm run build:frontend

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Копируем только необходимые файлы
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/ ./apps/frontend/.next/
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public/ ./apps/frontend/public/
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/package.json ./apps/frontend/

# Копируем node_modules только для продакшена
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "apps/frontend/server.js"]