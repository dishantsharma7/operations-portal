import { Request, Response, NextFunction } from 'express';
import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';
import { checkColumns } from './checkColumns';
const checkExpenseFileUpload = async (req: any, res: Response, next: NextFunction) => {
  console.log('🚀 ~ checkExpenseFileUpload ~ req:', req.file);
  try {
    
    if(!req.file.fieldname){
        throw new BadRequestError("File checking failed. Please try uploading again.")
    }

        const response = await checkColumns(req.file);
        console.log("🚀 ~ checkExpenseFileUpload ~ response:", response)
        if(response){
            next()
        }

  } catch (error) {
    // console.log("🚀 ~ checkExpenseFileUpload ~ error:", error)
    next(error)
  }
};
export { checkExpenseFileUpload };
