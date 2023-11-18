const config = require('../configs/adminConfigs.json');
const logger = require('../winston');
const userService = require('../utilServices/userService')
async function addItemToCart(req) {
    try {
        console.log("req == ",req)
        const userId = await userService.getUserIdUsingMobile(req.userId);
        const cartItem = {
            id: "657rf76rf6yuiuuy",
            item:{
                ProductId: "kjhxcdbsc",
                name: "aalo",
                type: "veg",
                color: "allo callar",
                quality: "3kg",
                price: "92",
                images: "12345",
                about: "1234",
                quantity:"1234"
            }
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