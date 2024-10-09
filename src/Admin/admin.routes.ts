import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import * as authController from "./controllers/auth.controller";
import {
  isRequestValidated,
  validateAdminLoginRequest,
  validateAdminRegisterRequest,
} from "./middleware/adminValidator";
const adminRouter = express.Router();

adminRouter.get("/", (req: Request, res: Response) => {
  const message = "Admin routes are working";
  new SuccessMsgResponse(message).send(res);
});
adminRouter.post(
  "/register",
  validateAdminRegisterRequest,
  isRequestValidated,
  authController.adminRegisterController
);
adminRouter.post(
  "/login",
  validateAdminLoginRequest,
  isRequestValidated,
  authController.adminLoginController
);
export { adminRouter };
