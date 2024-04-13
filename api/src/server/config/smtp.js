import 'dotenv/config';

export const smpt = {
  host: 'smtp.office365.com',
  port: 587,
  user: process.env.EMAIL_FROM,
  password: process.env.EMAIL_PASS,
}
