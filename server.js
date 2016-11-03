var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var mongoose = require('mongoose');
// var words = require('./controllers/quizController.js')
// words();

var quizController = require("./controllers/quizController.js")

quizController.buildQuiz()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lingo', function(err) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Connection succesful!")
    }
})

var app = express();
routes(app);

var port = process.env.PORT || 4040
app.listen(port, function(){
  console.log('Server running on port ' + port);

});
