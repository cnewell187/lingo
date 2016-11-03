var quizController = require("./controllers/quizController.js")
var transController = require('./controllers/transController.js')
module.exports = function(app){
  app.get('/', function(req, res){
    res.send("Yo")
  })
  app.get('/api/translation/:word/:sourceLang/:targetLang', transController.translateWord)
  app.get('/quiz', quizController.makeQuiz)
}
