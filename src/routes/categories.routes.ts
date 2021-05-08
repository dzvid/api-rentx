import { createCategoryController } from '@modules/cars/useCases/createCategory';
import { Router } from 'express';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

// categoriesRoutes.get('/', (request, response) => {
//   const categories = categoriesRepository.list();

//   return response.json(categories);
// });

export { categoriesRoutes };
