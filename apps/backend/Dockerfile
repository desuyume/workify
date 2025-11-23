FROM node:20-alpine
RUN npm install -g pnpm@10.23.0

WORKDIR /app

# 1. Копируем файлы для установки зависимостей
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/

# 2. Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# 3. Копируем исходный код
COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

# 4. Генерируем Prisma и собираем
RUN pnpm run db:generate
RUN pnpm run build:backend

# 5. Проверяем что всё на месте
RUN echo "✅ Checking dependencies:" && ls -la node_modules/@nestjs/core && \
    echo "✅ Checking main.js:" && ls -la apps/backend/dist/main.js

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]