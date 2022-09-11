const { API_VERSION } = require("./config");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");



require('dotenv').config()

const app = express();
const port = process.env.PORT || 3977;
// Routes
const userRoutes = require("./routes/user");
const twitterRoutes = require("./routes/twitterApi");
const hashtagRoutes = require("./routes/hashtags");
const logger = require("./logging/winstonLogger");
const {MONGO_DB_URI} = process.env;
logger.info(`MONGO_DB_URI ${MONGO_DB_URI}, MONGO_DB_URI_TEST, NODE_ENV`);
const connectionString =  MONGO_DB_URI;
const { createCronJobs } = require("./cronjobs/cronjobs");

//var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors())
// Configure Header HTTP

createCronJobs();

// Serve static files from the React frontend app

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Basic Routes
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/twitter`, twitterRoutes);
app.use(`/api/${API_VERSION}/hashtags`, hashtagRoutes);

// Connect mongo and express
let server = null;
 mongoose 
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    logger.info("Connected");
    server = app.listen(port, () => {
      logger.info("#######################");
      logger.info("#######################");
      logger.info("###### API REST ######");
      logger.info("#######################");
      logger.info("#######################");
      logger.info(`http://localhost:${port}/api/${API_VERSION}/`);
    });
  })
  .catch((err) => logger.info(err));
 
module.exports = {app, server,mongoose };