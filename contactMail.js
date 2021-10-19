const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'almacustomerserviceil@gmail.com',
    pass: '*******' 
  }
});

const sendMail = (number, name, subject, email,message)=>{
    const mailOptions = {
        from: '"ALMA WEBSITE" <almacustomerserviceil@gmail.com>',
        to: 'almacustomerserviceil@gmail.com',
        name: name,
        number: number,
        subject: subject,
        text: "שם:"+name+
            " טלפון:"+number+
            " כתובת מייל:"+email+
            " הודעה:"+message
   
    };
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(error);
        } else {
            
            console.log('Email sent: ' + info.response);
            
        }
        });
    }
    module.exports = sendMail;







