const express = require('express')
const router = express.Router()
const logger = require('../winston')
const config = require('../configs/adminConfigs.json')

const adminLoginController = require('../controller/adminLoginController')
const addNewProduct = require('../controller/addNewProductController')
const utilityService = require('../utilServices/utilityService')
const { apiUserUnauthorizedStatus } = require('../configs/apiResponse')
const { apiFailureResponse } = require('../providers/apiResponse')

router.post('/login',async  (req, res) => {
    req.body.requestId = "adminLogin"
    adminLoginController.adminLoginController(config.maxRetry, config.retryDelay, req.body, res);
})


router.post('/addProduct',async  (req, res) => {
  const userInfo = await utilityService.verifyToken(req.headers.authorization);
  if(userInfo.status){
    req.body.requestId = userInfo.unqId
    req.body.userId = userInfo.userId
    addNewProduct.addNewProduct(config.maxRetry, config.retryDelay, req.body, res)
  }
  else
  {
    res.status(apiUserUnauthorizedStatus)
    res.send(apiFailureResponse(userInfo.message))
  }
})



module.exports = router