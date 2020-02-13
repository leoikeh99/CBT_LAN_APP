var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require("mongoose").set("debug", true);
var Schemas = require("./schemas/Schemas");
var fs = require("fs");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// connect to mongodb cbt database
const url = "mongodb://127.0.0.1:27017/cbt";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", _ => {
  console.log("Databse connected", url);
});

db.on("error", err => {
  console.error("Connection error", err);
});

module.exports = function(app) {
  // get methods
  app.get("/lecturer", function(req, res) {
    res.render("lecturer");
  });

  app.get("/setQuestions", function(req, res) {
    Schemas.static_det.find({}, function(err, data) {
      if (err) throw err;
      res.render("setQuestions", { staticDets: data });
    });
  });

  app.get("/stats", function(req, res) {
    Schemas.resultModel.find({}, function(err, data) {
      if (err) throw err;
      Schemas.resultModel.count({}, function(err, count) {
        if (err) throw err;
        var SortedData = [];
        for (i = 0; i < count; i++) {
          SortedData.push(data[i]);
        }
        SortedData.sort((a, b) => (a.score < b.score ? 1 : -1));
        data.sort((a, b) => (a.Lname > b.Lname ? 1 : -1));
        var sum = data.reduce((total, data) => total + data.score, 0);
        var avg = sum / count;
        var avgRounded = Math.round(avg * 100) / 100;

        res.render("stats", {
          data: data,
          count: count,
          avg: avgRounded,
          SortedData: SortedData
        });
      });
    });
  });

  app.get("/resultsData", function(req, res) {
    var filePath = __dirname + "/results.txt";
    Schemas.static_det.find({}, function(err, course) {
      if (err) throw err;
      Schemas.resultModel.find({}, function(err, data) {
        if (err) throw err;
        Schemas.resultModel.count({}, function(err, count) {
          if (err) throw err;
          var SortedData = [];
          for (i = 0; i < count; i++) {
            SortedData.push(data[i]);
          }
          SortedData.sort((a, b) => (a.score < b.score ? 1 : -1));
          data.sort((a, b) => (a.Lname > b.Lname ? 1 : -1));
          var sum = data.reduce((total, data) => total + data.score, 0);
          var avg = sum / count;
          var avgRounded = Math.round(avg * 100) / 100;

          var ExternalData = "";
          ExternalData += `Course Name: ${course[0].courseName}\nCourse Code: ${course[0].courseCode}\nNumber of questions: ${course[0].noq}\n\nStudent Results:\n\n`;

          data.forEach(data => {
            ExternalData += `${data.Lname} ${data.Fname}, ${data.matricNumber} || Score: ${data.score}\n\n`;
          });

          fs.writeFile(filePath, ExternalData, function(err) {
            if (err) throw err;
            res.download(filePath, "results.txt");
          });
        });
      });
    });
  });

  // post methods
  app.post("/lecturer", urlencodedParser, function(req, res) {
    var statDet = Schemas.static_det(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.post("/setQuestions", urlencodedParser, function(req, res) {
    Schemas.QA(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
};
