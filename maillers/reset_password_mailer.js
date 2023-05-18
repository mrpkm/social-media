const nodemailer = require('../config/nodemainer');


module.exports.resetPassword = (passwordToken) => {
    console.log(passwordToken);
    let htmlString = nodemailer.renderTemplate({ token: passwordToken.accessToken, user: passwordToken.user }, 'forget.ejs');
    console.log("inside reset forget password mialer");

    nodemailer.transporter.sendMail({
        from: 'mrpkdmk01@gmail.com', // this is not importand 
        to: passwordToken.user.email,
        subject: "New reset Published!",
        // html: '<h1>Yap, your comment is now published!</h1>'
        html: htmlString

    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        // console.log("message sent", info);
        console.log(" reset message sent");
        return;
    }
    )
}