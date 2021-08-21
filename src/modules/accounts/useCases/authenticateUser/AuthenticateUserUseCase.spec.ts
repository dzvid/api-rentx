import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
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

  it('should not be able to not authenticate an non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'nonexistantuser@test.com',
        password: 'f4k3p4ss',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
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

    await expect(authenticateUserUseCase.execute(authUser)).rejects.toEqual(
      new AppError('Email or password incorrect!')
    );
  });
});
