import { hash } from 'bcryptjs';
import usersModel from '../../model/usersModel';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

export async function SignUpUseCase({ name, email, phone, password }) {
  const SALT = 10;

  const accountAlreadyExists = await usersModel.findOne({
    where: {
      email: email
    },
    attributes: ['email']
  });

  if (accountAlreadyExists) {
    throw new AccountAlreadyExists();
  }

  const hashedToken = await hash(password, SALT);

  usersModel.create({
    name,
    email,
    phone,
    password: hashedToken
  });
}
