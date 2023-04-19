//7 post - created a post crontroller

//8 post - import post schema from modals
const Post = require('../models/post');

// 9 post - make a function 
module.exports.create = function (req, res) {
    Post.create({ // to take all text on form
        content: req.body.content,
        // take user id also
        user: req.user._id
    }).then(function (post, err) {
        if (err) {
            console.log("error in crating a post");
            return;
        }
        return res.redirect('back');
    }

    );
}

// 10 post - create a posts.js on router 
