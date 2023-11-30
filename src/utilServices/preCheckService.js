const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
let user = require('../configs/sampleuser.json')
const currentDir = process.cwd();
const utilityService = require('./utilityService')
const fs = require('fs');
const util = require('util');
const fileService = require('../utilServices/fileUtility');
const accessAsync = util.promisify(fs.access);
async function checkIfUserExistsUsingMobile(mobileNumber) {
    try {
        const encryptedData = await crypto.encrypt(mobileNumber, config.mobileEncryptSecForJWT)
        const userId = encryptedData.split('').reverse().join('');
        const filename = currentDir + "/" + config.userFilePath + userId + ".json"
        await accessAsync(filename, fs.constants.F_OK);
        const rest = {
            status: true,
            message: "file Exists"
        }
        return rest;
    }
    catch (error) {
        console.log("error == ", error)
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        return {status:false}
        throw new Error(error);
    }
}

async function checkIfItemExistInCart(userId, cartId) {
    try {
        const filename = currentDir + "/" + config.userFilePath + userId + ".json"
        console.log("gkv")
        await accessAsync(filename, fs.constants.F_OK);
        console.log("file found")
        const rest = {
            status: true,
            message: "file Exists"
        }
        return rest;
    }
    catch (error) {
        console.log("error == ", error)
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        return {status:false}
        throw new Error(error);
    }
}

// module.exports.checkIfItemExistInCart = checkIfItemExistInCart
// module.exports.checkIfUserExistsUsingMobile = checkIfUserExistsUsingMobile

(async () => {
    console.log('Start of the program.');

    // Calling the async function using await in an IIFE
    const result = await checkIfUserExistsUsingMobile("9758568697");
    console.log(result);

    console.log('End of the program.');
})();