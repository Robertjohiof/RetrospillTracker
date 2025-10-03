# Stage 1: Build workerd
FROM ubuntu:latest AS workerd-builder

ARG WORKERD_VERSION=v1.20250917.0
ARG TARGETARCH

WORKDIR /workdir

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN echo "Downloading workerd version ${WORKERD_VERSION} for architecture ${TARGETARCH}"

RUN if [ "${TARGETARCH}" = "amd64" ]; then \
        curl -LO https://github.com/cloudflare/workerd/releases/download/${WORKERD_VERSION}/workerd-linux-64.gz && \
        gunzip workerd-linux-64.gz && mv workerd-linux-64 workerd; \
    elif [ "${TARGETARCH}" = "arm64" ]; then \
        curl -LO https://github.com/cloudflare/workerd/releases/download/${WORKERD_VERSION}/workerd-linux-arm64.gz && \
        gunzip workerd-linux-arm64.gz && mv workerd-linux-arm64 workerd; \
    else \
        echo "Unsupported architecture: ${TARGETARCH}" && exit 1; \
    fi

RUN chmod +x workerd

# Stage 2: Development Node.js application
FROM node:22-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl && \
    rm -rf /var/lib/apt/lists/*

COPY --from=workerd-builder /workdir/workerd /usr/local/bin/workerd

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml* ./

RUN pnpm install && \
    pnpm add vite --save-dev

EXPOSE 5173

CMD ["pnpm", "run", "dev"]