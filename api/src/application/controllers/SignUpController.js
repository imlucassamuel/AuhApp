import { ZodError, z } from 'zod'

import { SignUpUseCase } from "../useCases/SignUpUseCase";
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';


const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
  phone: z.string().min(10),
});

class SignUpController {
  async handle(request, response) {
    try {
      const { email, name, phone, password } = schema.parse(request.body);

      await SignUpUseCase({ email, name, phone, password });

      response.sendStatus(204);
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(400).json({
          message: error.issues,
        });
      }

      if (error instanceof AccountAlreadyExists) {
        response.status(409).json({
          message: 'This e-mail is already in use',
        });
      }
    }
  }

}

export const signUpController = new SignUpController()
