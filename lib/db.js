import { Pool } from "pg";
require("dotenv").config();

export const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
});