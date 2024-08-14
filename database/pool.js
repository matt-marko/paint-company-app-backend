const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
 
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;