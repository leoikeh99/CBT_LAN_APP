var mongoose = require("mongoose");
require("mongoose").set("debug", true);

// connect to mongodb
const url = "mongodb://127.0.0.1:27017/cbt";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", _ => {
  console.log("Databse connected", url);
});

db.on("error", err => {
  console.error("Connection error", err);
});

//StudentDetails Schema
var studentDetailsSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  matricNumber: String,
  written: String
});

var Results = mongoose.Schema({
  matricNumber: String,
  Fname: String,
  Lname: String,
  score: Number
});

var static_dets_Schema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  lectName: String,
  TyEx: String,
  time: Number,
  noq: Number
});

var questions_answersSchema = mongoose.Schema({
  //Questions Options and Answers Schema
  Question: String,
  OptionOne: String,
  OptionTwo: String,
  OptionThree: String,
  OptionFour: String,
  answer: String
});

var static_det = mongoose.model("static_dets", static_dets_Schema);
var QA = mongoose.model("Question_Answer", questions_answersSchema);
var StudentDetails = mongoose.model("StudentDetails", studentDetailsSchema);
var resultModel = mongoose.model("StudentResults", Results);

var SchemaValues = {
  static_det: static_det,
  QA: QA,
  StudentDetails: StudentDetails,
  resultModel: resultModel
};

module.exports = SchemaValues;
