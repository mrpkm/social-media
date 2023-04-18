const express = require('express');

const router = express.Router();

// cookeis
const passport = require('passport');

// access the user js file 
const userController = require('../controllers/user_controller');

// console.log("user controller is running")

// get router map 
router.get('/profile', passport.checkAuthentication, userController.profile); //error on  line 14 pasport.checkAuthenctication
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/user/sign-in' }
), userController.creatSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;