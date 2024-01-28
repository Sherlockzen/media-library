import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import "dotenv/config";
import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(sql);
async function migrateDb() {
 await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
 await sql.end();
}
migrateDb();
