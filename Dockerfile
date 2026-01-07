# =============================================================================
# Stage 1: Builder
# =============================================================================
FROM oven/bun:1.3.4-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN bun run build

# =============================================================================
# Stage 2: Production
# =============================================================================
FROM oven/bun:1.3.4-alpine AS production

WORKDIR /app

# Copy only the built output from builder stage
COPY --from=builder /app/.output ./.output

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Run the Nitro server
CMD ["bun", "run", ".output/server/index.mjs"]
