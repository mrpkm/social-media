const express = require('express');

const router = express.Router();

// access the user js file 
const userController = require('../controllers/user_controller');

// console.log("user controller is running")

// get router map 
router.get('/profile', userController.profile);

module.exports = router;