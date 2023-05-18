//10 post - created posts.js

//11 post - import express and set router
const express = require('express');
const router = express.Router();
// 22 post- require posport
const passport = require('passport')

//12 post - set contoller file path
const postController = require('../controllers/post_controller');

// 13 post - create the url  // after 23 check checkAuthentication
router.post('/create', passport.checkAuthentication, postController.create);
// comment delete
router.get('/destroy/:id', passport.checkAuthentication, postController.distroy);

// 14 post -  export the router
module.exports = router;


// 15 post - import router index.js to this file
