const mongoose = require('mongoose');

const tokenResolverSchema = new mongoose.Schema({
    mobileNumber: String,
    uniqueID: String
});

module.exports = mongoose.model('tokenResolver', tokenResolverSchema);