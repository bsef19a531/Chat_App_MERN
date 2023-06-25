const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { loginUser, registerUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(registerUser).get(protect, getAllUsers);   //user registration route
router.route('/login').post(loginUser); //user login route

module.exports = router;