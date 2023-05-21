import { User } from './models/User'; // Import your Sequelize models

const users = [
  { name: 'Admin', email: 'admin@example.com', password: 'password', role: 'admin' },
  { name: 'Boss Smith', email: 'smith@example.com', password: 'password', role: 'boss' },
  { name: 'User Smith', email: 'user@example.com', password: 'password', role: 'regular' },
];

export async function seedUsers() {
  try {
    await User.bulkCreate(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}
