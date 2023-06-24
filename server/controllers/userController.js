const asyncHandler = require('express-async-handler');
const generateToken = require('../config/tokenGenerator');


const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        picture
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error('Failed to register user');
    }
})