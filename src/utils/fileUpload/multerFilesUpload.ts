import multer from 'multer';
import fs from 'fs/promises'; // Using promises for cleaner asynchronous handling
import path from 'path'; // Added for path manipulation
import { Request, Response, NextFunction } from 'express';
import { allowedFileNames } from './allowedFileNames';
import { expensesTallyDataStorage } from '../diskStorageUtils/diskStorageUtils';
import prisma_client from '../../config/prisma';
import { BadRequestError } from '../../core/ApiError';

// Function to ensure a directory exists, returning a Promise for better control
const ensureDirectoryExists = async (directory: string) => {
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (err: any) {
    console.error(`Error creating directory: ${err.message}`);
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dateFolder = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const destinationDirectory = path.join('./public/petPoojaFiles', dateFolder);
    await ensureDirectoryExists(destinationDirectory);
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.xlsx');
  },
});

const fileFilter = (req: Request, file: any, cb: CallableFunction) => {
  if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return cb(new Error('File type not supported'), false);
  }
  // if (!allowedFileNames.includes(file.originalname)) {
  //   return cb(new Error('File name not allowed'), false);
  // }
  cb(null, true);
};

const uploadPetPoojaFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.decodeToken;
    const upload = multer({ storage, fileFilter, preservePath: true }).fields([
      { name: 'Item_Report_With_Customer_Order', maxCount: 1 },
      { name: 'Order_Audit_Item_Wise', maxCount: 1 },
      { name: 'Orders_Master_Report', maxCount: 1 },
      { name: 'Order_Modification_Reports', maxCount: 1 },
      { name: 'Order_Report_payment_wise', maxCount: 1 },
      { name: 'Dis_Orders_summary', maxCount: 1 },
      { name: 'Zomato', maxCount: 1 },
      { name: 'Swiggy', maxCount: 1 },
      { name: 'sale_report_online_platforms', maxCount: 1 },
    ]);

    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading files:', err);
        return res.status(500).send('An error occurred during upload.');
      }

      if (typeof req.files === 'object' && req.files !== null) {
        const requiredFiles = ['Item_Report_With_Customer_Order', 'Orders_Master_Report', 'Order_Report_payment_wise'];

        const uploadedFileNames = Object.keys(req.files);
        console.log('🚀 ~ upload ~ uploadedFileNames:', uploadedFileNames);
        const missingFiles = requiredFiles.filter((file) => !uploadedFileNames.includes(file));

        if (missingFiles.length > 0) {
          return res.status(400).send(`The following required files are missing: ${missingFiles.join(', ')}`);
        }

        console.log('🚀 ~ upload ~ files:', Object.values(req.files));
      } else {
        console.error('req.files is in an unexpected format. Please investigate.');
        return res.status(500).send('An internal server error occurred.');
      }
      req.body.decodeToken = token;
      next();
    });
  } catch (error) {
    return res.status(500).send('An error occurred during upload.');
  }
};
//HR File Upload Local

const uploadExpenseFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.decodeToken;
    const restaurantID = req.body.restaurantId;
    const fieldName = 'expense_day_book';

    const upload = multer({ storage: expensesTallyDataStorage, preservePath: true }).single(fieldName);
    upload(req, res, async (error) => {
      if (error) {
        console.error('Error uploading expenses:', error);
        return res.status(500).send('An error occurred during upload.');
      }
      const file = req.file;
      if (typeof req.file === 'object' && req.files !== null) {
        req.body.decodeToken = token;
        req.body.restaurantId = restaurantID;
        next();
      } else if (Array.isArray(req.files)) {
        console.warn('req.files is an unexpected array format. Please investigate.');
      } else {
        console.error('req.files is in an unexpected format. Please investigate s.');
        return res.status(500).send('An internal server error occurred.');
      }
    });
  } catch (error) {
    next(error);
  }
};

export { uploadPetPoojaFiles, uploadExpenseFiles };
