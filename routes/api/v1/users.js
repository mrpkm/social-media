const express = require('express');

const router = express.Router();

const usersApi = require('../../../controllers/api/v1/user_api');

router.use('/create-session', usersApi.creatSession);




module.exports = router;
