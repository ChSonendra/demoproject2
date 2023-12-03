const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: String,
    name: String,
    addedBy: String,
    type: String,
    color: String,
    quality: String,
    price: String,
    images: String,
    sellerId: String,
    sellerName: String,
    quantity: String,
    about: String,
    sellerRating: String,
    rating: String,
    qnaId: String,
    expireDate: String,
    unitsAvailable: String,
    quantityPerUnit: String,
    perUnitPrice: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.productModel = mongoose.model('products', productSchema);