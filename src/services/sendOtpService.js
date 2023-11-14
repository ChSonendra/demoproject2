const config = require('../configs/config.json');
const logger = require('../winston');

async function sendOtpService(req) {
    try {
        logger.info(`${req.requestId} In send otp Service Function`)
        let result;
        // third party otp sender integration goes in here
        //
        // that will return Otpresult variable if otp is sent or not
        const OtpResult = {
            status: true
        }
        if (OtpResult.status) {
            result = {
                status: true,
                payload: {},
                message: config.successMessages.otpSentSuccess
            }
            logger.info(`${req.requestId} Exiting send otp Service Function`)
            return result;
        }
        else {
            result = {
                status: false,
                message: config.errorMessage.otpSentFailure
            }
            logger.info(`${req.requestId} Exiting send otp Service Function`)
            return result;
        }
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6000]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.sendOtpService = sendOtpService