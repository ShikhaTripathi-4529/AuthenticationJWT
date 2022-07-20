const dotenv = require("dotenv");

const nodemailer = require("nodemailer");

dotenv.config({ path: "./routes/.env" });

module.exports = {
  send: async (data) => {
    var transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME, // ADMIN GMAIL ID
        pass: process.env.EMAIL_PASSWORD, // ADMIN GMAIL PASSWORD
      },
    });

    const mailOptions = {
      from: data.EMAIL_USERNAME, // Sender address
      to: data.email, // List of recipients
      subject: data.subject, // Subject line
      html: data.html, // Plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error is " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
