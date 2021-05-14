// inicialização do usecase
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';

import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUsecase } from './CreateCategoryUseCase';

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUsecase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
