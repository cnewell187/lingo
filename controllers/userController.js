
var User = require('../models/userModel.js');
module.exports = {
  createUser: createUser,
  updateQuizInfo: updateQuizInfo,
}

function createUser(req, res){
  console.log(req.body)
  var newUserDocument = new User(req.body);
  newUserDocument.save(function(err, doc) {
      if (err) {
          console.log("The Error: " + err)
          return res.send(err)
      } else {
          console.log("A new hero has joined the Super Friends!")
          return res.send(doc)
      }
  })
}

function updateQuizInfo(req, res){

}
