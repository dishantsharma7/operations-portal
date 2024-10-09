import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateCreateJobCommunicationRequest = [
  check("jobDetailsID").notEmpty().withMessage("Job Details ID is required"),
  check("communicationSender")
    .notEmpty()
    .withMessage("Communication Sender is required"),
  check("communicationMessage")
    .notEmpty()
    .withMessage("Communication Message is required"),
  check("anonymityStatus")
    .isBoolean()
    .withMessage("Anonymity Status must be a boolean value"),
];

export const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
