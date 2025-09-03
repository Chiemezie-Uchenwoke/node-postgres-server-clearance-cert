import { Client } from 'pg';
import dotenv from "dotenv";

dotenv.config();
 
const client = new Client({
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export {client};