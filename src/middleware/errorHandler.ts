import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import { ErrorHandler } from '../types/express';

export const errorHandler: ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
    return;
  }

  // Handle specific error types
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      res.status(409).json({
        message: 'Resource already exists',
        error: err.message
      });
      break;
    case 'SequelizeForeignKeyConstraintError':
      res.status(400).json({
        message: 'Invalid reference',
        error: err.message
      });
      break;
    default:
      res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
      });
  }
}; 