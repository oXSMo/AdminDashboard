import nodemailer from "nodemailer";

export const Mailer = ({ email, text, subject }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fixiiit04@gmail.com",
      pass: process.env.APPPASS,
    },
  });

  const mailOptions = {
    from: "fixiiit04@gmail.com",
    to: email,
    subject: subject || "Fix-iiit Send Email",
    html: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log({ error });
    } else {
      console.log({ message: info.response });
    }
  });

  return transporter;
};
