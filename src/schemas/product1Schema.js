const mongoose = require('mongoose');

const productSchema1 = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  minQuantity: { type: Number, required: true },
  unit: { type: String, required: true },
  totalAvailableQuantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  about: { type: String },
  discountMatrix: { type: String },
  color: { type: String },
  images: { type: [String] },
  sellerId: { type: String, required: true },
  sellerRating: { type: Number },
  qnaId: { type: String, required: false },
  rating: { type: Number, required: false },
  warehouses: [
    {
      name: { type: String },
      id: { type: String },
      quantityAvailable: { type: Number }
    }
  ],
  sellerName: { type: String },
  expireDate: {
    type: Date, default: () => {
      const currentDate = new Date();
      // Add 6 months to the current date
      currentDate.setMonth(currentDate.getMonth() + 6);
      return currentDate;
    }},  
    dateAdded: { type: Number, default: Date.now }
  });

module.exports.ProductMain = mongoose.model('Product1', productSchema1);