import Discord from "discord.js";
import fs from "fs";
import path from "path";
import express from "express";
import { discordLogger } from "./utils/logger";
import Event from "./structures/Event";
import Command from "./structures/Command";
import safeConfig from "./utils/env";
import { sequelize } from "./utils/database";
import { updateLeaderboardCron } from "./utils/cron";
import { EVERY_HOUR, EVERY_WEEK } from "./const";

const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    discordLogger.info(
      "Database connection has been established successfully."
    );
  } catch (error) {
    discordLogger.info("Unable to connect to the database:", error);
  }

  try {
    sequelize.sync();
    discordLogger.info("Tables are created successfully!");
  } catch (error) {
    discordLogger.info("Unable to create tables : ", error);
  }
};
databaseConnection();
export const client = new Discord.Client({
  intents: [Discord.IntentsBitField.Flags.Guilds],
});

const app = express();

discordLogger.info("Loading all events...");
const eventsLoading = (async function loadEvents(
  dir = path.resolve(__dirname, "./events")
) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const fileDesc = fs.statSync(`${dir}/${file}`);

    if (fileDesc.isDirectory()) {
      await loadEvents(`${dir}/${file}`);
      continue;
    }

    const imported = await import(`${dir}/${file}`);
    const event: Event = new imported.default();
    event.register(client);
    discordLogger.info(`Loaded event ${event.name} (${event.event})`);
  }
})();

discordLogger.info("Loading all commands...");
export const commands = new Discord.Collection<string, Command>();
const cmdsLoading = (async function loadCommands(
  dir = path.resolve(__dirname, "./commands")
) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fileDesc = fs.statSync(dir + "/" + file);

    if (fileDesc.isDirectory()) {
      await loadCommands(dir + "/" + file);
      continue;
    }

    const loadedCommand = await import(dir + "/" + file);
    const command: Command = new loadedCommand.default();

    commands.set(command.name, command);

    discordLogger.info(`Loaded command ${command.name} from ${file}`);
  }
})();

Promise.all([eventsLoading, cmdsLoading]).then(() => {
  discordLogger.info("Finished loading commands and events.");
  discordLogger.info(`Connecting to Discord...`);
  client.login(safeConfig.DISCORD_TOKEN);
});
