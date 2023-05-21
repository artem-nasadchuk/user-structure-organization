import { sequelize } from "./utils/db";
import { seedUsers } from './userSeeder';

async function seedDatabase() {
  try {
    await sequelize.sync();
    await seedUsers();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
