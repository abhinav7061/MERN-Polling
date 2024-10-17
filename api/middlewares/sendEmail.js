const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
      secure: false,
      port: 587,
      retry: true,
      maxRetry: 3,
      pool: true,
    });
    transporter.verify((error, success) => {
      if (error) {
        console.log({ error });
        return;
      }
      console.log("Server is ready to send messages");
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options?.message,
      html: options?.html,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};
