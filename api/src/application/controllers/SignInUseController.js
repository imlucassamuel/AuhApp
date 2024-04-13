import { ZodError, z } from 'zod'

import { InvalidCredentials } from '../errors/InvalidCredentials';
import { SignInUseCase } from '../useCases/SignInUseCase';

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

class SignInUseController {
  async handle(request, response) {
    try {
      const { email, password } = schema.parse(request.body);

      await SignInUseCase({ email, password });

      response.sendStatus(200);
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(400).json({
          message: error.issues,
        });
      }

      if (error instanceof InvalidCredentials) {
        response.status(401).json({
          message: 'This e-mail or password not exists',
        });
      }
    }
  }
}

export const signInUseController = new SignInUseController();
