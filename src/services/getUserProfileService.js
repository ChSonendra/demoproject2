const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
const { v4: uuidv4 } = require('uuid');
const utilityService = require('../utilServices/utilityService')
const userService = require('../utilServices/userService');
const { userModel } = require('../schemas/userModel');
async function getUserProfileService(req) {
    try {
        const uniqId = uuidv4();
        const isUserExists = await userService.checkIfUserExistsUsingMobile(req.mobileNumber)
        console.log("user exist = ", isUserExists)
        if (isUserExists.status) {
           const user = await userService.fetchUserObject(req.mobileNumber)
            //TO DO :::: otp send service will be integrated here 
            console.log("usert === ",user)
            if (user.status) {
                const result = {
                    status: true,
                    message: "user fetched Successfully",
                    payload: user.payload
                }
                return result;
            }
            else {
                const result = {
                    status: false,
                    message: "couldn't fetch user"
                }
                return result;
            }

        }
        else {
            const result = {
                status: false,
                message: "user doesn't Exists"
            }
            return result;
        }

        logger.info(`${req.requestId} verify send otp Service Function`)
        return result;
    }
    catch (error) {
        console.log("error === ", error)
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${error}`)
        throw new Error(err);
    }
}

module.exports.getUserProfileService = getUserProfileService