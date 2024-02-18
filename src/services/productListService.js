const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const { ProductMain } = require('../schemas/product1Schema')
async function listProducts(req) {
    try {
        if (req.category && req.category.length > 0) {
            const category = req.category
            const product = await ProductMain.find({ category: { $in: category } });
            return {
                status: true,
                message: config.successMessages.productsFetchedSuccessfully,
                payload: product
            }
        }
        else {
            const product = await ProductMain.find({});
            return {
                status: true,
                message: config.successMessages.productsFetchedSuccessfully,
                payload: product
            }
        }
    }
    catch (error) {
        console.log("error === ", error)
        logger.info(`${req.requestId} : ${config.errorCatchMsg[5005]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.listProducts = listProducts