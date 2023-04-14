const express = require('express');

const router = express.Router();

// access the user js file 
const userController = require('../controllers/user_controller');

// console.log("user controller is running")

// get router map 
router.get('/profile', userController.profile);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create)

module.exports = router;