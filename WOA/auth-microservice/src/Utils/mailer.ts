// import nodemailer, { SendMailOptions } from 'nodemailer';
// import config from 'config';
// import SMTPConnection from 'nodemailer/lib/smtp-connection';
// import log from './logger';

// // async function createTestCreds() {
// //   const creds = await nodemailer.createTestAccount();
// //   log.info({ creds });
// // }

// // createTestCreds();

// const smtp = config.get<{
//   user: string;
//   pass: string;
//   host: string;
//   port: number;
//   secure: boolean;
// }>('smtp');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'cankonedelchev@gmail.com',
//     pass: 'ppibpnomafeycnhr',
//   },
// });

// async function sendEmail(payload: SendMailOptions) {
//   transporter.sendMail(payload, (err, info) => {
//     if (err) {
//       log.error(err, 'Error sending mail');
//       return;
//     }

//     log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
//   });
// }
// export default sendEmail;
