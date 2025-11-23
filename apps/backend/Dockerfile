FROM node:20-alpine AS builder

RUN npm install -g pnpm@10.23.0

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/

ENV CI=true

RUN pnpm install --frozen-lockfile

COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

RUN pnpm run build:backend

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/apps/backend/dist/ ./apps/backend/dist/
COPY --from=builder /app/apps/backend/package.json ./apps/backend/

COPY --from=builder /app/packages/ ./packages/

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/server.js"]