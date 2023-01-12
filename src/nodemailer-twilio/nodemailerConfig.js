const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
 
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

  module.exports=transporter;