FROM node:20-alpine AS base

# Устанавливаем pnpm
RUN npm install -g pnpm@10.23.0

FROM base AS deps
WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
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
COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

# Собираем приложение
RUN pnpm run db:generate
RUN pnpm run build:backend

FROM base AS runner
WORKDIR /app

# Устанавливаем зависимости только для продакшена
COPY --from=deps /app/node_modules ./node_modules

# Копируем собранное приложение
COPY --from=builder /app/apps/backend/dist ./
COPY --from=builder /app/apps/backend/package.json ./apps/backend/

# Копируем shared packages если используются
COPY --from=builder /app/packages/ ./packages/

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]