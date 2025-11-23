FROM node:20-alpine AS base
RUN npm install -g pnpm@10.23.0

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/pnpm-lock.yaml ./
COPY --from=deps /app/pnpm-workspace.yaml ./
COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

RUN pnpm run build --filter=backend

FROM base AS runner
WORKDIR /app

# Копируем зависимости
COPY --from=deps /app/node_modules ./node_modules

# Копируем собранное приложение - ищем правильный путь
COPY --from=builder /app/apps/backend/dist/ ./apps/backend/dist/
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/packages/ ./packages/

# Проверяем структуру файлов
RUN echo "📁 Checking backend structure:" && \
    find apps/backend/dist -name "*.js" -type f | head -10

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

# Пробуем разные возможные пути
CMD if [ -f "apps/backend/dist/src/main.js" ]; then \
        node apps/backend/dist/src/main.js; \
    elif [ -f "apps/backend/dist/main.js" ]; then \
        node apps/backend/dist/main.js; \
    elif [ -f "apps/backend/dist/apps/backend/src/main.js" ]; then \
        node apps/backend/dist/apps/backend/src/main.js; \
    else \
        echo "❌ main.js not found. Available files:"; \
        find apps/backend/dist -name "*.js" -type f; \
        exit 1; \
    fi