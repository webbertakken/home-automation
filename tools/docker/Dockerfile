###########################################################
##                                                       ##
# #                        Base                          ##
##                                                       ##
###########################################################

# see all versions at https://hub.docker.com/r/oven/bun/tags
ARG BUN_VERSION=1

# Official Bun image
FROM oven/bun:${BUN_VERSION} as base

# Bun uses NODE_ENV for backward compatibility with Node
ENV NODE_ENV="production"

# Simplicity first
WORKDIR /app

###########################################################
##                                                       ##
##                       BUILDER                         ##
##                                                       ##
###########################################################

FROM base as builder

# Act as CI system: no interactive tty, no stdin/stdout, no watch processes
ENV CI="true"

# Copy only relevant files for dev and prod
COPY package.json bun.lockb /app/prod/
COPY package.json bun.lockb tsconfig.json vitest.config.ts .prettier* .eslint* .cspell.json /app/dev/

# Copy source code
COPY src/ /app/dev/src/

# Build and pre-flight checks
RUN cd /app/dev \
    && bun install --frozen-lockfile \
    # Note: `--watch false` is a workaround for https://github.com/vitest-dev/vitest/issues/1288
    && bun test --watch false \
    && bun run prettier --check . \
    && bun run lint \
    # Note: Can not do typecheck unless we pass in credentials during build time
    #    && bun run types \
    #    && bun run typecheck \
    && bun run build:dist

# Prod deps only
RUN cd /app/prod \
    && bun install --production --frozen-lockfile

###########################################################
##                                                       ##
##                      PRODUCTION                       ##
##                                                       ##
###########################################################

FROM base as prod

# Open Container Initiative (OCI) labels
LABEL org.opencontainers.image.title="Automation Standalone" \
      org.opencontainers.image.description="This image contains an end-users automations application that communicates directly with a HomeAssistant instance" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.url="https://github.com/digital-alchemy/automation-standalone" \
      org.opencontainers.image.documentation="https://docs.digital-alchemy.app/" \
      org.opencontainers.image.source="https://github.com/digital-alchemy/automation-standalone" \
      org.opencontainers.image.vendor="Digital Alchemy" \
      org.opencontainers.image.authors="Webber Takken <webber@takken.io>" \
      org.opencontainers.image.licenses="MIT"

# Copy the distributable files and production specific dependencies
COPY --from=builder /app/dev/dist .
COPY --from=builder /app/prod/package.json .
COPY --from=builder /app/prod/node_modules node_modules

# Run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "server.js" ]
