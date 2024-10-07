import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateWriterCompanyRegisterEmailRequest = [
  check('emailAddress')
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Inavlid email Address'),
];

export const validateWriterCompanyRegisterPhoneRequest = [
  check('phoneNumber')
    .custom((value, { req }) => {
      if (!value || value.trim() === '') {
        throw new Error('Phone number is required');
      }
      return true;
    })
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Invalid phone number'),
];

export const validateWriterCompanyRegisterUsernameRequest = [
  check('userName').notEmpty().withMessage('Username is required'),
];

export const validateWriterCompanyRegisterRequest = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('emailAddress')
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Inavlid email Address'),
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required'),
  check('phoneNumber')
    .custom((value, { req }) => {
      if (!value || value.trim() === '') {
        throw new Error('Phone number is required');
      }
      return true;
    })
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Invalid phone number'),
];

export const validateWriterCompanyLoginRequest = [
  check('emailAddress').notEmpty().withMessage('Email is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};
