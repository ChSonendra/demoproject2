const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function addItemToCart(req) {
    try {
        console.log("req == ",req)
        const uniqueID = Math.random().toString(36).substring(2, 8);
        const userId = await userService.getUserIdUsingMobile(req.userId);
        const cartItem = {
            id: uniqueID,
            item:req.item
        }
        const res = await userService.addItemToCart(userId, cartItem)
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

module.exports.addItemToCart = addItemToCart