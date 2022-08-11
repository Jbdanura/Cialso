require("dotenv").config({path:"./keys/.env"})

const { Sequelize } = require('sequelize');

const database = process.env.DATABASE
const user = process.env.USER
const password = process.env.PASSWORD
const host = process.env.HOST
const port = process.env.DB_PORT

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
})

const connect = async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
}
module.exports = {sequelize,connect}