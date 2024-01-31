import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';


const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function migrateDb() {
  await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
}
migrateDb();
