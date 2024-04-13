import 'dotenv/config';
import nodemailer from 'nodemailer';

import { smpt } from "../../server/config/smtp";

export function sendEmailAdapter(email, token) {
  const transporter = nodemailer.createTransport({
    host: smpt.host,
    port: smpt.port,
    secure: false,
    auth: {
      user: smpt.user,
      pass: smpt.password
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Enviando de Autenticação',
    html: `<h1>Segue token de autenticação!</h1></br><h2>${token}</h2>`,
    text: '123456'
  })
    .catch((err) => console.log(err));
}
