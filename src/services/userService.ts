import { User, UserRole } from '../models/User';
import { UserModel } from '../models/User';
import { User as UserInterface } from '../types/User';

export function createUser(email: string, hash:string, role: UserRole, bossId: number) {
  return User.create({ email, password: hash, role, bossId });
}

export function findByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export function getUser(userId: number) {
  return User.findOne({ where: { id: userId } });
}

export async function getUsers(user: UserModel) {
  if (user.role === 'admin') {
    return await User.findAll();
  }

  if (user.role === 'boss') {
    return await getSubordinates([user.id], [user]);
  }

  if (user.role === 'regular') {
    return [user];
  }
}

export async function getSubordinates(ids: number[], users: (UserModel)[]): Promise<(UserModel)[]> {
  if (!ids.length) {
    return users;
  }

  const subordinates = await User.findAll({ where: { bossId: ids } });
  const subordinatesIds = subordinates.map(subordinate => subordinate.id);
  const updatedUsers = [...users, ...subordinates];

  return await getSubordinates(subordinatesIds, updatedUsers);
}

export async function updateBossId(user: UserModel, bossId: number) {
  user.bossId = bossId;
  await user.save();

  return user;
}

export function normalizeData({id, email, bossId, role}: UserInterface) {
  return { id, email, bossId, role };
}
