import express from 'express';
import cors from 'cors';

import db from './database/db.js';

import { signUpController } from './application/controllers/SignUpController';
import { signInUseController } from './application/controllers/SignInUseController.js';
import { authenticationMiddleware } from './application/middlewares/AuthenticationMiddleware.js';


const app = express();

app.use(express.json());
app.use(cors());

db.sync()
  .then(() => console.log(`Banco de dados conectado: appAuth`));

app.post('/sign-up', signUpController.handle);
app.post('/sign-in', signInUseController.handle);

app.get('/main', authenticationMiddleware.handle);

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
})

