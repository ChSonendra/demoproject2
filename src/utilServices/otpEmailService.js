const config = require('../configs/config.json');
const logger = require('../winston');
const userService = require('./userService')
const axios = require('axios');
const { userModel } = require('../schemas/userModel');
const { v4: uuidv4 } = require('uuid');
const crypto = require('../providers/crypto')
var unirest = require('unirest');
const { response } = require('express');
const utilityService = require('./utilityService')
const { otpModels } = require('../schemas/otpModel');
const randomize = require('randomatic');
async function sendOtpMobile(mobileNumber, otp) {
    try {
        const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: config.otpApiKeyFastToSMS.apiKey,
                variables_values: otp,
                route: 'otp',
                numbers: mobileNumber
            }
        });
        return {
            status: true,
            message: "otp send successfully"
        }
    }
    catch (error) {
        console.log(error.response.data.message)
        return { success: false, message: 'Failed to send OTP.' }
    }
}

async function checkIfuserExistandcreateUser(mobileNumber) {
    try {
        const uniqId = uuidv4();
        const isUserExists = await userService.checkIfUserExistsUsingMobile(mobileNumber)
        if (!isUserExists.status) {
            const encryptedData = await crypto.encrypt(mobileNumber, config.secrets.mobileEncryptSecForJWT)
            const userId = encryptedData.split('').reverse().join('');
            const newUser = new userModel({
                userId: userId,
                unqId: uniqId,
                mobile: mobileNumber,
            })
            await newUser.save();
            const res = await userService.addMobileNumber(mobileNumber, userId)
            if(!res.status){
                return {
                    status: false
                }
            }
            return {
                status: true
            }
        }
        return {
            status: true
        }
    }
    catch (error) {
        console.log("error in catch",error)
        return {
            status: false
        }
    }
}

async function otpGenerateAndSend(req) {
    try {
        if (req.secretCode != config.secrets.otpFrontendSecret) {
            return {
                status: false,
                payload: {},
                message: "couldn't send otp platform not verified"
            }
        }
        const mobileNumber = req.mobileNumber
        const isUserCreated = await checkIfuserExistandcreateUser(mobileNumber)
        if(!isUserCreated.status){
            return {
                status: false,
                payload: {},
                message: "couldn't send otp please try again later"
            }
        }
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const otp = randomize('0', 6);
        const existingOtp = await otpModels.findOne({ mobileNumber });
        if (existingOtp) {
            await existingOtp.remove();
        }
        const newOtpModel = new otpModels({
            numberMobile: mobileNumber,
            otp: otp,
            lastTimeStamp: currentTimestampInSeconds,
        })
        await newOtpModel.save();
        const res = await sendOtpMobile(mobileNumber, otp);
        console.log(" errorororo oo ")
        if (res.status) {
            return {
                status: true,
                payload: {},
                message: "otp send successfully"
            }
        }
        else {
            return {
                status: false,
                payload: {},
                message: "couldn't send otp please try again later"
            }
        }
    }
    catch (error) {
        console.log("error ocvc", error)
        return {
            status: false,
            payload: error,
            message: "couldn't send otp please try again later"
        }
    }
}


async function verifyOtpService(req) {
    try {
        console.log("error", req)
        const mobileNumber = req.mobileNumber
        console.log("mobile num ", mobileNumber)
        const latestOtp = await otpModels.findOne({ numberMobile: mobileNumber }, {}, { sort: { lastTimeStamp: -1 } });
        console.log("latestOtp", latestOtp)
        if (!latestOtp) {
            return {
                status: false,
                payload: {},
                message: "otp not verified "
            }
        }
        const currTimestamp = Math.floor(Date.now() / 1000);
        const diff = (currTimestamp - latestOtp.lastTimeStamp)
        if (latestOtp.otp === req.otp && diff < 300) {
            const encryptedData = await crypto.encrypt(mobileNumber, config.secrets.mobileEncryptSecForJWT)
            const token = await utilityService.generateToken(encryptedData)
            console.log(" token ", token)
            return {
                status: true,
                payload: {
                    token: token
                },
                message: "otp verified successfully"
            }
        } else {
            console.log("here i am")
            return {
                status: false,
                payload: {},
                message: "otp not verified"
            }
        }
    }
    catch (error) {
        console.log("error catch", error)
        return {
            status: false,
            payload: {},
            message: "come error occured couldnt verify otp"
        }
    }

}

module.exports.verifyOtpService = verifyOtpService
module.exports.otpGenerateAndSend = otpGenerateAndSend