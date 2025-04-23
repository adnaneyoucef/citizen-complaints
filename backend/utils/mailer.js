const nodemailer = require('nodemailer');

// Configure your email transport here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // Your Gmail address
    pass: process.env.MAIL_PASS  // App password
  }
});

async function sendMail({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
    ...(html ? { html } : {})
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
