import { Request, Response, NextFunction } from 'express';

export interface ErrorHandler {
  (err: Error, req: Request, res: Response, next: NextFunction): void;
}

export interface RouteHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
} 