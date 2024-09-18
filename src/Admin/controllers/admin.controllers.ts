import { NextFunction, Request, Response } from 'express';
import * as adminServices from '../services/admin.services';

const createExpenseCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseCategoryData = req.body;

    const newExpenseCategory = await adminServices.createExpenseCategoryService(expenseCategoryData);

    return newExpenseCategory.send(res);
  } catch (error) {
    next(error);
  }
};
const updateExpenseCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedExpenseCategoryData = req.body;

    const updatedCategory = await adminServices.updateExpenseCategoryService(id, updatedExpenseCategoryData);

    return updatedCategory.send(res);
  } catch (error) {
    next(error);
  }
};

const getExpenseCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await adminServices.getExpenseCategoryService();
    return categories.send(res);
  } catch (error) {
    next(error);
  }
};
const getRestaurantListController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminServices.getRestaurantListService();
    return data.send(res);
  } catch (error) {
    next(error);
  }
};

export { createExpenseCategoryController, updateExpenseCategoryController, getExpenseCategoriesController, getRestaurantListController };
