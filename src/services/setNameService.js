const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function setName(req) {
    try {
        console.log("req == ",req)
        const userId = await userService.getUserIdUsingMobile(req.userId);
        const res = await userService.addName(userId, req.name)
        console.log(" res ==", res)
        if(res.status){
            return {
                status:true,
                message:"name set successfully",
                payload: {}
            }
        }
        else
        {
            return {
                status:false,
                message:"couldn't add name"
            }
        }

    }
    catch (error) {
        console.log(error)
        // logger.info(`${req.} : ${config.errorCatchMsg[10000]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}

module.exports.setName = setName