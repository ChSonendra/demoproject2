const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function changeCartItemQuantity(req) {
    try {
        console.log("req == ",req)
        const userId = await userService.getUserIdUsingMobile(req.userId);
        let res;
        if(req.changeType == "increase"){
           res = await userService.increaseCartQuantity(userId, req.itemId)
        }
        else
        {
            res = await userService.decreaseCartQuantity(userId, req.itemId)
        }
        console.log(" res ==", res)
        if(res.status){
            return {
                status:true,
                message:"item added to cart",
                payload: {}
            }
        }
        else
        {
            return {
                status:false,
                message:"couldn't be added"
            }
        }

    }
    catch (error) {
        console.log(error)
        // logger.info(`${req.} : ${config.errorCatchMsg[10000]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}

module.exports.changeCartItemQuantity = changeCartItemQuantity