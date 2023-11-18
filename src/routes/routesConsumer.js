const express = require('express')
const router = express.Router()
const logger = require('../winston')
const config = require('../configs/config.json')

const sendOtpController = require('../controller/sendOtpMobileController')
const verifyOtpController = require('../controller/verifyOtpController')
const productListController = require('../controller/productListController')
const addItemToCartController = require('../controller/addItemtoCartController')
const removeItemFromCart = require('../controller/removeItemfromCartController')
const createUser = require('../controller/createUserController')
const getUserProfileController = require('../controller/getUserProfileController')


const utilityService = require('../utilServices/utilityService')
const { apiUserUnauthorizedStatus } = require('../configs/apiResponse')
const { apiFailureResponse } = require('../providers/apiResponse')

// router.use((req, res, next) => {
//   next()
// })
router.post('/createUser',async  (req, res) => {
    req.body.requestId = "usrcrt"
    console.log("great n dcj ",req.body)
    createUser.createUserController(config.maxRetry, config.retryDelay, req.body, res);
  
})
router.post('/sendOtpMobile',async  (req, res) => {
  console.log(req)
    req.body.requestId = "7y8hd9"
    sendOtpController.sendOtpController(config.maxRetry, config.retryDelay, req.body, res);
  
})
router.post('/verifyOtp', async (req, res) => {
    req.body.requestId = "7y8h10"
    verifyOtpController.verifyOtpController(config.maxRetry, config.retryDelay, req.body, res);
})

router.post('/getUserProfile', async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kcfnkjcv ",req.body.userId)
    getUserProfileController.getUserProfile(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
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
    console.log("kcfnkjcv ",req.body.userId)
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
    console.log("kjcnsdkjnc ---=== ",req.body)
    removeItemFromCart.removeItemFromCart(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

module.exports = router