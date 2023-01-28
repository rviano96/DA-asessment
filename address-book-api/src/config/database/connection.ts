import { Sequelize } from "sequelize";
import { Contact } from "../../models/contact.model";


// const connection = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   username: "root",
//   password: "root",
//   database: "sequelize",
//   logging: false,
//   models: [Contact],
// });
//const sequelize = new Sequelize('mysql://localhost:3306/database', {})
const connection = new Sequelize('test', 'root', 'toor', {
  host: 'localhost',
  dialect: 'postgres',
  logging: true
})

export default connection;
