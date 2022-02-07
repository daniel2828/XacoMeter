const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-test", { useNewUrlParser: true })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));
// var Sentiment = require('sentiment');
// var sentiment = new Sentiment();
// var result = sentiment.analyze('Pepe is a fucking shit.');
// console.dir(result);


const lorca = require('lorca-nlp');

var doc = lorca('esto es un test');

doc.words().get();
// [ 'esto', 'es', 'un', 'test' ]
var doc = lorca('El plátano está malo.');

console.log(doc.sentiment());
// -0.75

var doc = lorca('El camino De Santiago,a su paso por la Ruta Signo de registrado importante ser felices');

console.log(doc.sentiment());
