## Automation Standalone 🏡💻🐳

Welcome to the Digital Alchemy standalone automation repository!

This repository is designed to work as a locally running development server, as well as providing options for long term deployments.

- 📚 [Documentation](https://docs.digital-alchemy.app)
- 🗣️ [Discord](https://discord.gg/JkZ35Gv97Y)

## 🏗️ Setup

### Prerequisites

Digital Alchemy targets `node20`, which is the only required system dependency. Recommended workspace tools:

- [Volta](https://volta.sh/) - Autonomously manages Node and Yarn versions
- [Docker desktop](https://www.docker.com/products/docker-desktop/) - For packaging the application

### Clone

Clone the repository to your local machine and change directory to thew new repo:

```bash
git clone git@github.com/Digital-Alchemy-TS/automation-standalone.git

cd automation-standalone
```

### Install Dependencies

Install dependencies using Yarn:

```bash
# (optional) enable yarn for setups without Volta
corepack enable

# install node_modules
yarn install
```

### Configure

Create a `.env` file from the `.env.template` example file. <sup>[docs](https://docs.digital-alchemy.app/docs/core/configuration)</sup>

```bash
cp .env.template .env
```

Then, configure each variable in `.env` so that the application can connect to your HA instance.

## 🪄 Workspace Usage

### Management

Upgrade the version of `@digital-alchemy` libraries to latest.

```bash
yarn upgrade
```

Update the library type definitions based on current Home Assistant state. <sup>[docs](https://docs.digital-alchemy.app/docs/home-automation/type-writer/)</sup>

```bash
yarn type-writer
```

### Run

Run your automations locally

```bash
# normal start
yarn start

# automatic reload when code changes
yarn start:watch
```

## 🐳 Deployments

> See the [extended documentation](https://docs.digital-alchemy.app/docs/home-automation/quickstart/automation-standalone/) for details

## 📄 License

This project is licensed under the MIT License, as detailed in the [LICENSE](./LICENSE) file.
