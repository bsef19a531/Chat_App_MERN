const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const sendMessage = asyncHandler(async (req, res) => {

    const { content, chatId } = req.body;

    if (content === '' || chatId === '') {
        console.log('Content or chatId is missing sendMessage controller')
        return res.statusCode(400).json({ message: 'Content or chatId is missing' })
    }

    let newMessage = {
        sender: req.user._id,
        content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage);

        message = await message.populate('sender', 'name pic')
        message = await message.populate('chat')
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.json(message);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }

})

const allMessages = asyncHandler(async (req, res) => {
    try {
        const message = await Message.find({ chat: req.params.chatId }).populate('sender', 'name pic').populate('chat');

        res.json(message);

    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

module.exports = { sendMessage, allMessages }