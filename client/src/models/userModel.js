const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 50
    },
    profilePic: {
        type: String,
        default: '/images/profilePic.png'
    }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;