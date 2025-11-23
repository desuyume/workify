FROM node:20-alpine AS builder

RUN npm install -g pnpm@10.23.0

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/

ENV CI=true

RUN pnpm install --frozen-lockfile

COPY apps/frontend/ ./apps/frontend/
COPY packages/ ./packages/ 

# Отключаем ESLint при билде
RUN NEXT_IGNORE_ESLINT=1 pnpm run build:frontend

RUN pnpm run build:frontend

FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app

# Копируем только нужные файлы
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/ ./apps/frontend/.next/
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public/ ./apps/frontend/public/
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/package.json ./apps/frontend/
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/ ./node_modules/

COPY --from=builder --chown=nextjs:nodejs /app/packages/ ./packages/

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "apps/frontend/server.js"]