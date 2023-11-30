const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const apiResponseFormatter = require('../configs/apiResponse')
const { adminLoginService } = require('../services/adminLoginService');

async function adminLoginController(retryAttempts, delay, req, res) {
    try {
        logger.info(`${req.requestId} : Inside admin Login controller Function`)
         const result = await adminLoginService(req);
         if(result.status){
            logger.info(`${req.requestId} : Exiting  admin Login controller  Function`)
            res.status(apiResponseFormatter.apiSuccessStatus)
            res.send(apiResponseFormatter.apiSuccessResponse(
                result.message,
                result.payload
            ))
         }
         else
         {
            logger.info(`${req.requestId} : Exiting  admin Login controller  Function`)
            res.status(apiResponseFormatter.apiBadRequestStatus)
            res.send(apiResponseFormatter.apiFailureResponse(result.message))
         }
    }
    catch (error) {
        if (retryAttempts > 0) {
            logger.info(`${req.requestId} : ${config.errorCatchMsg[10001]} Error Message :::: ${error} :::: Retrying Attempt`)
            setTimeout(
                async () => await adminLoginController(retryAttempts - 1, delay, req, res),
                delay * 1000
            );
        }
        else
        {
            logger.info(`${req.requestId} : ${config.errorCatchMsg[10001]} Error Message :::: ${error} : Final`)
            res.status(apiResponseFormatter.apiInternalServerErrorStatus)
            res.send(apiResponseFormatter.internalErrorResponse(config.errorMessage.internalServerError))
        }
    }
}

module.exports.adminLoginController = adminLoginController;