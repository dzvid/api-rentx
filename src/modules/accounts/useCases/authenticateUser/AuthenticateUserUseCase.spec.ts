import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '001235',
      email: 'user@test.com',
      password: '0123456789',
      name: 'Johnson Test',
    };
    const authUser = {
      email: user.email,
      password: user.password,
    };

    await createUserUseCase.execute(user);

    const authResult = await authenticateUserUseCase.execute(authUser);

    expect(authResult).toHaveProperty('token');
  });

  it('should not be able to not authenticate an non-existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexistantuser@test.com',
        password: 'f4k3p4ss',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '591878',
        email: 'user@test.com',
        password: '123456',
        name: 'Johnson Test',
      };
      const authUser = {
        email: user.email,
        password: 'incorrectPassword',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute(authUser);
    }).rejects.toBeInstanceOf(AppError);
  });
});
