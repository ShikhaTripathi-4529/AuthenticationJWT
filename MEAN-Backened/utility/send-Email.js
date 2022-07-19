const nodemailer = require("nodemailer");

module.exports = async function () {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "1816510119@kit.ac.in", // Sender address
    to: "shikhatripathi22101@gmail.com", // List of recipients
    subject: "Node Mailer", // Subject line
    text: "Hello People!, I am implememting nodemailer !", // Plain text body
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
