const mongoose = require('mongoose');

const otpEmailSchema = new mongoose.Schema({
    email: String,
    otp: Number,
    lastTimeStamp: Number,
});

module.exports.otpEmailModels = mongoose.model('otpEmailModel', otpEmailSchema);