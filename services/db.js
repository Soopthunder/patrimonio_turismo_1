"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
        const user = await User.findOne()
        if (!user) {
            const hashedPassword = await bcrypt.hash(process.env.INITIAL_USER_PASS, 12);
            const newUser = new User({
                username: process.env.INITIAL_USER_NAME,
                email: process.env.INITIAL_USER_EMAIL,
                password: hashedPassword
            });
            newUser.save();
        }
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
