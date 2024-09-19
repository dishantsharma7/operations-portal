import fs from 'fs/promises'
import multer from 'multer';
import path from 'path';

export const ensureDirectoryExists = async (directory: string) => {
    try {
      await fs.mkdir(directory, { recursive: true });
    } catch (err: any) {
      console.error(`Error creating directory: ${err.message}`);
    }
  };


 export const expensesTallyDataStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const dateFolder = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const destinationDirectory = path.join('./public/expenses', dateFolder);
      await ensureDirectoryExists(destinationDirectory);
      cb(null, destinationDirectory);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '.xml');
    },
  });

 