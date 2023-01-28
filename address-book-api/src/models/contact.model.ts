import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "contacts",
})
export class Contact extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  eMail!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    unique: true

  })
  phone!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at!: Date;
}