const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
 
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'russ.haag59@ethereal.email',
        pass: 'XCuqFmSZJPQSgaT2fU'
    }
});

module.exports=transporter;