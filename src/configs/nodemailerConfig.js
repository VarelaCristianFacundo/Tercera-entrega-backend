const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
 
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'brisa.stanton@ethereal.email',
        pass: 'wamCPWsapTSGEUwMW3'
    }
});

module.exports=transporter;