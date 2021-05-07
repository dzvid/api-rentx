import { ISpecificationRepository } from '../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}
class CreateSpecificationService {
  private specificationsRepository: ISpecificationRepository;

  constructor(specificationsRepository: ISpecificationRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };
