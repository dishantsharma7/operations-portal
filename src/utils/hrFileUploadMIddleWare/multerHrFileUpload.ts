import multer from 'multer';
import fs from 'fs/promises'; // Using promises for cleaner asynchronous handling
import path from 'path'; // Added for path manipulation
import { Request, Response, NextFunction } from 'express';

const ensureDirectoryExists = async (directory: string) => {
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (err: any) {
    console.error(`Error creating directory: ${err.message}`);
  }
};

const fileFilter = (req: Request, file: any, cb: CallableFunction) => {
  if (file.mimetype !== 'application/vnd.ms-excel') {
    return cb(new Error('File type not supported'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dateFolder = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const destinationDirectory = path.join('', dateFolder);
    await ensureDirectoryExists(destinationDirectory);
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.xlsx');
  },
});

const uploadLocallyHrComputaxFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.decodeToken;
    const restaurantID = req.body.restaurantId;
    const upload = multer({ storage, fileFilter, preservePath: true }).single('HrComputaxFile');
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading files:', err);
        return res.status(500).send('An error occurred during Hr Computax file uploading on local server.');
      }
      req.body.decodeToken = token;
      req.body.restaurantId = restaurantID;
      return next();
    });
  } catch (error) {
    return res.status(500).send('An error occurred during upload.');
  }
};
export { uploadLocallyHrComputaxFile };
