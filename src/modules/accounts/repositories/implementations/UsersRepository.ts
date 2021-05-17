import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private respository: Repository<User>;

  constructor() {
    this.respository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, username, email, password, driver_license } = data;
    const user = this.respository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });

    await this.respository.save(user);
  }
}

export { UsersRepository };
