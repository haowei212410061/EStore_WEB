import { Pool } from "pg";
require('dotenv').config();

const pool = new Pool({
    connectionString:process.env.PUBLIC_POSTGRES_URL
})

export default pool