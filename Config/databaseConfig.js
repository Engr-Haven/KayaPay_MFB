require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
);

const connectDB = async () => {
  await sequelize.authenticate();

  console.log("Database connection established successfully.");
};

module.exports = { sequelize, connectDB };
