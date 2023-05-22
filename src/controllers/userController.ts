import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as userService from '../services/userService';

async function createUser(req: Request, res: Response) {
  const { email, password, role, bossId } = req.body;

  if (!email || !password || !role) {
    return res.status(422).send('Unprocessable entity');
  }

  const { authRole } = res.locals.user;

  if (authRole !== 'admin') {
    return res.status(401).send('Unauthorized');
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, hash, role, bossId);

    return res.status(201).send(userService.normalizeData(user));
  } catch (error) {
    return res.status(401).send(error);
  }
}

async function getUsers(req: Request, res: Response) {
  try {
    const authUser = res.locals.user;

    if (!authUser) {
      return res.status(404).send('User not found');
    }

    const users = await userService.getUsers(authUser);
    return res.status(200).send(users?.map(userService.normalizeData));
  } catch (error) {
    return res.status(401).send(error);
  }
}

export async function updateUser(req: Request, res: Response) {
  const { userId } = req.params;
  const { bossId } = req.body;

  const authUser = res.locals.user;

  if (authUser.role !== 'admin' && authUser.role !== 'boss') {
    return res.status(401).send('Unauthorized');
  }

  const users = await userService.getUsers(authUser);

  if (!users) {
    return res.status(404).send('Users not found');
  }

  const user = users.find(subordinate => subordinate.id === +userId && subordinate.id !== authUser.id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const newBoss = [authUser, ...users].find(subordinate => subordinate.id === bossId);

  if (!newBoss) {
    return res.status(404).send('Boss not found');
  }

  const updatedUser = await userService.updateBossId(user, bossId);
  return res.status(200).send(userService.normalizeData(updatedUser));
}


export const userController = { createUser, getUsers, updateUser };
