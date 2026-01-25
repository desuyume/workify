import { DatabaseClient } from '../client'
import { vacancyCategories } from '../schema'
import { VACANCY_CATEGORIES } from '../constants/vacancy-categories'

export const seedCategories = async (db: DatabaseClient) => {
  console.log('🏷️ Seeding vacancy categories...')

  const existing = await db.select().from(vacancyCategories).limit(1)

  if (existing.length === 0) {
    await db.insert(vacancyCategories).values(VACANCY_CATEGORIES)
    console.log(`✅ Added ${VACANCY_CATEGORIES.length} vacancy categories`)
  } else {
    console.log('⏭️ Vacancy categories already exist, skipping...')
  }
}
