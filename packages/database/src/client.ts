import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDbClient(connectionString?: string) {
  if (!db) {
    const dbUrl = connectionString || process.env.DB_URL

    if (!dbUrl) {
      throw new Error('DB_URL is not defined')
    }

    const client = postgres(dbUrl, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10
    })

    db = drizzle(client, { schema })
  }

  return db
}

export type DatabaseClient = ReturnType<typeof getDbClient>
