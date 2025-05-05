import { body, param } from 'express-validator';

export const createWalletValidation = [
  body('currency')
    .isString()
    .withMessage('Currency must be a string')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters long')
    .toUpperCase(),
];

export const updateWalletValidation = [
  param('id')
    .isInt()
    .withMessage('Wallet ID must be an integer'),
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean'),
]; 