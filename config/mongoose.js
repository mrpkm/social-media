const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeal_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connectiong to mongodb"));

db.once('open', function () {
    console.log("connecting to database :: mongodb");
})

module.exports = db;