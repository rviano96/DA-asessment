import { DataTypes, Model } from "sequelize"

import db from '../config/database/connection'
import { IContact } from "../interfaces/contact.interface"
export class Contact extends Model implements IContact {
  about!: string
  photoUrl!: string
  name!: string
  surname!: string
  email!: string
  phone!: string
  deletedAt!: Date
  createdAt!: Date
  updatedAt!: Date
}

Contact.init({
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  about: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  photoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, { sequelize: db, })
