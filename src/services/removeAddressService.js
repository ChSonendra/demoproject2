const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function removeAddress(req) {
    try {
        console.log("req == ",req)
        const userId = await userService.getUserIdUsingMobile(req.userId);
        const res = await userService.removeAddress(userId, req.addressId)
        console.log(" res ==", res)
        if(res.status){
            return {
                status:true,
                message:"address removed succesfully",
                payload: {}
            }
        }
        else
        {
            return {
                status:false,
                message:"couldn't be removed"
            }
        }

    }
    catch (error) {
        console.log(error)
        // logger.info(`${req.} : ${config.errorCatchMsg[10000]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}

module.exports.removeAddress = removeAddress