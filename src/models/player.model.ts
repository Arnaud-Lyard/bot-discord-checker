import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./user.model";
export class Player extends Model {
  declare id: number;
  declare battletag: string;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    battletag: {
      type: DataTypes.STRING,
    },
    discriminator: {
      type: DataTypes.INTEGER,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize }
);
User.hasMany(Player, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
