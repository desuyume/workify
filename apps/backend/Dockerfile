FROM node:20-alpine

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    openssl \
    openssl-dev \
    openssl-libs-static \
    libc6-compat

RUN npm install -g pnpm@10.23.0

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ ./packages/

ENV CI=true
RUN pnpm install --frozen-lockfile

COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN pnpm run db:generate
RUN pnpm run build:backend

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production

CMD ["node", "apps/backend/dist/main.js"]