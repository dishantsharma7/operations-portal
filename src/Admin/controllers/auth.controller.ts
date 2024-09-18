import { CookieOptions, NextFunction, Request, Response } from 'express';
import { InternalErrorResponse, SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import * as AuthService from '../services/auth.services';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';
import { comparePassword } from '../../core/utils';
import JWT, { JwtPayload } from '../../core/JWT';
import { cookieOptions } from '../../utils/cookieOptions';
import prisma_client from '../../config/prisma';
import { generateUniqueUsername } from '../../utils/generateUserName';
import { adminPermissions, restaurantPermissions } from '../../utils/adminPermissionData';

// Roles and Permissions
const checkNewPermissionValidityController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessPermissionName } = req.body;

    const formattedPermissionName = accessPermissionName.toLowerCase().replace(/\s/g, '');

    const allPermissions = await prisma_client.admin_permissions.findMany();

    const roleExists = allPermissions.some((permission: any) => permission.accessPermissionName.toLowerCase().replace(/\s/g, '') === formattedPermissionName);

    if (roleExists) {
      throw new BadRequestError('Permission already exists');
    }

    return new SuccessMsgResponse('Permission is valid').send(res);
  } catch (error) {
    next(error);
  }
};
const checkNewRoleValidityController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleName } = req.body;

    const formattedRoleName = roleName.toLowerCase().replace(/\s/g, '');

    const allRoles = await prisma_client.admin_roles.findMany();

    const roleExists = allRoles.some((role: any) => role.roleName.toLowerCase().replace(/\s/g, '') === formattedRoleName);

    if (roleExists) {
      throw new BadRequestError('Role already exists');
    }

    return new SuccessMsgResponse('Role is valid').send(res);
  } catch (error) {
    next(error);
  }
};

const createPermissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permissionData = req.body;

    const createPermissionResponse = await AuthService.createPermissionService(permissionData);

    return createPermissionResponse?.send(res);
  } catch (error) {
    console.log('🚀 ~ createPermissionController ~ error:', error);
    next();
  }
};
const createRoleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleData = req.body;

    const createRoleResponse = await AuthService.createRoleService(roleData);
    return createRoleResponse?.send(res);
  } catch (error) {
    console.log('🚀 ~ createRoleController ~ error:', error);
    next();
  }
};

const getAllPermissionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fetchAllPermissionResponse = await AuthService.getAllPermissionService();
    return fetchAllPermissionResponse.send(res);
  } catch (error) {
    console.log('🚀 ~ fetchAllPermissionController ~ error:', error);
    next();
  }
};

const getAllRoleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fetchAllRoleResponse = await AuthService.getAllRoleService();
    return fetchAllRoleResponse.send(res);
  } catch (error) {
    console.log('🚀 ~ fetchAllRoleController ~ error:', error);
    next();
  }
};

// Admin Users
const checkNewAdminEmailValidityController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const formattedValue = email.toLowerCase().trim();
    const admin = await prisma_client.admin_users.findUnique({
      where: { email: formattedValue },
    });

    if (admin?.id) {
      throw new BadRequestError(`Email already exists`);
    }

    // Generate a unique username
    let generatedUsernames;
    let isUsernameUnique = false;

    while (!isUsernameUnique) {
      const result = await generateUniqueUsername(formattedValue);
      generatedUsernames = result.username;

      const existingUsername = await prisma_client.admin_users.findUnique({
        where: { userName: generatedUsernames },
      });

      isUsernameUnique = !existingUsername;
    }

    return new SuccessResponse(`Email is valid`, { username: generatedUsernames }).send(res);
  } catch (error) {
    next(error);
  }
};
const checkNewAdminPhoneValidityController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber } = req.body;

    const formattedValue = phoneNumber.toLowerCase().trim();
    const admin = await prisma_client.admin_users.findUnique({
      where: { phoneNumber: formattedValue },
    });

    if (admin?.id) {
      throw new BadRequestError(`Phone Number already exists`);
    }

    return new SuccessMsgResponse(`Phone Number is valid`).send(res);
  } catch (error) {
    next(error);
  }
};
const checkNewAdminUsernameValidityController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName } = req.body;

    const formattedValue = userName.trim();
    const admin = await prisma_client.admin_users.findUnique({
      where: { userName: userName },
    });

    if (admin?.id) {
      throw new BadRequestError(`Username already exists`);
    }

    return new SuccessMsgResponse(`Username is valid`).send(res);
  } catch (error) {
    next(error);
  }
};

const adminRegisterController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminRegisterData = req.body;
    const userRegistrationResponse = await AuthService.adminRegisterService(adminRegisterData);
    return userRegistrationResponse.send(res);
  } catch (error) {
    console.log('🚀 ~ adminRegisterController ~ error:', error);
    next(error);
  }
};

const secureCookieOptions: CookieOptions = {
  httpOnly: true, // Cookie is not accessible via JavaScript
  secure: process.env.NODE_ENV === 'production', // Cookie is sent only over HTTPS in production
  sameSite: 'none', // Ensure this matches the allowed values
  path: '/', // Cookie is valid for the entire domain
};

const adminLoginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const admin = await AuthService.adminLoginService(email, password);

    if (!admin) {
      throw new AuthFailureError(`User doesn't exist`);
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      throw new AuthFailureError('Incorrect password');
    }

    const id = admin.id;
    const issuer = 'POG-API';
    const audience = id.toString();
    const subject = admin.userName;
    const param = 'admin';
    const accessTokenValidity = 3600; // 1 hour
    // const accessTokenValidity = 60; // 1 hour
    const refreshTokenValidity = 7 * 24 * 60 * 60 * 1000; // 7 days
    // const refreshTokenValidity = 300; // 7 days

    const user = {
      firstName: admin.firstName,
      lastName: admin?.lastName,
      emailAddress: admin.email,
      phoneNumber: admin.phoneNumber,
      adminRoleID: admin.admin_rolesId,
    };

    // Create JwtPayload instance for Access Token
    const accessTokenPayload = new JwtPayload(issuer, audience, subject, param, accessTokenValidity, user);
    const accessToken = await JWT.encode(accessTokenPayload);

    // Create JwtPayload instance for Refresh Token
    const refreshTokenPayload = new JwtPayload(issuer, audience, subject, param, refreshTokenValidity, user);
    const refreshToken = await JWT.encode(refreshTokenPayload);

    return res.json({
      success: true,
      data: {
        userInfo: {
          userType: admin?.userType,
          firstName: admin?.firstName,
          lastName: admin?.lastName,
          email: admin?.email,
          id: admin?.id,
          restaurantID: null,
          permissions: admin?.admin_roles?.admin_permissions,
        },
        access_token: accessToken,
        refresh_token: refreshToken, // Optional: send refresh token to client
      },
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    next(error);
  }
};

// const adminLoginController = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await AuthService.adminLoginService(email, password);

//     if (!admin) {
//       throw new AuthFailureError(`user doesn't exist`);
//     }

//     const isPasswordValid = await comparePassword(password, admin.password);

//     if (!isPasswordValid) {
//       throw new AuthFailureError('Incorrect password');
//     }
//     if (isPasswordValid && admin.id) {
//       const id = admin.id;
//       const issuer = 'POG-API';
//       const audience = id.toString();
//       const subject = admin.userName;
//       const param = 'admin';
//       const validity = 3600;
//       const user = {
//         firstName: admin.firstName,
//         lastName: admin?.lastName,
//         emailAddress: admin.email,
//         phoneNumber: admin.phoneNumber,
//         adminRoleID: admin.admin_rolesId,
//       };
//       // Create JwtPayload instance
//       const payload = new JwtPayload(issuer, audience, subject, param, validity, user);

//       // Generate JWT
//       const token = await JWT.encode(payload);
//       console.log('🚀 ~ adminLoginController ~ token:', token);
//       return res.cookie('user_access_token', token, cookieOptions).json({ Success: 'Login successful', data: { ...admin, acces_token: token } });
//     }
//   } catch (error) {
//     console.log('Error:');
//     next(error);
//   }
// };

const createBulkPermissionsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminPermissionData = adminPermissions;
    const restaurantPermissionData = restaurantPermissions;

    const adminPermissionsResponse = await prisma_client.admin_permissions.createMany({
      data: adminPermissionData,
      skipDuplicates: true,
    });
    const restaurantPermissionResponse = await prisma_client.restaurant_permissions.createMany({
      data: restaurantPermissionData,
      skipDuplicates: true,
    });

    if (!adminPermissionsResponse || !restaurantPermissionResponse) {
      throw new BadRequestError('Failed to create permissions');
    }

    return new SuccessMsgResponse('Permissions created').send(res);
  } catch (error) {
    next(error);
  }
};

export {
  createPermissionController,
  createRoleController,
  getAllPermissionController,
  getAllRoleController,
  adminRegisterController,
  adminLoginController,
  checkNewAdminEmailValidityController,
  checkNewAdminUsernameValidityController,
  checkNewAdminPhoneValidityController,
  checkNewRoleValidityController,
  checkNewPermissionValidityController,
  createBulkPermissionsController,
};
