const express = require('express');

const router = express.Router();

// import form contorler
const homeController = require('../controllers/home_controller')

console.log("router loaded ")

router.get('/', homeController.home);
//user router
router.use('/user', require('./user'));
//contact router
router.use('/contact', require('./cont'));

// for any future ruter access from here
// router.use('/routerName', require('./routerfile'))

module.exports = router;