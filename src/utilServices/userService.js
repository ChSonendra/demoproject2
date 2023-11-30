const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
let user = require('../configs/sampleuser.json')
const currentDir = process.cwd();
const util = require('util');
const utilityService = require('./utilityService')
const { userModel } = require('../schemas/userModel')
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);

const fileService = require('../utilServices/fileUtility');

async function fetchUserObject(mobileNumber) {
    try{
        const userId = await getUserIdUsingMobile(mobileNumber)
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        const jsonData = JSON.parse(fileContent.data);
        return {
            status: true,
            message: "user fetched",
            payload: jsonData[userId]
        }
    }
    catch (error) {
        console.log("Error in fetch user");
    }


}

async function getUserIdUsingMobile(mobileNumber) {
    const query = { mobile: mobileNumber };
    const document = await userModel.findOne(query);
    return document.userId;
}



async function checkIfUserExistsUsingMobile(mobileNumber) {
    const query = { mobile: mobileNumber };
    const document = await userModel.findOne(query);
    console.log("document ==", document)
    if (document) {
        return {
            status: true,
            payload: document
        }
    }
    else {
        return {
            status: false
        }
    }
}

async function checkIfUserExistsUsingUserId(userId) {
    const query = { userId: userId };
    const document = await userModel.findOne(query);
    if (document) {
        return {
            status: true,
            payload: document
        }
    }
    else {
        return {
            status: false
        }
    }
}

async function addMobileNumber(mobileNumber, userId) {
    try {
        user.mobile = mobileNumber
        user.mobile_verified = true
        const userObject = {
            [`${userId}`]: user
        }
        console.log("user obj ", userObject)
        console.log(currentDir)
        await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(userObject))
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
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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
            console.log("user id ",userId)
            const jsonData = JSON.parse(fileContent.data);
            console.log("new var",jsonData)
            jsonData[userId].name = name
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }

    }
    catch (error) {
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        console.log("error == ",error)
        throw new Error(error);
    }
}

async function addEmail(userId, email) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            const jsonData = JSON.parse(fileContent.data);
            jsonData[userId].email = email
            jsonData[userId].email_verified = true
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            const jsonData = JSON.parse(fileContent.data);
            jsonData.userId.email = email
            jsonData.userId.email_verified = true
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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

async function setMobileVerified(userId, isVerified) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            const jsonData = JSON.parse(fileContent.data);
            jsonData.userId.mobile_verified = isVerified
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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

async function setEmailVerified(userId, isVerified) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            jsonData.userId.mobile_verified = isVerified
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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

async function addItemToCart(userId, item) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            console.log("json data", jsonData)
            jsonData[`${userId}`].cart[`${item.id}`] = item.item
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }
    }
    catch (error) {
        console.log("error =", error)
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(error);
    }
}

async function increaseCartQuantity(userId, itemId) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            console.log("json data", jsonData)
            let quan = Number(jsonData[`${userId}`].cart[`${itemId}`].quantity)
            jsonData[`${userId}`].cart[`${itemId}`].quantity = (quan + 1).toString()
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }
    }
    catch (error) {
        console.log("error =", error)
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(error);
    }
}

async function decreaseCartQuantity(userId, itemId) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            console.log("json data", jsonData)
            let quan = Number(jsonData[`${userId}`].cart[`${itemId}`].quantity)
            if(quan == 1) {
               await deleteItemFromCart(userId,itemId)
               return { status: true }
            }
            jsonData[`${userId}`].cart[`${itemId}`].quantity = (quan - 1).toString()
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }
    }
    catch (error) {
        console.log("error =", error)
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(error);
    }
}

async function deleteItemFromCart(userId, itemId) {
    try {
        const fileContent = await fileService.readFile(currentDir+ "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            if (jsonData[userId].cart.hasOwnProperty(itemId)) {
                delete jsonData[userId].cart[itemId];
            } else {
                return { status: false, message: "item not found" }
            }
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }
    }
    catch (error) {
        console.log("error == ",error)
        logger.info(` : ${config.errorCatchMsg[6001]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}




async function addAddress(userId, address) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            jsonData[`${userId}`].addresses[`${address.id}`] = address.address
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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

async function removeAddress(userId, addressId) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            delete jsonData[userId].addresses[`${addressId}`]
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
        }
        else {
            return {
                status: false,
                message: "no record found"
            }
        }
    }
    catch (error) {
        // logger.info(`${req.requestId} : ${config.errorCatchMsg[6001]} Error Message :::: ${err}`)
        throw new Error(error);
    }
}

async function addOrderToList(userId, order) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            jsonData.orders[`${order.id}`] = order.item
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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

async function setOrderStatus(userId, status) {
    try {
        const fileContent = await fileService.readFile(currentDir + "/" + config.userFilePath + userId + ".json");
        if (fileContent.status) {
            let jsonData = JSON.parse(fileContent.data);
            delete jsonData.addresses[`${addressId}`]
            await writeFileAsync(currentDir + "/" + config.userFilePath + userId + ".json", JSON.stringify(jsonData))
            return { status: true }
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



module.exports.setOrderStatus = setOrderStatus
module.exports.addOrderToList = addOrderToList
module.exports.removeAddress = removeAddress
module.exports.addAddress = addAddress
module.exports.deleteItemFromCart = deleteItemFromCart
module.exports.addMobileNumber = addMobileNumber
module.exports.updateMobileNumber = updateMobileNumber
module.exports.addName = addName
module.exports.addEmail = addEmail
module.exports.updateEmail = updateEmail
module.exports.setMobileVerified = setMobileVerified
module.exports.setEmailVerified = setEmailVerified
module.exports.addItemToCart = addItemToCart
module.exports.checkIfUserExistsUsingMobile = checkIfUserExistsUsingMobile
module.exports.checkIfUserExistsUsingUserId = checkIfUserExistsUsingUserId
module.exports.getUserIdUsingMobile = getUserIdUsingMobile
module.exports.fetchUserObject = fetchUserObject
module.exports.increaseCartQuantity = increaseCartQuantity
module.exports.decreaseCartQuantity = decreaseCartQuantity
// // addMobileNumber("9758568697");
// // updateMobileNumber("a3da9b008c7ce4c69da11df6887fe217", "9369318609")
// addName("a3da9b008c7ce4c69da11df6887fe217", "chirag")
// addEmail("a3da9b008c7ce4c69da11df6887fe217", "chirag8121@gmail.com")