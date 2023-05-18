//1 post - Realationship in database
//used post for social media website

//2  post - reuired mongooes
const mongoose = require('mongoose');

//3 post - create schema
const postSchema = new mongoose.Schema({
    // it will taks object 
    content: {// for contant post
        type: String,
        require: true
    },
    user: { // who post with name or id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }], likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
    }]
}, {// time stans it will give time of activity
    timestamps: true
})

//4 post - export the schema
const Post = mongoose.model('Post', postSchema);
//5 post - export post
module.exports = Post;

//6 post - go to the views and make a file and create a form of on it