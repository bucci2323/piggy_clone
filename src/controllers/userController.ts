import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { logger } from '../utils/logger';

export class UserController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      const user = await User.create({
        email,
        password,
        firstName,
        lastName
      });

      res.status(201).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      
      // Implementation will be added after auth service
      
      res.status(200).json({
        status: 'success',
        data: {
          token: 'JWT_TOKEN'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}