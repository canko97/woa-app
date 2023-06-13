import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';

const transporter = nodemailer.createTransport({
  service: config.get<string>('smtp.service'),
  auth: {
    user: config.get<string>('smtp.auth.user'),
    pass: config.get<string>('smtp.auth.pass'),
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.error(err, 'Error sending mail');
      return;
    }

    console.info(`Preview URL: ${payload.text}`);
  });
}
export default sendEmail;
