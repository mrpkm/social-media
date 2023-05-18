const User = require('../models/user')
const fs = require('fs');
const path = require('path');
const Forget = require('../models/forget');
const crypto = require('crypto');
const resetPasswordMailer = require('../maillers/reset_password_mailer')

module.exports.profile = function (req, res) {
    // return res.end('<h1>this is a profile page</h1>')
    // return res.render('user', {
    //     title: "profile",
    //     user_profile; 
    // })
    User.findById(req.params.id, function (err, user) {
        return res.render('user', {
            title: "Users profile!!!",
            profile_user: user
        });
    });
}


// update name and email
module.exports.update = async function (req, res) {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         return res.redirect('back')
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log("****multer err", err) };

                // console.log(req.file)
                user.name = req.body.name;
                if (req.file) {


                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is a saving the path of the upload into the avater file
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back')
            })

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        req.flash('error', 'Unauthorized!');
        return res.redirect('back');
    }
}

// user sing up render
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }


    return res.render('user_sign_up', {
        title: "codeal | signup"
    });
};
// user sign in render
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }


    return res.render('user_sign_in', {
        title: "codeal | signIn"
    });
};

// get the sing up data
module.exports.create = function (req, res) {
    // console.log(req.body);
    if (req.body.password != req.body.conform_password) {
        alert("password not match")
        console.log("password not match!!");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then(function (user, err) {
        // console.log(req.body);
        if (err) { console.log("error in finding user sign up"); return; };

        if (!user) {
            User.create(req.body).then(function (user, err) {

                if (err) { console.log("error in crating user sign up"); return; };
                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back');

        }   
    })

};
// sing in and creat a session for the user
module.exports.creatSession = function (req, res) {
    req.flash('success', 'Logged in successfully')
    return res.redirect('/')
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash('success', 'you have logged out')
        res.redirect("/");

    });

}


// forget password
module.exports.forget = async function (req, res) {
    const email = req.body.email;
    // console.log(email)
    const user = await User.findOne({
        email: email
    })
    let resetToken = await Forget.create({
        user: user._id,
        accessToken: crypto.randomBytes(20).toString('hex'),
        isValid: true
    })
    resetToken = await resetToken.populate('user');
    resetPasswordMailer.resetPassword(resetToken);

    res.redirect('/users/sign-in');
}

module.exports.newPassword = async function (req, res) {
    const token = req.params.token;
    const resetPassword = await Forget.findOne({
        accessToken: token
    })
    res.render('new_password', {
        resetPasswordToken: resetPassword
    })
}


module.exports.changePassword = async function (req, res) {
    const token = req.params.token;
    if (req.body.password == req.body.confirm_password) {
        let resetPassword = await Forget.findOne({
            accessToken: token
        })
        const user = await User.findById(resetPassword.user);
        let updatedUser = await User.findOneAndUpdate(
            { _id: user },
            {
                password: req.body.password,
            },
            { new: true }
        );

        console.log(updatedUser);

        resetPassword = await Forget.findOneAndUpdate(
            {
                accessToken: req.params.token,
            },
            {
                isValid: false,
            },
            {
                new: true,
            }
        );
    }
    res.redirect('/users/sign-in')

}