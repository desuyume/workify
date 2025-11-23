FROM node:20-alpine

RUN apk add --no-cache python3 make g++ openssl-dev

WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm@10.23.0

# Копируем package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/

# Устанавливаем зависимости с CI переменной
ENV CI=true
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

# Генерируем Prisma
RUN pnpm run db:generate

# Проверяем Prisma
RUN ls -la node_modules/.prisma/client/ && echo "✅ Prisma client generated"

# Собираем
RUN pnpm run build:backend

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]