# Automation Standalone 🏡💻🐳

Welcome to the Digital Alchemy standalone automation repository!

## Purpose

This repository is designed to work both locally and deployed as a docker container. The container
will interact with the HomeAssistant websocket to fulfill its automation goals.

## Community

- 📚 [Documentation](https://docs.digital-alchemy.app/)
- 🗣️ [Discord](https://discord.gg/JkZ35Gv97Y)

## Setup

### Prerequisites

These tools need to be installed on your machine:

- [Volta](https://volta.sh/) - Autonomously manages Node and Yarn versions
- [Docker desktop](https://www.docker.com/products/docker-desktop/) - For packaging the application

### Clone

Clone the repository to your local machine:

```bash
git clone git@github.com/Digital-Alchemy-TS/automation-standalone.git
```

### Change directory

Change directory to the repository root:

```bash
cd automation-standalone
```

### Install

**Optional**: If you don't have Volta installed, you must enable Corepack to use the correct Yarn
version.

```bash
npm unistall -g yarn pnpm
corepack enable
```

Install dependencies using Yarn:

```bash
yarn
```

### Configure

Create a `.env` file from the `.env.dist` example file.

```bash
cp .env.dist .env
```

Then, configure each variable in `.env` so that the application can connect to your HA instance.

## Usage

### Sync

Synchronize the latest DA packages and write types based on your HA instance

```bash
yarn type-writer
```

### Run

Run your automations locally

```bash
yarn dev
```

## Testing

#### Unit tests and integration tests

Run all your tests

```bash
yarn test
```

#### End-to-end tests

See [./playground](./playground/README.md) folder readme.

## Publication

### Build

Build the application

```bash
yarn build
```

### Publish

Build and publish your application to a docker registry

```bash
yarn publish
```

### Deploy

For now, this will be considered a manual step. Basically all you have to do is pull the image that
you've just pushed.

> _**Note:** make sure that the same variables from `.env.dist` are passed into the container at
> runtime._

## 📄 License

This project is licensed under the MIT License, as detailed in the [LICENSE](./LICENSE) file.
