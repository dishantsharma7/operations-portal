import { Request, Response, NextFunction } from 'express';
import { hrComputaxFileName, hrFileStructure } from './staticData';
import { checkColumns } from './checkColumns';
import { BadRequestError } from '../../core/ApiError';
const checkHrFileUpload = async (req: any, res: Response, next: NextFunction) => {
  try {
      const response = await checkColumns(req.file);
      console.log("🚀 ~ checkHrFileUpload ~ response:", response)
      if (response.rowWithAllColumns) {
        next();
      }
  } catch (error) {
    next(error)
  }
};
export { checkHrFileUpload };
