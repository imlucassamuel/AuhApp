import { verify } from 'jsonwebtoken'

import 'dotenv/config';

class AuthenticationMiddleware {
  async handle(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {

      response.status(401)
        .json({
          body: {
            message: 'Invalid access token.'
          }
        })
    }

    try {
      const [type, token] = authorization.split(' ');

      if (type !== 'Bearer') {
        throw new Error();
      }

      const { sub } = verify(token, process.env.JWT_SECRET);

      response.status(200).json({
        data: {
          email: sub
        }
      });
    } catch {
      response.status(401)
        .json({
          message: 'Invalid access token.'
        });
    }
  }
}

export const authenticationMiddleware = new AuthenticationMiddleware();
