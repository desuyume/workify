import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: '../../.env' })

export default defineConfig({
  out: './migrations',
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!
  },
  verbose: true,
  strict: true
})
