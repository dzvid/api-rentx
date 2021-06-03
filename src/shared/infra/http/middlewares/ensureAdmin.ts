import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

import { usersRoutes } from '../routes/users.routes';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('User is not an admin!');
  }

  return next();
}
