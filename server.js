var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var mongoose = require('mongoose');
// var words = require('./controllers/quizController.js')
// words();

var quizController = require("./controllers/quizController.js")

var testQuiz = quizController.makeQuiz()

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

app.get("/quiz", function(req, res){
  console.log(testQuiz)
  res.send(testQuiz)
})

var port = process.env.PORT || 4040
app.listen(port, function(){
  console.log('Server running on port ' + port);

});
