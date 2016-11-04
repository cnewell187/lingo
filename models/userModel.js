var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lingoUsers', function(err){
  if (err) {
      console.log("Error: " + err);
  } else {
      console.log("Connection succesful!")
  }
})

var wordInfo = mongoose.Schema({
  word:{type: String, required:true},
  correct:{type: Number, required:true, default: 0},
  wrong:{type: Number, required:true, default: 0},
  lastQuizzed:{type: Number, required:true, default: Date.now()},
})

var userSchema = mongoose.Schema({
  name: {type: String, required:true},
  wordPool: [wordInfo], // would have this for one language
  quizzesPassed: {type: Number, required:true, default: 0},
  quizzesFailed: {type: Number, required:true, default: 0},
  totalWordsCorrect: {type: Number, required:true, default: 0},
  totalWordsWrong: {type: Number, required:true, default: 0},
});

module.exports = mongoose.model('User', userSchema, 'userPalace'); //third arg is mongo db collection name
