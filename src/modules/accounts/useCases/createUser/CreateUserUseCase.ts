import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      email,
      password,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
