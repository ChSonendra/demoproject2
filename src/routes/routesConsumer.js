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
const setEmailController = require('../controller/setEmailController')
const setNameController = require('../controller/setNameController')
const setAddress = require('../controller/setAddressController')
const placeOrderController = require("../controller/placeOrderController")
const removeAddressController = require("../controller/removeAddressController")
const changeCartItemQuantit = require("../controller/changeCartItemQuantityController")

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
  console.log(req.body)
    req.body.requestId = "7y8hd9"
    sendOtpController.sendOtpController(config.maxRetry, config.retryDelay, req.body, res);
  
})

router.post('/verifyOtp', async (req, res) => {
    req.body.requestId = "7y8h10"
    verifyOtpController.verifyOtpController(config.maxRetry, config.retryDelay, req.body, res);
})

router.post('/setName', async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kcfnkjcv ",req.body.userId)
    setNameController.setNameController(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

router.post('/setEmail', async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kcfnkjcv ",req.body.userId)
    setEmailController.setEmailController(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
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

router.post('/changeCartItemQuantit',async  (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kcfnkjcv ",req.body.userId)
    changeCartItemQuantit.changeCartItemQuantity(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

router.post('/removeItemFromCart',async  (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kcfnkjcv ",req.body.userId)
    removeItemFromCart.removeItemFromCart(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

router.post('/addAddress',async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kjcnsdkjnc ---=== ",req.body)
    setAddress.setAddressController(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

router.post('/removeAddress',async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kjcnsdkjnc ---=== ",req.body)
    removeAddressController.removeAddressController(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

router.post('/placeOrder',async (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    console.log("kjcnsdkjnc ---=== ",req.body)
    placeOrderController.placeOrderController(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})

module.exports = router