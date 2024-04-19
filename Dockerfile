###########################################################
##                                                       ##
##                    Global variables                   ##
##                                                       ##
###########################################################

# see all versions at https://hub.docker.com/r/oven/bun/tags
ARG BUN_VERSION="1"

# see all versions at https://hub.docker.com/r/bitnami/node/tags
ARG NODE_VERSION="20"

# Build time secrets
ARG HASS_TOKEN
ARG HASS_BASE_URL

###########################################################
##                                                       ##
##                       BUILDER                         ##
##                                                       ##
###########################################################

FROM bitnami/node:${NODE_VERSION} as builder

# Allow build time secrets in this image
ARG HASS_TOKEN
ARG HASS_BASE_URL

# Act as CI system: no interactive tty, no stdin/stdout, no watch processes
ENV CI="true"

# Ensure we treat everything as production
ENV NODE_ENV="production"

# Pacakage management happens through Node and Yarn
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME "/root/.volta"
ENV PATH "$VOLTA_HOME/bin:$PATH"

# Copy only relevant files
COPY package.json yarn.lock .yarnrc.yml tsconfig.json vitest.config.ts .prettier* .eslint* .cspell.json /app/
COPY src/ /app/src/

# Build and pre-flight checks
RUN cd /app/ \
    && echo "node version: $(node --version)" \
    && echo "yarn version: $(yarn --version)" \
    && echo -e "/app/ folder:\n$(ls -alh)" \
    && yarn install --immutable \
    && yarn test \
    && yarn prettier --check . \
    && yarn lint \
    && if [ -n "$HASS_TOKEN" ] && [ -n "$HASS_BASE_URL" ]; then \
       echo "HASS_TOKEN provided, running yarn typecheck"; \
       yarn type-writer; \
       yarn typecheck; \
    else \
        echo "HASS_TOKEN not provided, skipping yarn typecheck"; \
    fi \
    && yarn build:dist \
    && echo -e "dist files:\n$(ls -alh dist | tail -n +4)" \
    && echo "dist size: $(du -sh dist)" \
    && echo "node_modules size including dev dependencies: $(du -sh node_modules)" \
    && yarn workspaces focus --production \
    && echo "node modules size after production focus: $(du -sh node_modules)"

###########################################################
##                                                       ##
##                      PRODUCTION                       ##
##                                                       ##
###########################################################


# Official Bun image
FROM oven/bun:${BUN_VERSION} as automation-prod

# Bun uses NODE_ENV for backward compatibility with Node
ENV NODE_ENV="production"

# Simplicity first
WORKDIR /app

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
COPY --from=builder /app/dist /app/package.json ./
COPY --from=builder /app/node_modules node_modules

# Run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "server.js" ]
