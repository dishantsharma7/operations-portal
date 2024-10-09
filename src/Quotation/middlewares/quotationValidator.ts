import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateCreateQuotationRequest = [
  check("writerID").notEmpty().withMessage("Writer ID is required"),
  check("jobDetailsID").notEmpty().withMessage("Job Details ID is required"),
  check("durationDetails")
    .notEmpty()
    .withMessage("Duration details are required"),
  check("quotationAmount")
    .isFloat({ gt: 0 })
    .withMessage("Quotation Amount must be a positive number"),
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
