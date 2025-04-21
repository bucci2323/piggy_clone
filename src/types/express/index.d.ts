import { Request, Response, NextFunction, Router, Application } from 'express';

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

export { Request, Response, NextFunction, Router, Application }; 