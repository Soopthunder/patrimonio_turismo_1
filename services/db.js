"use strict";
const mongoose = require('mongoose');

const User = require('../models/user');

const connectDB = () => (
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(client => {
            User.findOne().then(user => {
                if (!user) {
                    const user = new User({
                        username: 'test',
                        password: 'test',
                    });
                    user.save();
                }
            });
            console.log('Database connection established');
        })
        .catch(err => {
            console.log(err);
        }));


module.exports = connectDB;
