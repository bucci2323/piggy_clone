import { body, param } from 'express-validator';

export const createTransactionValidation = [
  body('walletId')
    .isInt()
    .withMessage('Wallet ID must be an integer'),
  body('type')
    .isIn(['deposit', 'withdrawal'])
    .withMessage('Type must be deposit or withdrawal'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description must not exceed 255 characters'),
]; 