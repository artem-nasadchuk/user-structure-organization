import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  // TODO: add validation

  const user = await User.findOne({ where: { email, password } });
  console.log(user);

  if (!user) {
    res.status(401).send('Invalid credentials');
    return;
  }

  const secretKey: string = process.env.JWT_SECRET_KEY || 'secretkey';
  const expiresIn = '3h';

  const { id, role } = user;

  const token = jwt.sign({ id, email, role }, secretKey, { expiresIn });

  res.send(token);
}


export const authController = { login };
