const config = require('../configs/config.json');
const logger = require('../winston');
const apiResponseFormatter = require('../configs/apiResponse')
const productListService = require('../services/productListService')


async function productListController(retryAttempts, delay, req, res) {
    try {
        logger.info(`${req.requestId} : Inside sendOtpController Function`)
         const result = await productListService.listProducts(req);
         if(result.status){
            logger.info(`${req.requestId} : Exiting sendOtpController Function`)
            res.status(apiResponseFormatter.apiSuccessStatus)
            res.send(apiResponseFormatter.apiSuccessResponse(
                result.message,
                result.payload
            ))
         }
         else
         {
            logger.info(`${req.requestId} : Exiting sendOtpController Function`)
            res.status(apiResponseFormatter.apiBadRequestStatus)
            res.send(apiResponseFormatter.apiFailureResponse(result.message))
         }
    }
    catch (error) {
        if (retryAttempts > 0) {
            logger.info(`${req.requestId} : ${config.errorCatchMsg[5003]} Error Message :::: ${error} :::: Retrying Attempt`)
            setTimeout(
                async () => await productListController(retryAttempts - 1, delay, req, res),
                delay * 1000
            );
        }
        else
        {
            logger.info(`${req.requestId} : ${config.errorCatchMsg[5004]} Error Message :::: ${error} : Final`)
            res.status(apiResponseFormatter.apiInternalServerErrorStatus)
            res.send(apiResponseFormatter.internalErrorResponse(config.errorMessage.internalServerError))
        }
    }
}

module.exports.productListController = productListController;