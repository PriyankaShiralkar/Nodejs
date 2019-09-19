'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        first_name:String,
        last_name:String
    },
    email: String,
    password: String
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;