import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export function decodeToken(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(422).send('Invalid token');
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secretkey') as JwtPayload;

  return decodedToken;
}
