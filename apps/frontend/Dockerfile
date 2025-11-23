FROM node:20-alpine AS base

RUN npm install -g pnpm@10.23.0

WORKDIR /app

COPY ../../package.json ./
COPY ../../pnpm-lock.yaml ./
COPY ../../apps/frontend/ ./apps/frontend/
COPY ../../packages/ ./packages/

RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN cd apps/frontend && pnpm run build

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "apps/frontend/server.js"]