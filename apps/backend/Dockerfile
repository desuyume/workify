FROM node:20-alpine AS base
RUN npm install -g pnpm@10.23.0

# Стадия установки зависимостей
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile

# Стадия сборки
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run db:generate
RUN pnpm run build:backend

# Финальная стадия
FROM base AS runner
WORKDIR /app

# Копируем ТОЛЬКО package files для установки production зависимостей
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Устанавливаем production зависимости
RUN pnpm install --frozen-lockfile --prod

# Копируем собранное приложение
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]