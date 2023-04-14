const express = require('express');

const router = express.Router();

// access the user js file 
const contactController = require('../controllers/cont_controller');

// console.log("user controller is running")

// get router map 
router.get('/contact', contactController.contact);

module.exports = router;