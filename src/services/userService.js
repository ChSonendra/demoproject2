const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
let user = require('../configs/sampleuser.json')
const currentDir = process.cwd();
const utilityService = require('../services/utilityService')
const fs = require('fs');
const fileService = require('./fileUtility');

async function addMobileNumber(mobileNumber) {
    try {
        // TO DO :: we will check if this mobile number already exist in db or not
        const encryptedData = await crypto.encrypt(mobileNumber, config.mobileEncryptSecForJWT)
        const userId = encryptedData.split('').reverse().join('');
        user.mobile = mobileNumber
        user.mobile_verified = true
        const userObject = {
            "userId": user
        }

        fs.writeFile(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(userObject), (err) => {
            if (err) {
                console.log("error == ", err)
                throw { status: false, message: "cannot created user document" }
            } else {
                console.log('File written successfully.');
            }
        });
        const rest = {
            status: true,
            userId: userId
        }
        return rest;
    }
    catch (error) {
        console.log("error == ", error)
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(error);
    }
}

async function updateMobileNumber(userId, mobile) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            const jsonData = JSON.parse(fileContent.data);
            jsonData.userId.mobile = mobile
            fs.writeFile(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.log("error == ", err)
                    throw { status: false, message: "cannot created user document" }
                } else {
                    console.log('File written successfully.');
                }
            });
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }

    }
    catch (err) {
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function addName(userId, name) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            const jsonData = JSON.parse(fileContent.data);
            jsonData.userId.name = name
            fs.writeFile(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.log("error == ", err)
                    throw { status: false, message: "cannot created user document" }
                } else {
                    console.log('File written successfully.');
                }
            });
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }

    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function addEmail(userId, email) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            const jsonData = JSON.parse(fileContent.data);
            jsonData.userId.email = email
            jsonData.userId.email_verified= true
            fs.writeFile(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.log("error == ", err)
                    throw { status: false, message: "cannot created user document" }
                } else {
                    console.log('File written successfully.');
                }
            });
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function updateEmail(userId, email) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function setMobileVerified(userId, isVerified) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function setEmailVerified(userId, isVerified) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function addItemToCart(userId, item) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function deleteItemFromCart(userId, itemId) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function addAddress(userId, address) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function removeAddress(userId, addressId) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function addOrderToList(userId, order) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}

async function setOrderStatus(userId, status) {
    try {
    }
    catch (error) {
        logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(err);
    }
}



// module.exports.setOrderStatus = setOrderStatus
// module.exports.addOrderToList = addOrderToList
// module.exports.removeAddress = removeAddress
// module.exports.addAddress = addAddress
// module.exports.deleteItemFromCart = deleteItemFromCart
// module.exports.addMobileNumber = addMobileNumber
// module.exports.updateMobileNumber = updateMobileNumber
// module.exports.addName = addName
// module.exports.addEmail = addEmail
// module.exports.updateEmail = updateEmail
// module.exports.setMobileVerified = setMobileVerified
// module.exports.setEmailVerified = setEmailVerified
// module.exports.addItemToCart = addItemToCart

// addMobileNumber("9758568697");
// updateMobileNumber("a3da9b008c7ce4c69da11df6887fe217", "9369318609")
addName("a3da9b008c7ce4c69da11df6887fe217", "chirag")
addEmail("a3da9b008c7ce4c69da11df6887fe217", "chirag8121@gmail.com")