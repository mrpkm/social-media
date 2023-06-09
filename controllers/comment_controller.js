// const { model } = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../maillers/comments_mailer');
const queue = require('../config/kue')
const commentEmailWroker = require('../workers/comment_email_worker');



module.exports.create = async function (req, res) {

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user');
            // commentMailer.newComment(comment);
            // queueMicrotask.create()


            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in craeating a queue', err);
                    return;
                }
                console.log('job enquied', job.id);
            });


            if (req.xhr){
                // Similar for comments to fetch the user's id!
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}






// delete comment on comment
module.exports.destroy = function (req, res) {
    console.log(req.params);
    Comment.findById(req.params.id, function (err, comment) {
        console.log(comment);
        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();
            // Comment.findByIdAndDelete(comment._id).then(
            //     function(result){
            //         console.log(result);
            //     }
            // ).catch(function(err){
            //     console.log(err);
            // })
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                if (err) {
                    console.log("error on comment ---", err);
                }
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    });
}   