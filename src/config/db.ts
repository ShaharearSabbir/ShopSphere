import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.CONNECTION_SRT,
  ssl: { rejectUnauthorized: false },
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200),
        email VARCHAR(200) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        photo TEXT,
        role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'manager', 'admin')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        last_login TIMESTAMP DEFAULT NOW()
    );
`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      sku VARCHAR(200) NOT NULL UNIQUE,
      regular_price INT NOT NULL CHECK (regular_price > 0),
      discount_price INT CHECK (discount_price > 0),
      quantity INT NOT NULL CHECK (quantity >= 0),
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      parent_category VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
};

export default initDB;
