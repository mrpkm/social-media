//18 post - required moudle post
const Post = require('../models/post');

const User = require('../models/user');


module.exports.home = async function (req, res) {
    //post 21 - populate ->>>> post 22 home,ejs

    try {
        let posts = await Post.find({})
            .populate('user')
            .sort('-createdAt')
            .populate({
                path: "comments",
                populate: {
                    path: 'user'
                }
            })
        // user information
        let users = await User.find({});

        return res.render('home', {
            title: 'home!!',
            posts: posts,
            all_user: users

        });

    } catch (err) {
        console.log("error", err)
        return
    }


}





    // if (err) {
    //     console.log(err, "error in populate--------")
    // }
    // console.log(posts)



    //20 post - then go to home.ejs
