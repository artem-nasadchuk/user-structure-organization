import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import { JwtPayload } from 'jsonwebtoken';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = authService.decodeToken(req, res);
    const authId = (decodedToken as JwtPayload).id;
    const authUser = await userService.getUser(authId);

    if (!authUser) {
      return res.status(404).send('User not found');
    }

    res.locals.user = authUser;

    next();
  } catch (error) {
    return res.status(401).send(error);
  }
};
