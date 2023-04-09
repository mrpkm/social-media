const express = require('express');

const router = express.Router();

// import form contorler
const homeController = require('../controllers/home_controller')

console.log("router loaded ")

router.get('/', homeController.home);

module.exports = router;