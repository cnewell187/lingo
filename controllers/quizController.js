var wordPool = require("../models/wordPool.json")
var request = require('request')
    // var transController = require('./transController.js')



function translateWord(baseWord) {
    var translatedWord;
    var gtEndpoint = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCLGUGn7uSe2i1oeNaxH9Mur6TM0uJ1jh8';
    //var gtTest = "&q=hello%20world&source=en&target=es"


    var gtWord = baseWord
    var gtSource = "en"
    var gtTarget = "es"
    request(`${gtEndpoint}&q=${gtWord}&source=${gtSource}&target=${gtTarget}`, (err, response, body) => {

        if (err) {
            console.log("The Error", err)
        }
        translatedWord = JSON.parse(response.body).data.translations[0].translatedText
            //console.log("Translated Word in translateWord function: ", translatedWord)
        return translatedWord;
    });
}




module.exports = {
    makeQuiz: makeQuiz,
    storeQuizData: storeQuizData,
}


function makeQuiz(req, res) {
    var requested = 0;
    var translatedWords = [];


    function insertOne() {
        var translatedWord;
        var gtEndpoint = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCLGUGn7uSe2i1oeNaxH9Mur6TM0uJ1jh8';
        var gtWord = wordPool.words[Math.floor(Math.random() * wordPool.words.length)]
        var gtSource = "en"
        var gtTarget = "es"

        request(`${gtEndpoint}&q=${gtWord}&source=${gtSource}&target=${gtTarget}`, (err, response, body) => {

            if (err) {
                console.log("The Error", err)
            }

            translatedWord = JSON.parse(response.body).data.translations[0].translatedText
            translatedWords.push({
                word: gtWord,
                tword: translatedWord,
                correct: false,
                lastTaken: Date.now(),
            })
            requested++;
            if (requested === 10) {
              var quizzy = new quiz(translatedWords)
              console.log(quizzy) //res.send(quizzy) here
              res.send(quizzy)
            } else {
                insertOne();
            }
            //console.log("Translated Word in translateWord function: ", translatedWord)
        });

    };

    insertOne();
}

function quiz(quizInfo){
  this.quiz = quizInfo
}

function storeQuizData(req, res){
  console.log("The req body: ",req.body)
  res.send("Quiz Submitted")
}
