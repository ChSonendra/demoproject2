const express = require('express')
const routes = require('./routes/routesConsumer')
const adminRoutes = require('./routes/routesAdmin')
const logger = require('./winston')
const mongoose = require('mongoose')
const app = express()
mongoose.connect("mongodb://root:example@localhost:27017/")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/consumer",routes)
app.use("/admin",adminRoutes)
logger.info("server started")
app.listen(3000)