import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Request, Response } from 'express';
import * as userService from '../services/userService';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send('Unprocessable entity');
  }

  try {
    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const secretKey: string = process.env.JWT_SECRET_KEY || 'secretkey';
    const expiresIn = '3h';

    const { id, role } = user;

    const token = jwt.sign({ id, email, role }, secretKey, { expiresIn });

    return res.send(token);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
}

export const authController = { login };

