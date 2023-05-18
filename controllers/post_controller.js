//7 post - created a post crontroller

//8 post - import post schema from modals
const Post = require('../models/post');
const Comment = require('../models/comment');

// 9 post - make a function 
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({ // to take all text on form
            content: req.body.content,
            // take user id also
            user: req.user._id
        });
        // console.log("going into hhr requrest")
        if (req.xhr) {
            // console.log("inside xhr")
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: 'post created!'
            })
        }
        // console.log("outside xhr")
        req.flash('success', 'post published')
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err)
        return res.redirect('back');

    }

}

// 10 post - create a posts.js on router 

// delete post and commnet
// module.exports.distroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         if (post.user == req.user.id) {
//             post.remove();
//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });
//         } else {
//             return res.redirect('back');
//         }
//     });
// }

module.exports.distroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "post deleted "
                })
            }

            req.flash('success', 'post associated and comment deleted')

            return res.redirect('back');
        } else {
            req.flash('error', 'you connect detete this post')

            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');

    }
}
