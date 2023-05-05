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
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare battletag: string;

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => User)
  user: User;
}
