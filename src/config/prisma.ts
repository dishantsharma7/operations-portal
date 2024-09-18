import { PrismaClient } from '@prisma/client';

// const prisma_client = async (): Promise<PrismaClient> => {
//   try {
//     return new PrismaClient();
//   } catch (error) {
//     console.error('Error occurred while initializing Prisma Client:', error);
//     throw error;
//   }
// };
const prisma_client = new PrismaClient();


export default prisma_client;
