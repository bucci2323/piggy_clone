import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
//   throw new Error('Missing required environment variables: DB_NAME, DB_USER, DB_HOST');
// }

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);
