import pkg from  "pg";
import 'dotenv/config';

const { Pool } = pkg;

export const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false}:false,
  max:30, // Limit concurrent connections (default is 30);
  idleTimeoutMillis: 300000, //Close idle clients after 5 min
  connectionTimeoutMillis: 120000 // Give up after 10s trying to connect
});
