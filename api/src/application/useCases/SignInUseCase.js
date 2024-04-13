import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs'

import 'dotenv/config';

import usersModel from '../../model/usersModel';

import { sendEmailAdapter } from '../../server/adapters/sendEmailAdapter';
import { InvalidCredentials } from '../errors/InvalidCredentials';

export async function SignInUseCase({ email, password }) {

  const account = await usersModel.findOne({
    where: {
      email: email
    },
    attributes: ['email', 'password']
  });

  if (!account) {
    throw new InvalidCredentials();
  }

  const isPasswordValid = await compare(password, account.password);

  if (!isPasswordValid) {
    throw new InvalidCredentials();
  }

  const accessToken = sign(
    { sub: account.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d', }
  );


  sendEmailAdapter(account.email, accessToken);
}
