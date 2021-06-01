import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car test',
      description: 'Text desc',
      daily_rate: 100,
      license_plate: 'ADBew312',
      fine_amount: 60,
      brand: 'bmw',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with an existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Text desc',
        daily_rate: 100,
        license_plate: 'SAME-LICENSE-123',
        fine_amount: 60,
        brand: 'bmw',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Text desc',
        daily_rate: 100,
        license_plate: 'SAME-LICENSE-123',
        fine_amount: 60,
        brand: 'bmw',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available=true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Text desc',
      daily_rate: 100,
      license_plate: 'AVA123',
      fine_amount: 60,
      brand: 'gol',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
