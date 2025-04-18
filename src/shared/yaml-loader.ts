import * as yaml from 'yaml';
import * as fs from 'fs';

export const loadPermissions = () => {
  const file = fs.readFileSync('config/permissions.yaml', 'utf8');
  return yaml.parse(file);
};
