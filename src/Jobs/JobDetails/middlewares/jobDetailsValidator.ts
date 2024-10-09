import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateCreateJobDetailRequest = [
  check("clientID").notEmpty().withMessage("Client ID is required"),
  check("adminID").notEmpty().withMessage("Admin ID is required"),
  check("salesAdminID")
    .optional()
    .isString()
    .withMessage("Sales Admin ID must be a string"),
  check("writerID")
    .optional()
    .isString()
    .withMessage("Writer ID must be a string"),
  check("jobTitle").notEmpty().withMessage("Job Title is required"),
  check("jobDescription")
    .optional()
    .isString()
    .withMessage("Job Description must be a string"),
  check("jobDeadline")
    .isISO8601()
    .withMessage("Job Deadline must be a valid date"),
  check("finalQuotationID")
    .optional()
    .isString()
    .withMessage("Final Quotation ID must be a string"),
  check("jobAmount")
    .isFloat({ gt: 0 })
    .withMessage("Job Amount must be a positive number"),
  check("jobTaxAmount")
    .isFloat({ gt: 0 })
    .withMessage("Job Tax Amount must be a positive number"),
  check("jobFinalAmount")
    .isFloat({ gt: 0 })
    .withMessage("Job Final Amount must be a positive number"),
  check("completionDate")
    .optional()
    .isISO8601()
    .withMessage("Completion Date must be a valid date"),
  check("completionStatus")
    .optional()
    .isIn(["Pending", "Completed"])
    .withMessage('Completion Status must be either "Pending" or "Completed"'),
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
