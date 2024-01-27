import { migrate } from "drizzle-orm/node-postgres/migrator";
// import { db } from "./db";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// this will automatically run needed migrations on the database
// migrate(db, { migrationsFolder: "./src/app/db/migrations" })
//  .then(() => {
//   console.log("Migrations complete!");
//   process.exit(0);
//  })
//  .catch((err) => {
//   console.error("Migrations failed!", err);
//   process.exit(1);
//  });
async function migrateDB() {
 const connectionString = process.env.DATABASE_URL!;
 const sql = new pg.Client({ connectionString: connectionString });
 const db = drizzle(sql);
 await migrate(db, { migrationsFolder: "./src/app/db/migrations" });
 await sql.end();
}

migrateDB();
