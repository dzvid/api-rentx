import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: '121212',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    expect(async () => {
      const expected_return_date = new Date();
      const user_id = '12354';

      await createRentalUseCase.execute({
        user_id,
        car_id: '12234',
        expected_return_date,
      });

      await createRentalUseCase.execute({
        user_id,
        car_id: '121212',
        expected_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open rental to the same car', async () => {
    expect(async () => {
      const expected_return_date = new Date();
      const car_id = '1212';

      await createRentalUseCase.execute({
        user_id: '0123',
        car_id,
        expected_return_date,
      });

      await createRentalUseCase.execute({
        user_id: '3210',
        car_id,
        expected_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
