import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { Player } from "./player.model";

@Table
export class User extends Model {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare username: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare discriminator: number;

  @HasMany(() => Player)
  players: Player[];
}
