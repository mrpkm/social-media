// creating schema
const mongooes = require('mongoose')

const userSchema = mongooes.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongooes.model('user', userSchema);

module.exports = User;