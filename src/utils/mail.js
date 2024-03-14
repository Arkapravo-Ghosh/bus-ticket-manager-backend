import nodemailer from "nodemailer";
import mailConfig from "../config/mailConfig.js";

const transporter = nodemailer.createTransport(mailConfig);

const sendMail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: mailConfig.auth.user,
      to: to,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  };
};

export default sendMail;