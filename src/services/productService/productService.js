const { ProductMain } = require('../../schemas/product1Schema')
const { v4: uuidv4 } = require('uuid');
async function addProductToProducts(req) {
    try {
        for (item in req) {
            console.log("item == ",item)
        const uniqueID = uuidv4();
        const ProductData = {
            productId: uniqueID,
            name: req.name,
            category: req.category,
            type: req.type,
            minQuantity: req.minQuantity,
            unit: req.unit,
            totalAvailableQuantity: req.totalAvailableQuantity,
            pricePerUnit: req.pricePerUnit,
            about: req.about,
            color: req.color,
            images: req.images,
            sellerId: req.sellerId,
            sellerRating: req.sellerRating,
            warehouses: req.warehouses,
            sellerName: req.sellerName,
        };

        // const productData = req.product;
        console.log(ProductData)
        console.log(ProductMain)
    }
        // const newProduct = new ProductMain(ProductData);
        // const savedProduct = await newProduct.save();
        return true;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }

}

async function getProductById(productId) {
    try {
        const product = await ProductMain.findOne({ productId });
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        throw error;
    }
}

async function updateProductFields(productId, updateFields) {
    try {
        const updatedProduct = await ProductMain.findOneAndUpdate(
            { productId },
            { $set: updateFields },
            { new: true }
        );
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product fields:', error.message);
        throw error;
    }
}

async function getProductFields(productId, fields) {
    try {
        const product = await ProductMain.findOne({ productId }).select(fields);
        return product;
    } catch (error) {
        console.error('Error fetching specific fields for product:', error.message);
        throw error;
    }
}

module.exports = {
    getProductById,
    updateProductFields,
    getProductFields,
    addProductToProducts,
};