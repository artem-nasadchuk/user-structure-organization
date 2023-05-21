import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as userService from '../services/userService';

async function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, role, bossId } = req.body;

  if (!email || !password) {
    res.status(422).send('Unprocessible entity');
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    try {
      const secretKey: string = process.env.JWT_SECRET_KEY || 'secretkey';
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
      const userRole = decodedToken.role;

      if (userRole === 'admin') {
        const user = await User.create({ email, password, role, bossId });
        res.status(201).send(user);
      }
    } catch (error) {
      res.status(401).send(error);
    }
  } else {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
}


async function getUsers(req: Request, res: Response) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    try {
      const secretKey: string = process.env.JWT_SECRET_KEY || 'secretkey';
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

      const userId = decodedToken.id;
      const user = await User.findOne({ where: { id: userId }});

      if (!user) {
        res.status(404).send('User not found');
      } else {
        const users = await userService.getUsers(user);
        res.status(200).send(users);
      }
      
    } catch (error) {
      res.status(401).send(error);
    }
  } else {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
}
export const userController = { createUser, getUsers };


