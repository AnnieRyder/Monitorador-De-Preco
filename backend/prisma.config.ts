import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Força o carregamento do .env localizando o caminho absoluto do arquivo
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});