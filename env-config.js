#!/usr/bin/env node

/**
 * Generate runtime environment configuration
 * This script runs at container startup to inject environment variables
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envConfig = {
  VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
  VITE_API_TIMEOUT: process.env.VITE_API_TIMEOUT,

};

const configContent = `window._env_ = ${JSON.stringify(envConfig, null, 2)};`;

const distPath = path.join(__dirname, 'dist');
const configPath = path.join(distPath, 'env-config.js');

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory not found. Run npm run build first.');
  process.exit(1);
}

// Write the config file
fs.writeFileSync(configPath, configContent);

console.log('✅ Runtime environment configuration generated');
console.log('Environment variables loaded:', Object.keys(envConfig).filter(key => envConfig[key]).length + '/' + Object.keys(envConfig).length);