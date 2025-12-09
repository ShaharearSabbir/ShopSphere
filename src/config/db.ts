import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.CONNECTION_SRT,
  ssl: { rejectUnauthorized: false },
});

pool.connect().then(() => "database connected");

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
};

export default initDB;
