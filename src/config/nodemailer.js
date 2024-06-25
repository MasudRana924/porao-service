const nodemailer = require('nodemailer');
const sendVerificationEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
         port: 465,
         service: 'gmail',
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
        },
      });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Verification OTP',
        text: `Your verification code is: ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendVerificationEmail;