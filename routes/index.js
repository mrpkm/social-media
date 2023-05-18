const express = require('express');

const router = express.Router();

// import form contorler
const homeController = require('../controllers/home_controller')

console.log("router loaded ")

router.get('/', homeController.home);
//user router
router.use('/users', require('./user'));
//contact router
router.use('/contact', require('./cont'));

//15 post - to require posts path on router
router.use('/posts', require('./posts'))
// 16 post - go to form and action change url path pm 

router.use('/comment', require('./comment'))

router.use('/api', require('./api'));

router.use('/like', require('./like'));



// for any future ruter access from here
// router.use('/routerName', require('./routerfile'))

module.exports = router;
