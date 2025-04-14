
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 
export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3000,
    logging: false,
  }
);
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// connection.connect((err: Error | null) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database.');
// });
