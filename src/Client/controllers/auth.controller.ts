import { CookieOptions, NextFunction, Request, Response } from "express";
import {
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from "../../core/ApiResponse";
import * as AuthService from "../services/auth.services";
import { AuthFailureError, BadRequestError } from "../../core/ApiError";
import { comparePassword } from "../../core/utils";
import JWT, { JwtPayload } from "../../core/JWT";
import { cookieOptions } from "../../utils/cookieOptions";
import prisma_client from "../../config/prisma";
import { generateUniqueUsername } from "../../utils/generateUserName";

// Client Users
const checkNewClientEmailValidityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const formattedValue = email.toLowerCase().trim();
    const client = await prisma_client.client_user.findUnique({
      where: { emailAddress: formattedValue },
    });

    if (client?.id) {
      throw new BadRequestError(`Email already exists`);
    }

    // Generate a unique username
    let generatedUsernames;
    let isUsernameUnique = false;

    while (!isUsernameUnique) {
      const result = await generateUniqueUsername(formattedValue);
      generatedUsernames = result.username;

      const existingUsername = await prisma_client.client_user.findUnique({
        where: { username: generatedUsernames },
      });

      isUsernameUnique = !existingUsername;
    }

    return new SuccessResponse(`Email is valid`, {
      username: generatedUsernames,
    }).send(res);
  } catch (error) {
    next(error);
  }
};
const checkNewClientPhoneValidityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber } = req.body;

    const formattedValue = phoneNumber.toLowerCase().trim();
    const client = await prisma_client.client_user.findUnique({
      where: { phoneNumber: formattedValue },
    });

    if (client?.id) {
      throw new BadRequestError(`Phone Number already exists`);
    }

    return new SuccessMsgResponse(`Phone Number is valid`).send(res);
  } catch (error) {
    next(error);
  }
};
const checkNewClientUsernameValidityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;

    const formattedValue = username.trim();
    const client = await prisma_client.client_user.findUnique({
      where: { username: username },
    });

    if (client?.id) {
      throw new BadRequestError(`Username already exists`);
    }

    return new SuccessMsgResponse(`Username is valid`).send(res);
  } catch (error) {
    next(error);
  }
};

const clientRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientRegisterData = req.body;
    const userRegistrationResponse = await AuthService.clientRegisterService(
      clientRegisterData
    );
    return userRegistrationResponse.send(res);
  } catch (error) {
    console.log("🚀 ~ clientRegisterController ~ error:", error);
    next(error);
  }
};

const secureCookieOptions: CookieOptions = {
  httpOnly: true, // Cookie is not accessible via JavaScript
  secure: process.env.NODE_ENV === "production", // Cookie is sent only over HTTPS in production
  sameSite: "none", // Ensure this matches the allowed values
  path: "/", // Cookie is valid for the entire domain
};

const clientLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailAddress, password } = req.body;

    const client = await AuthService.clientLoginService(emailAddress, password);

    if (!client) {
      throw new AuthFailureError(`User doesn't exist`);
    }

    const isPasswordValid = await comparePassword(password, client.password);

    if (!isPasswordValid) {
      throw new AuthFailureError("Incorrect password");
    }

    const id = client.id;
    const issuer = "OPR-API";
    const audience = id.toString();
    const subject = client.username;
    const param = "client";
    const accessTokenValidity = 3600; // 1 hour
    // const accessTokenValidity = 60; // 1 hour
    const refreshTokenValidity = 7 * 24 * 60 * 60 * 1000; // 7 days
    // const refreshTokenValidity = 300; // 7 days

    const user = {
      firstName: client.firstName,
      lastName: client?.lastName,
      emailAddress: client.emailAddress,
      phoneNumber: client.phoneNumber,
    };

    // Create JwtPayload instance for Access Token
    const accessTokenPayload = new JwtPayload(
      issuer,
      audience,
      subject,
      param,
      accessTokenValidity,
      user
    );
    const accessToken = await JWT.encode(accessTokenPayload);

    // Create JwtPayload instance for Refresh Token
    const refreshTokenPayload = new JwtPayload(
      issuer,
      audience,
      subject,
      param,
      refreshTokenValidity,
      user
    );
    const refreshToken = await JWT.encode(refreshTokenPayload);

    return res.json({
      success: true,
      data: {
        userInfo: {
          userType: client?.userType,
          firstName: client?.firstName,
          lastName: client?.lastName,
          emailAddress: client?.emailAddress,
          id: client?.id,
        },
        access_token: accessToken,
        refresh_token: refreshToken, // Optional: send refresh token to client
      },
    });
  } catch (error) {
    console.error("Error in Client login:", error);
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

export {
  clientRegisterController,
  clientLoginController,
  checkNewClientEmailValidityController,
  checkNewClientUsernameValidityController,
  checkNewClientPhoneValidityController,
};
