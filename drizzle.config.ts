import { config } from 'dotenv';
config({ path: '.env.local' });
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL!,
        token: process.env.TURSO_AUTH_TOKEN!,
    },
});
