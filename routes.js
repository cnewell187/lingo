
var transController = require('./controllers/transController.js')
module.exports = function(app){
  app.get('/', function(req, res){
    res.send("Yo")
  })
  app.get('/api/translation/:word/:sourceLang/:targetLang', transController.translateWord)
}
