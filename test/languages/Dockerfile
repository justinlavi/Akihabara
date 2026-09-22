# syntax=docker/dockerfile:1
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM dependencies AS validation
COPY . .
ENV NODE_ENV=production
RUN npm run check && npm run package

FROM scratch AS artifact
COPY --from=validation /workspace/*.vsix /
LABEL org.opencontainers.image.title="Akihabara fixture"
