import bcrypt from 'bcrypt';
import { User } from './models/User';

export async function seedUsers() {
  try {
    const hash = await bcrypt.hash('password', 10);
    await User.bulkCreate([
      { name: 'Admin', email: 'testadmin@example.com', password: hash, role: 'admin' },
    ]);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}
