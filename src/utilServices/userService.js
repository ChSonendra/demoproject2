const config = require('../configs/config.json');
const logger = require('../winston');
const crypto = require('../providers/crypto')
let user = require('../configs/sampleuser.json')
const currentDir = process.cwd();
const util = require('util');
const utilityService = require('./utilityService')
const { userModel } = require('../schemas/userModel')
const dbService = require('../utilServices/dynamoService')
const s3util = require("./s3utility")

async function fetchUserObject(mobileNumber) {
    try {
        const userId = await getUserIdUsingMobile(mobileNumber)
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (!resultDb.status) {
            return {
                status: false,
                message: "user not fetched",
                payload: {}
            }
        }
        return {
            status: true,
            message: "user fetched",
            payload: resultDb.payload.Item
        }
    }
    catch (error) {
        console.log("Error in fetch user", error);
    }
}

async function getUserIdUsingMobile(mobileNumber) {
    try {
        const query = { mobile: mobileNumber };
        console.log("error ==== ", query)
        const document = await userModel.findOne(query);
        console.log("document === ", document)
        return document.userId;
    }
    catch (error) {
        console.log("get User Id error", error)
    }
}

async function checkIfUserExistsUsingMobile(mobileNumber) {
    console.log(mobileNumber)
    const query = { mobile: mobileNumber };
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
        let userData = user
        userData.mobile = mobileNumber
        userData.userId = userId
        userData.mobile_verified = true
        const result = await dbService.putItemToDyanamoDb(userData, config.tableNames.consumerTable)
        if (!result.status) {
            return {
                status: false,
                message: result.message
            }
        }
        const rest = {
            status: true,
            userId: userId
        }
        return rest;
    }
    catch (error) {
        return {
            status: false,
            message: "cannot create user"
        }
    }
}

async function updateMobileNumber(userId, mobile) {
    try {
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.mobile = mobile
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.name = name
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        console.log("error == ", error)
        throw new Error(error);
    }
}

async function addEmail(userId, email) {
    try {
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.email = email
            jsonData.email_verified = true
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.email = email
            jsonData.email_verified = true
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.mobile_verified = isVerified

            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.mobile_verified = isVerified
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            item.item.cartQuantity = 1
            jsonData.cart[`${item.id}`] = item.item
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            console.log("json data", jsonData)
            let quan = Number(jsonData.cart[`${itemId}`].cartQuantity)
            jsonData.cart[`${itemId}`].cartQuantity = (quan + 1).toString()
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            let quan = Number(jsonData.cart[`${itemId}`].cartQuantity)
            if (quan == 1) {
                await deleteItemFromCart(userId, itemId)
                return { status: true }
            }
            jsonData.cart[`${itemId}`].cartQuantity = (quan - 1).toString()
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            if (jsonData.cart.hasOwnProperty(itemId)) {
                delete jsonData.cart[itemId];
            } else {
                return { status: false, message: "item not found" }
            }
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        console.log("error == ", error)
        logger.info(` : ${config.errorCatchMsg[6001]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}

async function addAddress(userId, address) {
    try {
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.addresses[`${address.id}`] = address.address
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            delete jsonData.addresses[`${addressId}`]

            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            jsonData.orders[`${order.id}`] = order.item
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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
        const resultDb = await dbService.getItemFromDyanamoDb({ userId: userId }, config.tableNames.consumerTable)
        if (resultDb.status) {
            const jsonData = resultDb.payload.Item
            delete jsonData.addresses[`${addressId}`]
            const result = await dbService.putItemToDyanamoDb(jsonData, config.tableNames.consumerTable)
            if (!result.status) {
                return {
                    status: false,
                    message: result.message
                }
            }
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