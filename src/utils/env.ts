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
  BNET_CLIENT_ID: string | undefined;
  BNET_SECRET: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_USER: string | undefined;
  DB_NAME: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: string | undefined;
}

interface Config {
  NODE_ENV: "development" | "production";
  DISCORD_TOKEN: string;
  DISCORD_APPLICATION_ID: string;
  DISCORD_PUBLIC_KEY: string;
  BNET_CLIENT_ID: string;
  BNET_SECRET: string;
  DB_PASSWORD: string;
  DB_USER: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: string;

}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    DISCORD_APPLICATION_ID: process.env.DISCORD_APPLICATION_ID,
    DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
    BNET_CLIENT_ID: process.env.BNET_CLIENT_ID,
    BNET_SECRET: process.env.BNET_SECRET,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
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