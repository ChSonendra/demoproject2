const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const { productModel } = require('../schemas/productModel')
const utilityService = require('../utilServices/utilityService');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
async function addProductService(req) {
    try {
        const uniqueID = uuidv4();
        logger.info(`${req.requestId} In admin login Service Function`)
        const newProduct = new productModel({
            id: uniqueID,
            name: req.name,
            addedBy: req.addedBy,
            type: req.type,
            color: req.color,
            quality: req.quality,
            price: req.price,
            images: "https://en.m.wikipedia.org/wiki/File:Sunflower_from_Silesia2.jpg",
            sellerId: req.sellerId,
            sellerName: req.sellerName,
            quantity: req.quantity,
            about: req.about,
            sellerRating: req.sellerRating,
            rating: req.rating,
            qnaId: req.qnaId,
            expireDate: req.expireDate,
            unitsAvailable: req.unitsAvailable,
            quantityPerUnit: req.quantityPerUnit,
            perUnitPrice: req.perUnitPrice
        })
        await newProduct.save();
        result = {
            status: true,
            payload:{},
            message: config.errorMessage.productSavedSuccessfully
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