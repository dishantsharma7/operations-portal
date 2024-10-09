import express, { NextFunction, Request, Response, Router } from "express";
import { SuccessMsgResponse } from "../core/ApiResponse";
import * as clientController from "./controllers/auth.controller";
import {
  isRequestValidated,
  validateClientRegisterRequest,
} from "./middleware/clientValidator";

const clientRouter = express.Router();

clientRouter.get("/", (req: Request, res: Response) => {
  const message = "Client routes are working";
  new SuccessMsgResponse(message).send(res);
});

clientRouter.post(
  "/register",
  validateClientRegisterRequest,
  isRequestValidated,
  clientController.clientRegisterController
);

export { clientRouter };
