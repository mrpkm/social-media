const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new stategy for google login
passport.use(new googleStrategy({
    clientID: "359122420392-a9jm96akof54047qeb9gn3s95p9vet9p.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",

},
    function (accessToken, refreshToken, profile, done) {
        // find the user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strtegy-passport', err); return; }

            console.log(profile);

            if (user) {
                //if found set this user to as req.body
                return done(null, user);
            } else {
                //if not found then set the user and 
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },
                    function (err, user) {
                        if (err) { console.log('error in google strtegy-passport', err); return; }

                        return done(null, user);

                    });
            }
        });
    }
));

module.exports = passport;