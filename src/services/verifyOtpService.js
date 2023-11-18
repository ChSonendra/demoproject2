const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
const utilityService = require('../utilServices/utilityService')
async function verifyOtp(req) {
    try {
        logger.info(`${req.requestId} In verify otp Service Function`)
        let result;
        if (req.otp == "223455") {
            const encryptedData = await crypto.encrypt(req.mobileNumber, config.mobileEncryptSecForJWT)
            const token = await utilityService.generateToken(encryptedData)
            result = {
                status: true,
                payload: {
                    token: token
                },
                message: config.successMessages.otpverifiedSuccessfully
            }
            
            logger.info(`${req.requestId} verify send otp Service Function`)
            return result;
        }
        else {
            result = {
                status: false,
                message: config.errorMessage.invalidOtp
            }
            logger.info(`${req.requestId} verify send otp Service Function`)
            return result;
        }
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

module.exports.verifyOtp = verifyOtp