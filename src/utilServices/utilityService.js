const config = require('../configs/config.json')
const jwt = require('jsonwebtoken')
const logger = require('../winston')
const crypto = require('../providers/crypto')

async function verifyToken(token) {
    try {
        logger.info("in Verify Token")
        if (token == undefined || token == null || token.length == 0)
            return { status: false, message: config.errorMessage.invalidJwtToken }
        else {
            logger.info("in Verify Token else case")
            const verifieduser = await jwt.verify(token, config.secrets.jwtSecret)
            const userId = await crypto.decrypt(verifieduser, config.secrets.mobileEncryptSecForJWT)
            const uniqueID = Math.random().toString(36).substring(2, 8);
            const result = {
                status: true,
                unqId: uniqueID,
                userId: userId
            }
            logger.info("in Verify Token else")
            return result;
        }
    }
    catch (err) {
        console.log("error === 28 ",err)
        logger.error(`${config.errorCatchMsg[5002]} Error Message :::: ${err}`)
        return { status: false, message: config.errorCatchMsg[5002] }
    }
}

async function generateToken(id) {
    try {
        console.log("id == ", id)
        if (id == undefined || id == null || id.length == 0)
            return { status: false, message: config.errorMessage.invalidUserId }
        else {
            const token = jwt.sign(id, config.secrets.jwtSecret);
            return token;
        }
    }
    catch (err) {
        console.log("error === 43 ",err)
        logger.error(`${config.errorCatchMsg[5001]} Error Message :::: ${err}`)
        throw { status: false, message: config.errorCatchMsg[5001] }
    }
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;