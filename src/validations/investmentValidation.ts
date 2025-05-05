import { body, param } from 'express-validator';

export const createInvestmentValidation = [
  body('walletId')
    .isInt()
    .withMessage('Wallet ID must be an integer'),
  body('type')
    .isIn(['stocks', 'bonds', 'mutual_funds'])
    .withMessage('Type must be stocks, bonds, or mutual_funds'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer (in months)'),
  body('riskLevel')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Risk level must be low, medium, or high'),
];

export const updateInvestmentValidation = [
  param('id')
    .isInt()
    .withMessage('Investment ID must be an integer'),
  body('status')
    .isIn(['active', 'completed', 'cancelled'])
    .withMessage('Status must be active, completed, or cancelled'),
]; 