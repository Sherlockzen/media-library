// import { drizzle } from 'drizzle-orm/neon-http';
// import { migrate } from 'drizzle-orm/postgres/migrator';
import "dotenv/config";
// import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";
import pg from 'pg'

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });


// const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function migrateDb() {
  await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
  await sql.end();
}
migrateDb();
