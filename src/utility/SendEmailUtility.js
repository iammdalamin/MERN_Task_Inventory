const nodemailer = require("nodemailer")

exports.SendEmailUtility = async (emailTo, emailText, emailSub) => {
    // console.log(emailTo, emailText, emailSub);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: process.env.PORT,
        auth: {
            user: `${process.env.EMAIL}`,
            pass:`${process.env.EMAIL_PASS}`,
        }
    })
    let mailOptions = {
        from: `${process.env.EMAIL}`,
        to: emailTo,
        subject: emailSub,
        text:emailText
    }

    return await transporter.sendMail(mailOptions)
}