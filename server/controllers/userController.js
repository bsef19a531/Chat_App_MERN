const asyncHandler = require('express-async-handler');
const generateToken = require('../config/tokenGenerator');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, picture } = req.body;

    // console.log(req.body);

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Invalid Email Address');
    }

    // if (await user.matchPassword(password)) {
    //     res.status(401);
    //     throw new Error('Invalid Password');
    // }


    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error('Invalids Password');
    }


    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id)
    });

});

const getAllUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);

});


module.exports = { registerUser, loginUser, getAllUsers };