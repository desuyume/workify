FROM node:20-alpine

RUN apk add --no-cache python3 make g++ openssl-dev && \
    npm install -g pnpm@10.23.0

WORKDIR /app

# Копируем ВСЕ файлы
COPY . .

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

RUN pnpm run db:generate
RUN pnpm run build:backend

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]