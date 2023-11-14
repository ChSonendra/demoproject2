const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const utilityService = require('../services/utilityService');
const crypto = require('../providers/crypto')
const { productModel } = require('../schemas/productModel')
async function listProducts(req) {
    try {
        const product = await productModel.find({});
            console.log("data == ",product)
            return {
                status: true,
                message: config.successMessages.productsFetchedSuccessfully,
                payload: product
           }
    }
    catch (error) {
        console.log("error === ",error)
        logger.info(`${req.requestId} : ${config.errorCatchMsg[5005]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.listProducts = listProducts