# Can not go higher than 3.15 until this answer is updated: https://stackoverflow.com/a/38433396/3593896
FROM alpine:3.15

# Install glibc. Alpine comes with `musl libc`, but Bun builds for `glibc`
RUN apk --no-cache add ca-certificates wget \
    && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
    && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk \
    && apk add glibc-2.28-r0.apk \
    && rm -f glibc-2.28-r0.apk

# Open Container Initiative (OCI) labels
LABEL org.opencontainers.image.title="Docker Standalone" \
      org.opencontainers.image.description="This image contains an end-users automations application that communicates directly with a HomeAssistant instance" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.url="https://github.com/digital-alchemy/docker-standalone" \
      org.opencontainers.image.documentation="https://docs.digital-alchemy.app/" \
      org.opencontainers.image.source="https://github.com/digital-alchemy/docker-standalone" \
      org.opencontainers.image.vendor="Digital Alchemy" \
      org.opencontainers.image.authors="Webber Takken <webber@takken.io>" \
      org.opencontainers.image.licenses="MIT"

# Install the application
ENV NODE_ENV="production"

WORKDIR /app

COPY package.json yarn.lock dist/server /app/

CMD ["./server"]
