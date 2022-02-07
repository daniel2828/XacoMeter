const { API_VERSION } = require("./config");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3977;
// Routes
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Basic Routes
app.use(`/api/${API_VERSION}/users`, userRoutes);

// Connect mongo and express
mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-test", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected");
    app.listen(port, () => {
      console.log("#######################");
      console.log("#######################");
      console.log("###### API REST ######");
      console.log("#######################");
      console.log("#######################");
      console.log(`http://localhost:${port}/api/${API_VERSION}/`);
    });
  })
  .catch((err) => console.log(err));

// var Sentiment = require('sentiment');
// var sentiment = new Sentiment();
// var result = sentiment.analyze('Pepe is a fucking shit.');
// console.dir(result);

// const lorca = require('lorca-nlp');

// var doc = lorca('esto es un test');

// doc.words().get();
// // [ 'esto', 'es', 'un', 'test' ]
// var doc = lorca('El plátano está malo.');

// console.log(doc.sentiment());
// // -0.75

// var doc = lorca('El camino De Santiago,a su paso por la Ruta Signo de registrado importante ser felices');

// console.log(doc.sentiment());
