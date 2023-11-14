const express = require('express')
const router = express.Router()
const logger = require('../winston')
const config = require('../configs/config.json')

const sendOtpController = require('../controller/sendOtpMobileController')
const verifyOtpController = require('../controller/verifyOtpController')
const productListController = require('../controller/productListController')
const addItemToCartController = require('../controller/addItemtoCartController')
const removeItemFromCart = require('../controller/removeItemfromCartController')

const utilityService = require('../services/utilityService')
const { apiUserUnauthorizedStatus } = require('../configs/apiResponse')
const { apiFailureResponse } = require('../../../eapvp/blockchain/dus-reports/dusAppAPI/node-app/src/middlewares/responseFormatter/apiResponse')

// router.use((req, res, next) => {
//   next()
// })
router.post('/sendOtpMobile',async  (req, res) => {
  console.log(req)
    req.body.requestId = "7y8hd9"
    sendOtpController.sendOtpController(config.maxRetry, config.retryDelay, req.body, res);
  
})
router.post('/verifyOtp', async (req, res) => {
    req.body.requestId = "7y8h10"
    verifyOtpController.verifyOtpController(config.maxRetry, config.retryDelay, req.body, res);
})

router.post('/getProducts', async (req, res) => {
  console.log(req.headers)
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    productListController.productListController(config.maxRetry, config.retryDelay, req.body, res);
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})


router.post('/addItemToCart',async  (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    addItemToCartController.addItemtoCart(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

router.post('/removeItemFromCart',async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    removeItemFromCart.removeItemFromCart(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

module.exports = router