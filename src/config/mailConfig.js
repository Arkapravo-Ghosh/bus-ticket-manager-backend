const mailOptions = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWD,
  },
  tls: {
    ciphers: "SSLv3",
  },
};

export default mailOptions;