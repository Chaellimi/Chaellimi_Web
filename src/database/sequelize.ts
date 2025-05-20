import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    dialect: 'mysql',
    dialectModule: mysql2,
    logging:
      process.env.DEV_TYPE === 'development'
        ? (msg) => console.log(msg)
        : false,
  }
);
