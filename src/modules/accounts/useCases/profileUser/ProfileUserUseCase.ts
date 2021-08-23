import { IUserResponseDTO } from '@modules/accounts/dtos/IUserReponseDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(user_id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
