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
  @Column
  username!: string;

  @Column
  discriminator!: string;

  @HasMany(() => Player, {
    onDelete: "CASCADE",
  })
  players: Player[];
}
