import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateCreateAdminPermissionRequest = [
  check('accessPermissionName')
    .notEmpty()
    .withMessage('Access permission name is required'),
];
export const validateCreateAdminRoleNameRequest = [
  check('roleName').notEmpty().withMessage('Role name is required'),
];
export const validateCreateAdminRoleRequest = [
  check('roleName').notEmpty().withMessage('Role name is required'),
  check('permissions')
    .isArray({ min: 1 })
    .withMessage('Select at least one permission to add new role'),
];

export const validateAdminRegisterEmailRequest = [
  check('emailAddress')
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Inavlid email Address'),
];

export const validateAdminRegisterPhoneRequest = [
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

export const validateAdminRegisterUsernameRequest = [
  check('userName').notEmpty().withMessage('Username is required'),
];

export const validateAdminRegisterRequest = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('admin_rolesId').notEmpty().withMessage('Admin role is required'),
  check('emailAddress')
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Inavlid email Address'),
  check('userName').notEmpty().withMessage('Username is required'),
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

export const validateAdminLoginRequest = [
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
