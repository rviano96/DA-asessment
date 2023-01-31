import { Sequelize } from "sequelize";
import { Contact } from "../../models/contact.model";
import dotenv from 'dotenv'
dotenv.config()
// const connection = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   username: "root",
//   password: "root",
//   database: "sequelize",
//   logging: false,
//   models: [Contact],
// });
const connection = new Sequelize(process.env.DATABASE_URL!, {
  logging: true,
  dialect: "postgres"

})
// const connection = new Sequelize('test', 'root', 'toor', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: true
// })

export default connection;
