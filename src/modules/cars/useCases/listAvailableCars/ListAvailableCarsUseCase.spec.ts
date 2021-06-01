import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A1',
      description: 'Orange car',
      daily_rate: 129.52,
      license_plate: 'D1234',
      fine_amount: 23,
      brand: 'Audi',
      category_id: 'd1c7927f-af1c-4aab-b769-c1279b3f7e17',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Gol',
      description: 'Gol bolinha',
      daily_rate: 40.0,
      license_plate: 'ABDA12',
      fine_amount: 2.0,
      brand: 'Volkswagen',
      category_id: 'd1c7927f-af1c-4aab-b769-c1279b3f7e17',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Volkswagen',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Milefire',
      description: 'Um tipo de uno',
      daily_rate: 50.0,
      license_plate: 'MILE-333',
      fine_amount: 4.0,
      brand: 'Fiat',
      category_id: 'd1c7927f-af1c-4aab-b769-c1279b3f7e17',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Milefire' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'L200',
      description: 'Pickup 4x4',
      daily_rate: 70.0,
      license_plate: 'L200-SIRN',
      fine_amount: 5.0,
      brand: 'Mitsubish',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
