import { User } from '../models/User';
import { UserModel } from '../models/User';

export async function getUsers(user: UserModel) {
  if (user.role === 'admin') {
    return await User.findAll();
  }

  if (user.role === 'boss') {
    return await getSubordinates([user.id], [user]);
  }

  if (user.role === 'regular') {
    return [user]
  }
}

async function getSubordinates(ids: number[], users: (UserModel)[]): Promise<(UserModel)[]> {
  if (!ids.length) {
    return users;
  }

  const subordinates = await User.findAll({ where: { bossId: ids } });
  const subordinatesIds = subordinates.map(subordinate => subordinate.id);
  const updatedUsers = [...users, ...subordinates];

  return await getSubordinates(subordinatesIds, updatedUsers);
}

