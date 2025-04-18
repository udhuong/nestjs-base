import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';

// Load biến môi trường từ file .env
dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function run() {
  await AppDataSource.initialize();

  const ddlDir = path.join(__dirname, '../../ddl');
  const files = fs
    .readdirSync(ddlDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of files.sort()) {
    const filePath = path.join(ddlDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`👉 Running: ${file}`);
    await AppDataSource.query(sql);
  }

  console.log('✅ All DDL scripts executed.');
  await AppDataSource.destroy();
}

run().catch(err => {
  console.error('❌ Error running DDL scripts:', err);
  process.exit(1);
});
