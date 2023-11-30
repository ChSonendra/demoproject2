const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function removeItemFromCart(req) {
    try {
        const userId = await userService.getUserIdUsingMobile(req.userId);
        const res = await userService.deleteItemFromCart(userId, req.itemId)
        if(res.status){
            return {
                status:true,
                message:"item deleted from cart",
                payload: {}
            }
        }
        else
        {
            return {
                status:false,
                message:res.message
            }
        }

    }
    catch (error) {
        console.log(error)
        // logger.info(`${req.} : ${config.errorCatchMsg[10000]} Error Message :::: ${error}`)
        throw new Error(error);
    }
}

module.exports.removeItemFromCart = removeItemFromCart