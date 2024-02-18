const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
const { v4: uuidv4 } = require('uuid');
const utilityService = require('../utilServices/utilityService')
const userService = require('../utilServices/userService');
const { userModel } = require('../schemas/userModel');
async function sendOtpService(req) {
    try {
        const uniqId = uuidv4();
        const isUserExists = await userService.checkIfUserExistsUsingMobile(req.mobileNumber)
        console.log("user exist = ", isUserExists)
        if (!isUserExists.status) {
            const encryptedData = await crypto.encrypt(req.mobileNumber, config.secrets.mobileEncryptSecForJWT)
            const userId = encryptedData.split('').reverse().join('');
            const res = await userService.addMobileNumber(req.mobileNumber, userId)
            //TO DO :::: otp send service will be integrated here 
            if (res.status) {
                
                const result = {
                    status: true,
                    message: "creates user Successfully",
                    payload: {}
                }
                return result;
            }
            else {
                const result = {
                    status: false,
                    message: "issue while creating user"
                }
                return result;
            }

        }
        else {
            const result = {
                status: false,
                message: "user Already Exists"
            }
            return result;
        }
    }
    catch (error) {
        console.log("error === ", error)
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.sendOtpService = sendOtpService