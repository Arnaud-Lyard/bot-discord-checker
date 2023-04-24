import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from "sequelize-typescript";

@Table
export class Player extends Model {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  battletag: string;
}
