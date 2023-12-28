# Discord Bot Checker

Discord Bot Checker sends alerts on Discord if a specified website is no longer online.

## Installation

The project is containerized. At the project's root, run the following command to launch the container:

```bash
pnpm docker:up
```

Ensure Docker, Node.js and pnpm are installed beforehand.

## Key Features

Integration with a database for Discord command interactions (registering a user, adding a URL, displaying registered URLs).
Recurrent task checking the availability of registered sites.

## Technologies

- Docker
- Node.js
- JavaScript
- TypeScript
- Discord.js
- Sequelize
