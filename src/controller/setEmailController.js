const config = require('../configs/config.json');
const logger = require('../winston');
const apiResponseFormatter = require('../configs/apiResponse')
const setEmail = require('../services/setEmailService')

async function setEmailController(retryAttempts, delay, req, res) {
    try {
        logger.info(`${req.requestId} : Inside sendOtpController Function`)
        console.log(req)
         const result = await setEmail.setEmail(req);
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
                async () => await setEmailController(retryAttempts - 1, delay, req, res),
                delay * 1000
            );
        }
        else
        {
            logger.info(`${req.requestId} : ${config.errorCatchMsg[5003]} Error Message :::: ${error} : Final`)
            res.status(apiResponseFormatter.apiInternalServerErrorStatus)
            res.send(apiResponseFormatter.internalErrorResponse(config.errorMessage.internalServerError))
        }
    }
}

module.exports.setEmailController = setEmailController;