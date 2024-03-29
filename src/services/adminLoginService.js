const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const utilityService = require('../utilServices/utilityService');
const crypto = require('../providers/crypto')
async function adminLoginService(req) {
    try {
        logger.info(`${req.requestId} In admin login Service Function`)
        for (const user of config.userInfo) {
            if (user.email === req.email && user.password === req.password) {
                delete user.password
                console.log(user)
                const tokendetails = await crypto.encrypt(JSON.stringify(user), config.mobileEncryptSecForJWT);
                const token = await utilityService.generateToken(tokendetails);
                result = {
                    status: true,
                    payload: {
                        token: token
                    },
                    message: config.successMessages.loginSuccess
                }
                logger.info(`${req.requestId} Exiting admin login Service Function`)
                return result;
            }
        }
        result = {
            status: false,
            message: config.errorMessage.invalidLoginDetails
        }
        logger.info(`Exiting admin login Service Function`)
        return result;
    }
    catch (error) {
        console.log("error === ",error)
        logger.info(`${req.requestId} : ${config.errorCatchMsg[10000]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.adminLoginService = adminLoginService