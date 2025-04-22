import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { createWriteStream } from 'fs';
import { join } from 'path';


const errorLogStream = createWriteStream(join(__dirname, '../../logs/error.log'), { flags: 'a' });

// Custom token for logging request body
morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body);
});

// Development logging format
const devFormat = ':method :url :status :response-time ms - :res[content-length] - :body';

// Production logging format
const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

export const requestLogger = morgan(process.env.NODE_ENV === 'production' ? prodFormat : devFormat, {
  stream: process.env.NODE_ENV === 'production' ? errorLogStream : process.stdout,
  skip: (req: Request, res: Response) => res.statusCode < 400
});

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `${new Date().toISOString()} - ${err.stack}\n`;
  errorLogStream.write(errorMessage);
  console.error(errorMessage);
  next(err);
}; 