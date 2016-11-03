var request = require('request')

function translateWord(req, res) {
    var gtEndpoint = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCLGUGn7uSe2i1oeNaxH9Mur6TM0uJ1jh8';
    //var gtTest = "&q=hello%20world&source=en&target=es"


    var gtWord = req.params.word
    var gtSource = req.params.sourceLang
    var gtTarget = req.params.targetLang
    console.log("Making a request to googs")
    request(`${gtEndpoint}&q=${gtWord}&source=${gtSource}&target=${gtTarget}`, (err, response, body) => {

      if(err){
        console.log("The Error",err)
      }
        res.send(body);
    });


}

module.exports = {
    translateWord: translateWord
}
