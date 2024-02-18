const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const { ProductMain } = require('../schemas/product1Schema')
const utilityService = require('../utilServices/utilityService');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
async function addProductService(req) {
    try {

        logger.info(`${req.requestId} In add product Service Function`)
        for (item in req.products) {
            const uniqueID = uuidv4();
            const newProduct = new ProductMain({
                productId: uniqueID,
                name: req.products[item].name,
                category: req.products[item].category,
                type: req.products[item].type,
                minQuantity: req.products[item].minQuantity,
                unit: req.products[item].unit,
                totalAvailableQuantity: req.products[item].totalAvailableQuantity,
                pricePerUnit: req.products[item].pricePerUnit,
                about: req.products[item].about,
                color: req.products[item].color,
                images: req.products[item].images,
                sellerId: req.products[item].sellerId,
                sellerRating: req.products[item].sellerRating,
                warehouses: req.products[item].warehouses,
                sellerName: req.products[item].sellerName,
            })
            await newProduct.save();
            result = {
                status: true,
                payload: {},
                message: config.errorMessage.productSavedSuccessfully
            }
        }
        logger.info(`Exiting admin login Service Function`)
        return result;
    }
    catch (error) {
        console.log(error)
        logger.info(`${req.requestId} : ${config.errorCatchMsg[10002]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.addProductService = addProductService