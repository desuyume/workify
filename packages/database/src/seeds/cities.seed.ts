import { DatabaseClient } from '../client'
import { RUSSIAN_CITIES } from '../constants/russian-cities'
import { cities } from '../schema'

export const seedCities = async (db: DatabaseClient) => {
  console.log('🌆 Seeding cities...')

  const existing = await db.select().from(cities).limit(1);
  
  if (existing.length === 0) {
    await db.insert(cities).values(RUSSIAN_CITIES);
    console.log(`✅ Added ${RUSSIAN_CITIES.length} cities`);
  } else {
    console.log('⏭️ Cities already exist, skipping...');
  }
}
