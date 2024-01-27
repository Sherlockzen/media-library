import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
 schema: "./src/app/db/db.ts",
 out: "./src/app/db/migrations",
 driver: "pg",
 dbCredentials: {
  connectionString: process.env.DATABASE_URL!,
 },
} satisfies Config;
