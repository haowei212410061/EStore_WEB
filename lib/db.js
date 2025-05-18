import { Pool } from "pg";
require("dotenv").config();

export const pool = new Pool({
  connectionString: process.env.PUBLIC_POSTGRES_URL,
});