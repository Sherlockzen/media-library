import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
 schema: "./src/server/db/schema.ts",
 out: "./src/server/db/migrations",
 driver: "pg",
 dbCredentials: {
  connectionString: process.env.DATABASE_URL!,
 },
 tablesFilter: ["dz_*"],
} satisfies Config;
