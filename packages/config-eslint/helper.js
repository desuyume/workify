import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveTsconfigPath() {
  // Пытаемся найти tsconfig.json в корне workspace
  const rootTsconfig = path.join(process.cwd(), 'tsconfig.json');
  if (fs.existsSync(rootTsconfig)) {
    return rootTsconfig;
  }
  
  // Или возвращаем относительный путь
  return './tsconfig.json';
}