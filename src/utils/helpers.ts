import { config } from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}; 