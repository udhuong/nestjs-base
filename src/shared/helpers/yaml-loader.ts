import * as fs from 'fs';
import * as yaml from 'yaml';

export const loadPermissions = () => {
  const file = fs.readFileSync('config/permissions.yaml', 'utf8');
  return yaml.parse(file);
};
