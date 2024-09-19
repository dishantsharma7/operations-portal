import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dlxkwh4xi',
  api_key: '734728718881633',
  api_secret: '7CTaIgcMyQhGWoDhdPEYT3Ozy7s',
});

async function createFolderStructure(fileName: string, restaurantId: string, userId: string): Promise<string> {
  const baseFolder = `${fileName}/${restaurantId}`;

  const fullPath = `${baseFolder}/${userId}/${new Date().toISOString().split('T')[0]}`.replace(/\\/g, '/');

  try {
    await cloudinary.api.create_folder(fullPath, { folder: fullPath });
    return fullPath;
  } catch (error) {
    console.error('Error creating folder structure:', error);
    throw error;
  }
}

export const petPoojaUploadOnServer = async (petPoojaFileStoragePath: string, restaurantId: string, userId: string) => {
  try {
    if (!petPoojaFileStoragePath) {
      return null;
    }
    const folderPath = await createFolderStructure('petPoojaData', restaurantId, userId);
    const response = await cloudinary.uploader.upload(petPoojaFileStoragePath, {
      folder: folderPath,
      resource_type: 'auto',
    });
    if (response) {
      console.log("🚀 ~ petPoojaUploadOnServer ~ response:", response)
      await fs.unlink(petPoojaFileStoragePath);
      return response;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
export const expenseTallyDataUploadOnServer = async (expenseTallyDataFileStoragePath: string, restaurantId: string, userId: string) => {
  try {
    if (!expenseTallyDataFileStoragePath) {
      return null;
    }
    const folderPath = await createFolderStructure('expenses', restaurantId, userId);
    const response = await cloudinary.uploader.upload(expenseTallyDataFileStoragePath, {
      folder: folderPath,
      resource_type: 'auto',
    });
    // await fs.unlink(petPoojaFileStoragePath);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
