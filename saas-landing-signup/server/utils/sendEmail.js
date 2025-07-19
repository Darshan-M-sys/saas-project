const nodemailer = require('nodemailer');

const sendEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const link = `${process.env.BASE_URL}/api/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify your Email',
    html: `<p>Click to verify: <a href="${link}">${link}</a></p>`
  });
};

module.exports = sendEmail;
