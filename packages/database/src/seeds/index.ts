import { getDbClient } from '../client';
import { seedCategories } from './categories.seed'
import { seedCities } from './cities.seed'

export async function runSeeds() {
  console.log('🌱 Starting database seeding...');
  
  const db = getDbClient(process.env.DB_URL!);
  
  try {
    await seedCities(db);
    await seedCategories(db);
    
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// CLI
if (require.main === module) {
  runSeeds().catch(() => process.exit(1));
}