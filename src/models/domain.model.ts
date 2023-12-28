import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./user.model";

export class Domain extends Model {
  declare id: number;
  declare url: string;
  declare status: "progress" | "online" | "error";
}

Domain.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM({
        values: ["progress", "online", "error"],
      }),
    },
  },
  { sequelize }
);
User.hasMany(Domain, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
