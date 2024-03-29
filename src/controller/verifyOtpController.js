const config = require('../configs/config.json');
const logger = require('../winston');
const apiResponseFormatter = require('../configs/apiResponse')
const verifyOtpService = require('../utilServices/otpService3')

async function verifyOtpController(retryAttempts, delay, req, res) {
    try {
        logger.info(`${req.requestId} : Inside sendOtpController Function`)
         const result = await verifyOtpService.verifyOtpService(req);
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
            console.log("controller else case")
            logger.info(`${req.requestId} : Exiting sendOtpController Function`)
            console.log("res  == ",apiResponseFormatter.apiBadRequestStatus,"vcdsjkbvdbvf === ",apiResponseFormatter.apiFailureResponse(result.message))
            res.status(apiResponseFormatter.apiBadRequestStatus)
            res.send(apiResponseFormatter.apiFailureResponse(result.message))
         }
    }
    catch (error) {
        if (retryAttempts > 0) {
            logger.info(`${req.requestId} : ${config.errorCatchMsg[5003]} Error Message :::: ${error} :::: Retrying Attempt`)
            setTimeout(
                async () => await verifyOtpController(retryAttempts - 1, delay, req, res),
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

module.exports.verifyOtpController = verifyOtpController;