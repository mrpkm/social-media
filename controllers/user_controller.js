const User = require('../models/user')

module.exports.profile = function (req, res) {
    // return res.end('<h1>this is a profile page</h1>')
    // return res.render('user', {
    //     title: "profile",
    //     user_profile; 
    // })
    User.findById(req.params.id).then(users => {
        return res.render('user', {
            title: "Users profile!!!",
            // profile_user: users
        });
    });
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
                return res.redirect('/user/sign-in')
            })
        } else {
            return res.redirect('back');

        }
    })

};
// sing in and creat a session for the user
module.exports.creatSession = function (req, res) {
    return res.redirect('/')
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });

}