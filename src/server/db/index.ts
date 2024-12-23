<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
=======
//src\server\db\index.ts
>>>>>>> origin/main
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// Carga variables de entorno desde .env o .env.local
config({ path: ".env" });

// Inicializa la conexión a Neon usando la URL de la base de datos
<<<<<<< HEAD
const sql = neon(process.env.DATABASE_URL!);

// Exporta la conexión Drizzle para usarla en otros lugares del proyecto
export const db = drizzle(sql, { schema });
=======
const sql = neon(process.env.POSTGRES_URL!);

// Exporta la conexión Drizzle para usarla en otros lugares del proyecto
export const db = drizzle(sql, { schema });

>>>>>>> origin/main
