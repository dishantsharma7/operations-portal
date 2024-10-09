import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateCreateJobFileRequest = [
  check("jobDetailsID").notEmpty().withMessage("Job Details ID is required"),
  check("fileName").notEmpty().withMessage("File Name is required"),
  check("fileDescription")
    .optional()
    .isString()
    .withMessage("File Description must be a string"),
  check("fileUploadLink")
    .notEmpty()
    .withMessage("File Upload Link is required"),
  check("uploadedBy").notEmpty().withMessage("Uploaded By is required"),
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
