import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  DISCORD_TOKEN: string | undefined;
  DISCORD_APPLICATION_ID: string | undefined;
  DISCORD_PUBLIC_KEY: string | undefined;
  DISCORD_NOTIFICATION_CHANNEL_ID: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_USER: string | undefined;
  DB_NAME: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  HANDLE_DOMAINS_ALERT_SPEED: number | undefined;
}

interface Config {
  NODE_ENV: "development" | "production";
  DISCORD_TOKEN: string;
  DISCORD_APPLICATION_ID: string;
  DISCORD_PUBLIC_KEY: string;
  DISCORD_NOTIFICATION_CHANNEL_ID: string;
  DB_PASSWORD: string;
  DB_USER: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  HANDLE_DOMAINS_ALERT_SPEED: number;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    DISCORD_APPLICATION_ID: process.env.DISCORD_APPLICATION_ID,
    DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
    DISCORD_NOTIFICATION_CHANNEL_ID:
      process.env.DISCORD_NOTIFICATION_CHANNEL_ID,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    HANDLE_DOMAINS_ALERT_SPEED: process.env.HANDLE_DOMAINS_NOTIFICATION_SPEED
      ? Number(process.env.HANDLE_DOMAINS_NOTIFICATION_SPEED)
      : undefined,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSafeConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const safeConfig = getSafeConfig(config);

export default safeConfig;
