const passport = require('passport');

const LocalStategy = require('passport-local').Strategy;

const User = require('../models/user');

// autherntication using passport
passport.use(new LocalStategy({
    usernameField: "email"
}, async function (email, password, done) {
    try {
        console.log('inside local stategy', email, password);
        let user = await User.findOne({ email: email });

        if (!user || user.password != password) {
            console.log("invalid username / password");
            return done(null, false);
        }
        return done(null, user)
    } catch (error) {
        console.log("inside catch ", err);
        return done(err);
    }

}
));


//serialzing the user to decided which key is to kept in the cookies
passport.serializeUser(function (user, done) {
    // console.log("serializeUser is called")
    done(null, user.id);
});


//deserialize user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    // User.findOne(id).then(function (user, err) {
    //     if (err) {
    //         console.log("error in finding user ------> passport11")
    //         return done(err);
    //     }
    //     return done(null, user)
    // });


    try {
        // console.log('DeSerialize User is called ');
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log("Error in finding a user-->Passport");
        return done(err);
    }
});


// check if the user is authenticate
passport.checkAuthentication = function (req, res, next) {
    // if hte user is signed in, then pass on the request ot the next function (controller's action )
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not digned in 
    return res.redirect('/user/sign-in');
}


passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are jsut sending this t the locals for the views
        res.locals.user = req.user;
        // console.log(req.user.name);// it will print name and below email
        // console.log(req.user.email);


    }

    next();
}







module.exports = passport;