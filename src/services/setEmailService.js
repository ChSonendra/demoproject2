const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function setEmail(req) {
    try {
        console.log("req == ",req)
        const userId = await userService.getUserIdUsingMobile(req.userId);
        const res = await userService.addEmail(userId, req.email)
        console.log(" res ==", res)
        if(res.status){
            return {
                status:true,
                message:"Email successfully added",
                payload: {}
            }
        }
        else
        {
            return {
                status:false,
                message:"couldn't add email"
            }
        }

    }
    catch (error) {
        console.log(error)
        // logger.info(`${req.} : ${config.errorCatchMsg[10000]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}

module.exports.setEmail = setEmail