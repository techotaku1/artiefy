<<<<<<< HEAD
=======
"use server"

>>>>>>> origin/main
import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
<<<<<<< HEAD
    url: env.DATABASE_URL,
  },
  tablesFilter: ["t3-app-next_*"],
=======
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["artiefy_*"],
>>>>>>> origin/main
} satisfies Config;
