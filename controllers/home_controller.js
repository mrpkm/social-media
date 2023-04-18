module.exports.home = function (req, res) {
    // console.log(req.cookies)
    res.cookie('user_id', 50);
    // return res.end('<h1>express is up for codeal!</h1>')
    return res.render('home', {
        title: 'home'
    })
}