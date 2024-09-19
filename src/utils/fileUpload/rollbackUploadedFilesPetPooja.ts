import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dlxkwh4xi',
  api_key: '734728718881633',
  api_secret: '7CTaIgcMyQhGWoDhdPEYT3Ozy7s',
});

// Rollback function to delete recently uploaded files
export const rollbackUploadedFiles = async (restaurantId: string, userId: string) => {
  try {
    const baseFolder = `petPoojaData/${restaurantId}/${userId}`;

    const currentDateFolder = new Date().toISOString().split('T')[0];

    const folderPath = `${baseFolder}/${currentDateFolder}`;
    console.log('🚀 ~ rollbackUploadedFiles ~ folderPath:', folderPath);
    const deletionResult = await cloudinary.api.delete_resources_by_prefix(folderPath);

    console.log('Deletion Result:', deletionResult);

    return deletionResult;
  } catch (error) {
    console.error('Error deleting uploaded files:', error);
    throw error;
  }
};
