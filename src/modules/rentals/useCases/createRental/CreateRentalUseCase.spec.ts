import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dateAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'Test brand',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: dateAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    const user_id = '12354';

    await rentalsRepositoryInMemory.create({
      user_id,
      car_id: '111913',
      expected_return_date: dateAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id,
        car_id: '121212',
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it('should not be able to create a new rental if there is another open rental to the same car', async () => {
    const car_id = '1212';

    await rentalsRepositoryInMemory.create({
      car_id,
      user_id: '223385',
      expected_return_date: dateAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '3210',
        car_id,
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable!'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '0123',
        car_id: '25455',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Minimal rental period is 24 hours!'));
  });
});
