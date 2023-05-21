import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
export class User extends Model {
  declare id: number;
  declare username: string;
  declare discriminator: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discriminator: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
);
