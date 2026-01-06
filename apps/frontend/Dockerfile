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

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXTAUTH_URL
ARG NODE_ENV=production

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NODE_ENV=${NODE_ENV}

# Собираем приложение
RUN pnpm run build:frontend

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "apps/frontend/server.js"]