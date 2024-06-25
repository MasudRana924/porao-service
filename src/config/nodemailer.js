const nodemailer = require('nodemailer');
const sendVerificationEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
         port: 465,
         service: 'gmail',
        auth: {
          user: 'masud.cse.dev@gmail.com',
          pass: 'piff lwiq rzbj pybz',
        },
      });
    const mailOptions = {
        from: 'masud.cse.dev@gmail.com',
        to: email,
        subject: 'Porao ',
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