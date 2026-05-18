# --- Stage 1: Core Base Dependency Layer ---
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: Structural Builder Layer ---
FROM base AS builder
WORKDIR /app
COPY . .

# 🔥 FIXED: Accept the dynamic API URL from the GitHub Actions build argument
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# --- Stage 3: Dynamic Production Runtime ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]