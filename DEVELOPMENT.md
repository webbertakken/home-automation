# Development

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

You can test the build by running:

```bash
yarn start
```

### Publish

Once you've built the image, you can publish it to the registry.

Make sure you're logged in to the registry:

```bash
docker login
```

Then, publish the image:

```bash
yarn publish
```

The results are shown at the bottom of [README.md](./README.md).
