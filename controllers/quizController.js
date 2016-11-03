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

function quizItem(baseWord) {
    this.word = baseWord;


    this.tWord = translateWord(baseWord);
}




module.exports = {
    quizItem: quizItem,
    makeQuiz: makeQuiz,
}


function makeQuiz() {
    var requested = 0;
    var translatedWords = [];

    //ten is quiz length
    function insertOne() {
        var translatedWord;
        var gtEndpoint = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyCLGUGn7uSe2i1oeNaxH9Mur6TM0uJ1jh8';
        var gtWord = wordPool.words[Math.floor(Math.random() * 10)]
        var gtSource = "en"
        var gtTarget = "es"

        request(`${gtEndpoint}&q=${gtWord}&source=${gtSource}&target=${gtTarget}`, (err, response, body) => {

            if (err) {
                console.log("The Error", err)
            }

            translatedWord = JSON.parse(response.body).data.translations[0].translatedText
            translatedWords.push({
                word: gtWord,
                tword: translatedWord
            })
            requested++;
            if (requested === 10) {
                console.log(translatedWords)
            } else {
                insertOne();
            }
            //console.log("Translated Word in translateWord function: ", translatedWord)
        });

    };

    insertOne();
}
