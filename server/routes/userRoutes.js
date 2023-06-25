const express = require('express');
const { loginUser, registerUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(registerUser);   //user registration route
router.route('/login').post(loginUser); //user login route

module.exports = router;