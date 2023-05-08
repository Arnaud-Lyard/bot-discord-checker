import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Player extends Model {
  @Column
  battletag!: string;

  @Column
  level?: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  })
  user: User;
}
