module.exports.profile = function (req, res) {
    // return res.end('<h1>this is a profile page</h1>')
    return res.render('user', {
        title: "profile"
    })
}