const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    numberMobile: String,
    otp: Number,
    lastTimeStamp: Number,
});

module.exports.otpModels = mongoose.model('otpModel', otpSchema);