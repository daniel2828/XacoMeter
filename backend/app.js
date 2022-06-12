const { API_VERSION } = require("./config");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path'); 
var cors = require('cors')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3977;
// Routes
const userRoutes = require("./routes/user");
const twitterRoutes = require("./routes/twitterApi");
const hashtagRoutes = require("./routes/hashtags");
const logger = require("./logging/winstonLogger");
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env;
logger.info(`MONGO_DB_URI ${MONGO_DB_URI}, MONGO_DB_URI_TEST, NODE_ENV`);
const connectionString = NODE_ENV ==='test'? MONGO_DB_URI_TEST : MONGO_DB_URI;
const { createCronJobs } = require("./cronjobs/cronjobs");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors())
// Configure Header HTTP

createCronJobs();



// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// Basic Routes
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/twitter`, twitterRoutes);
app.use(`/api/${API_VERSION}/hashtags`, hashtagRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})
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
  if (process.env.NODE_ENV === 'test') {
    mongoose.connection.close(function () {
      console.log('Mongoose connection disconnected');
    });
  }
module.exports = {app, server,mongoose };