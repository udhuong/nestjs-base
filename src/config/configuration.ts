import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as dotenv from 'dotenv';
import { join } from 'path';

const YAML_CONFIG_FILENAME = '../../config/config.yaml';
const ENV_FILE = join(process.cwd(), '.env');

// Load biến môi trường từ file .env
dotenv.config({ path: ENV_FILE });

function replaceEnvPlaceholders(obj: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\$\{(\w+)\}/g, (_, key) => process.env[key] ?? '');
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      obj[key] = replaceEnvPlaceholders(obj[key]);
    }
  }

  return obj;
}

export default () => {
  const configPath = join(__dirname, YAML_CONFIG_FILENAME);
  const file = readFileSync(configPath, 'utf8');
  const rawConfig = yaml.load(file) as Record<string, any>;

  return replaceEnvPlaceholders(rawConfig);
};
