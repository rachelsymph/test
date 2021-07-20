import { User } from 'src/commons/types/User.type';
import BadRequestError from 'src/server/errors/BadRequestError';
import NotFoundError from 'src/server/errors/NotFoundError';
import UnauthenticatedError from 'src/server/errors/UnauthenticatedError';
import { findOne } from 'src/server/models/UserModel';
import { createUser } from 'src/server/services/UserService';
import { comparePassword, hashPassword } from 'src/server/utils/HashUtils';

type AuthenticateParams = {
  username: string;
  password: string;
};

type RegisterParams = {
  email: string;
  name: string;
  password: string;
  username: string;
};

export async function authenticate(
  params: AuthenticateParams
): Promise<User | Error> {
  const user = await findOne({
    username: params.username,
  });

  if (!user) {
    throw new NotFoundError('Oops! Specified account does not exist.');
  }

  const isValidPassword = comparePassword(
    params.password,
    user.password as string
  );

  if (!isValidPassword) {
    throw new UnauthenticatedError('Oops! Invalid login credentials.');
  }

  return user;
}

export async function register(params: RegisterParams) {
  const userWithSameEmail = await findOne({
    email: params.email,
  });

  if (userWithSameEmail) {
    throw new BadRequestError('Oops! Email is already used.');
  }

  const userWithSameUsername = await findOne({
    username: params.username,
  });

  if (userWithSameUsername) {
    throw new BadRequestError('Oops! Username is already used.');
  }

  return createUser(({
    email: params.email,
    username: params.username,
    password: hashPassword(params.password),
    dateCreated: new Date(),
    dateUpdated: new Date(),
  } as unknown) as User);
}
