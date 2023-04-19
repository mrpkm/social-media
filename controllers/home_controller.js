//18 post - required moudle post
const Post = require('../models/post');


module.exports.home = function (req, res) {
    // console.log(req.cookies)
    // res.cookie('user_id', 50);
    // return res.end('<h1>express is up for codeal!</h1>')


    //19 post - find the post ---- for populate write 21 post -
    // Post.find({}).then(function (posts, err) {  // ----------change to .then 
    //     return res.render('home', {
    //         title: 'home!!',
    //         posts: posts

    //     });
    // });
    //post 21 - populate ->>>> post 22 home,ejs
    Post.find({}).populate('user').exec(function (err, posts) {
        if (err) {
            console.log(err, "error in populate--------")
        }
        // console.log(posts)
        return res.render('home', {
            title: 'home!!',
            posts: posts

        });
    })

    //20 post - then go to home.ejs

}