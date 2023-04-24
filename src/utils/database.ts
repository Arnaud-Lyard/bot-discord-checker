import safeConfig from "./env";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: safeConfig.DB_NAME,
  dialect: "postgres",
  username: safeConfig.DB_USER,
  password: safeConfig.DB_PASSWORD,
  host: safeConfig.DB_HOST,
  port: safeConfig.DB_PORT,
  models: [__dirname + "./../models/**/*.model.ts"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
    );
  },
});
