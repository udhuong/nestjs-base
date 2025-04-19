import * as fs from 'fs';
import * as path from 'path';

import { AppDataSource } from '../config/data-source';

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
