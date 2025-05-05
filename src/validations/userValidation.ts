import { body, param } from 'express-validator';

export const updateUserValidation = [
  param('id')
    .isInt()
    .withMessage('User ID must be an integer'),
  body('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long'),
  body('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
]; 