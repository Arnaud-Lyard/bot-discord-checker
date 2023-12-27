import safeConfig from "./env";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  safeConfig.DB_NAME,
  safeConfig.DB_USER,
  safeConfig.DB_PASSWORD,
  {
    host: safeConfig.DB_HOST,
    port: safeConfig.DB_PORT,
    dialect: "postgres",
    logging: safeConfig.NODE_ENV === "development" ? true : false,
  }
);
