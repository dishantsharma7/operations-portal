import prisma_client from '../config/prisma';
import { BadRequestError } from './ApiError';

export const createRow = async (tableName: any, data: any) => {
  try {
    const result = await tableName.create({
      data: data,
    });
    return result;
  } catch (error) {
    console.log('🚀 ~ createRow ~ error:', error);
  }
};

export const findMany = async (tableName: any) => {
  const result = await tableName.findMany();
  return result;
};
export const findUnique = async (tableName: any, where: any) => {
  try {
    const result = await tableName.findUnique({ where: where });
    return result;
  } catch (error: any) {
    console.log('Error is caused by :', error);
    throw new BadRequestError(error);
  }
};

export const findFirst = async (tableName: any, where: any) => {
  try {
    const result = await tableName.findFirst({ where: where });
    return result;
  } catch (error: any) {
    console.log('Error is caused by :', error);
    throw new BadRequestError(error);
  }
};

export const updateRow = async (tableName: any, where: any, data: any) => {
  try {
    const result = await tableName.update({
      data: data,
      where: where,
    });
    return result;
  } catch (error) {
    console.log('🚀 ~ updateRow ~ error:', error);
  }
};
//Check if the  already exists then update
export const alreadyExistsThenUpdate = async (tableName: any, where: any, data: any) => {
  console.log('🚀 ~ alreadyExistsThenUpdate ~ data:', data);
  try {
    const alreadyExists = await findUnique(tableName, where);
    if (alreadyExists) {
      const update = await updateRow(tableName, where, data);
      return update;
    }
  } catch (error) {
    console.log('🚀 ~ alreadyExistsThenUpdate ~ error:', error);
    throw new BadRequestError('Error Occurred alreadyExistsThenUpdate');
  }
};
//Check if already exist if not then create
export const alreadyExistsIfNotThenCreate = async (tableName: any, where: any, data: any) => {
  try {
    const alreadyExists = await findUnique(tableName, where);
    if (!alreadyExists) {
      const create = await createRow(tableName, data);
      return create;
    }
  } catch (error) {
    console.log('Error occurred in alreadyExistsIfNotThenCreate');

    throw new BadRequestError('Error Occurred alreadyExistsIfNotThenCreate');
  }
};
//find Unique from table x and update in y
export const findInXAndUpdateInY = async (tableName: any, where: any, data: any, secondTable: any) => {
  try {
    const findUniqueRow = await findUnique(tableName, where);

    if (findUniqueRow) {
      const data2 = { discount_couponsID: findUniqueRow.id };
      const update = await updateRow(secondTable, { id: data.id }, data2);
      return update;
    }
  } catch (error) {
    throw new BadRequestError('Error Occurred findInXAndUpdateInY');
  }
};
