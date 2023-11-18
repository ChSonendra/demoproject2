const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    unqId: String,
    email: {
        type: String,
        unique: true, 
        required: true 
    },
    mobile: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.userModel = mongoose.model('user', userSchema);