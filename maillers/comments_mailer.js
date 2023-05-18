const nodemailer = require('../config/nodemainer');


// this is another way of exporting a menhod
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    //  console.log("inside newComment mialer");

    nodemailer.transporter.sendMail({
        from: 'mrpkdmk01@gmail.com', // this is not importand 
        to: comment.user.email,
        subject: "New Comment Published!",
        // html: '<h1>Yap, your comment is now published!</h1>'
        html: htmlString

    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        // console.log("message sent", info);
        console.log("message sent");
        return;
    }
    )
}