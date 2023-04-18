//1 Realationship in database
//used post for social media website

//2 reuired mongooes
const mongoose = require('mongoose');

//3 create schema
const postSchema = new mongoose.Schema({
    // it will taks object 
    content: {// for contant post
        type: String,
        require: true
    },
    user: { // who post with name or id
        type:
    }


})