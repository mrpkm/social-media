const Post = require('../../../models/post');

const Comment = require('../../../models/comment');


module.exports.index = async function (req, res) {


    let posts = await Post.find({})
        .populate('user')
        .sort('-createdAt')
        .populate({
            path: "comments",
            populate: {
                path: 'user'
            }
        })
    console.log(posts)

    return res.status(200).json({
        message: "List of post",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message: " post and asociated comment deleted"
            });
        } else {
            returnres.status(401).json({
                message: "you connot delete this post"
            })
        }
    } catch (err) {
        // req.flash('error', err);
        return res.status(500).json({
            message: "Internal server error post api"
        });

    }
}