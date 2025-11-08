// Allow importing these modules even if type declarations are not installed in the current environment.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Allow import of modules without type declarations
import { config } from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Allow import of modules without type declarations
import { drizzle } from 'drizzle-orm/postgres-js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Allow import of modules without type declarations
import { migrate } from 'drizzle-orm/postgres-js/migrator';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Allow import of modules without type declarations
import postgres from 'postgres';

config({
  path: '.env.local',
});

// In environments without Node type declarations, declare `process` to avoid TS errors.
declare const process: any;

const runMigrate = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined');
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log('Running migrations...');

  const start = Date.now();
  await migrate(db, { migrationsFolder: './lib/db/migrations' });
  const end = Date.now();

  console.log('Migrations completed in', end - start, 'ms');
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('Migration failed');
  console.error(err);
  process.exit(1);
});
