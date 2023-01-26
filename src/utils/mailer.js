const nodemailer = require("nodemailer");

require("dotenv").config();

const trasnporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: "true",
  auth: {
    user: "danihr1314@gmail.com",
    pass: process.env.G_PASSWORD,
  },
});

module.exports = trasnporter;
