import express, { NextFunction, Request, Response } from 'express';
import { read, utils } from 'xlsx'; // Import necessary functions
import { petPoojaFilesStructure } from './allowedFileNames';
import { readFileSync } from 'fs';
import { checkColumns } from './checkColumn';
import { checkColumnsInFile } from '../checkColumns/checkColumnsInFiles';
import { BadRequestResponse } from '../../core/ApiResponse';
export const checkFilesBeforeUploading = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.decodeToken;
    if (Array.isArray(req.files)) {
      return next(new Error('No files uploaded'));
    }
    for (const uploadedFileName in req.files) {
      for (const staticStoredFileName in petPoojaFilesStructure) {
        if (staticStoredFileName == uploadedFileName) {
          const uploadedFile: any = req.files[uploadedFileName][0];
          const staticData = petPoojaFilesStructure[staticStoredFileName as keyof typeof petPoojaFilesStructure];
          console.log('🚀 ~ checkFilesBeforeUploading ~ staticData:', staticData);
          // await checkColumns(uploadedFile, staticData);
          (await checkColumnsInFile(uploadedFile, staticData?.column)).rowWithAllColumns && true;
        }
      }
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }

  return next();
};
