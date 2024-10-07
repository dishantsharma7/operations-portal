import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import * as authController from "./controllers/auth.controller";
const adminRouter = express.Router();

adminRouter.get("/", (req: Request, res: Response) => {
  const message = "Admin routes are working";
  new SuccessMsgResponse(message).send(res);
});
adminRouter.post("/register", authController.adminRegisterController);
adminRouter.post("/login", authController.adminLoginController);
export { adminRouter };
