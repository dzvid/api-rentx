import { UsersRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it('should be able to send a  forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail');
    const user = {
      driver_license: '664168',
      email: 'avzonbop@ospo.pr',
      name: 'Blanche Curry',
      password: '1234',
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password mail if user does not exists', async () => {
    const user = {
      driver_license: '664168',
      email: 'ka@uj.gr',
      name: 'Blanche Curry',
      password: '1234',
    };

    await expect(
      sendForgotPasswordMailUseCase.execute(user.email)
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users forgot password token', async () => {
    const create = spyOn(usersTokensRepositoryInMemory, 'create');

    const user = {
      driver_license: '787330',
      email: 'abome@regrog.ee',
      name: 'Leo Perkins',
      password: '1234',
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(create).toHaveBeenCalled();
    expect(create).not.toThrow();
  });
});
