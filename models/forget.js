// creating schema
const mongoose = require('mongoose')



const forgetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accessToken: {
        type: String,

    },
    isValid: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const forget = mongoose.model('Forget', forgetSchema);

module.exports = forget;



