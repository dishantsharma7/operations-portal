import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dlxkwh4xi',
  api_key: '734728718881633',
  api_secret: '7CTaIgcMyQhGWoDhdPEYT3Ozy7s',
});

async function createFolderStructure(restaurantId: string, userId: string): Promise<string> {
  const baseFolder = `hrFile/${restaurantId}`;

  const fullPath = `${baseFolder}/${userId}/${new Date().toISOString().split('T')[0]}`.replace(/\\/g, '/');

  try {
    await cloudinary.api.create_folder(fullPath, { folder: fullPath });
    return fullPath;
  } catch (error) {
    console.error('Error creating folder structure:', error);
    throw error;
  }
}

export const hrFileUploadOnServer = async (hrFileFileStoragePath: string, restaurantId: string, userId: string) => {
  try {
    if (!hrFileFileStoragePath) {
      return null;
    }
    const folderPath = await createFolderStructure(restaurantId, userId);
    const response = await cloudinary.uploader.upload(hrFileFileStoragePath, {
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
