import { PrismaClient } from '@prisma/client';
import prisma_client from '../config/prisma';
export const promiseAllRowsOnBasisOfId = async (values: any, tableName: keyof PrismaClient, columnName: string) => {
  const prismaTable = prisma_client[tableName] as any;
  const results = await Promise.all(
    values.map(async (value: any) => {
      const whereClause = { [columnName]: value.id };
      const response = await prismaTable.findMany({ where: whereClause });
      return response;
    }),
  );
  return results;
};
