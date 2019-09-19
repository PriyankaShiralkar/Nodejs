'use strict';
const mongoose = require('mongoose');

function connect(){
    mongoose.connect('mongodb+srv://dbuser:testing@123@nodejs-tutorial-nnhbu.mongodb.net/tutorial?retryWrites=true&w=majority', { useNewUrlParser:true,useUnifiedTopology: true});
    const connection = mongoose.connection;
    connection.on('error', function(err){
        console.log('DB connection failed', err);
        throw err;
    });
    connection.on('open', function(){
        console.log('DB connection successful!');
    });
}

module.exports ={
    connect:connect
}