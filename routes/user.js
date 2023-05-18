const express = require('express');

const router = express.Router();

// cookeis
const passport = require('passport');

// access the user js file 
const userController = require('../controllers/user_controller');

// console.log("user controller is running")

// get router map 
router.get('/profile/:id', passport.checkAuthentication, userController.profile); //error on  line 14 pasport.checkAuthenctication
router.post('/update/:id', passport.checkAuthentication, userController.update); //error on  line 14 pasport.checkAuthenctication

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), userController.creatSession);

router.get('/sign-out', userController.destroySession);


// google sign in
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/signin' }), userController.creatSession);

router.post('/forget' , userController.forget );

router.get('/forget/:token', userController.newPassword);

router.post('/forget/:token', userController.changePassword);

module.exports = router;