import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { Player } from "./player.model";
export class Hero extends Model {
  declare id: number;
  declare hero: number;
  declare class: string;
  declare level: number;
  declare name: string;
}

Hero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hero: {
      type: DataTypes.INTEGER,
    },
    class: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);
Player.hasMany(Hero, {
  foreignKey: "playerId",
  onDelete: "CASCADE",
});
