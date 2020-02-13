var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var fs = require("fs");
require("mongoose").set("debug", true);
var Schemas = require("./schemas/Schemas");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

// connect to mongodb cbt databse
const url = "mongodb://127.0.0.1:27017/cbt";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", _ => {
  console.log("Databse connected", url);
});

db.on("error", err => {
  console.error("Connection error", err);
});

var counter2 = 0;
module.exports = function(app) {
  // get methods
  app.get("/students", function(req, res) {
    Schemas.static_det.find({}, function(err, data) {
      res.render("students", { det: data });
    });
  });

  app.get("/exam/:id/:id1/:id2/:id3", function(req, res) {
    Schemas.resultModel.find({}, function(err, data) {
      if (err) throw err;
      var written = false;
      var preRegistered = false;
      Schemas.StudentDetails.count({}, function(err, count) {
        if (err) throw err;
        Schemas.StudentDetails.find({}, function(err, data1) {
          if (err) throw err;
          var counter = 0;

          for (var i = 0; i < count; i++) {
            var matric = data1[i].matricNumber;
            matric = matric.replace(/\//g, "");
            if (req.params.id == matric) {
              counter2++;
              counter++;
            }
          }
          if (counter > 1) {
            preRegistered = true;
          }

          if (counter2 > 1) {
            preRegistered = true;
          }

          Schemas.resultModel.count({}, function(err, count1) {
            if (err) throw err;
            for (var i = 0; i < count1; i++) {
              var matric = data[i].matricNumber;
              matric = matric.replace(/\//g, "");
              if (req.params.id == matric) {
                written = true;
              }
            }
            if (preRegistered == true) {
              res.render("examination", {
                det: "preRegistered",
                data: "preRegistered",
                matric: req.params.id,
                Fname: "preRegistered",
                Lname: "preRegistered"
              });
            } else if (data.length != 0 && written == true) {
              res.render("examination", {
                det: "preWritten",
                data: "preWritten",
                matric: req.params.id,
                Fname: "preWritten",
                Lname: "preWritten"
              });
            } else {
              Schemas.static_det.find({}, function(err, data1) {
                Schemas.QA.find({}, function(err, data2) {
                  res.render("examination", {
                    det: data1,
                    data: data2,
                    matric: req.params.id,
                    Fname: req.params.id1,
                    Lname: req.params.id2
                  });
                });
              });
            }
          });
        });
      });
    });
  });

  //post methods
  app.post("/students", urlencodedParser, function(req, res) {
    counter2 = 0;
    var details = Schemas.StudentDetails(req.body).save(function(err, data) {
      if (err) throw err;
    });
    res.json(req.body);
  });

  app.post("/exam/:id/:id1/:id2", jsonParser, function(req, res) {
    data = req.body;

    Schemas.resultModel.find({}, function(err, result) {
      if (err) throw err;
      var written = false;
      var data3 = {};

      Schemas.resultModel.count({}, function(err, count1) {
        if (err) throw err;
        for (var i = 0; i < count1; i++) {
          var matric = result[i].matricNumber;
          matric = matric.replace(/\//g, "");
          if (req.params.id == matric) {
            written = true;
          }
        }

        if (written == true) {
          data3 = {
            writtenTwice: "Yes"
          };
        } else {
          data3 = {
            writtenTwice: "No"
          };
          Schemas.QA.find({}, function(err, data2) {
            Schemas.StudentDetails.count({}, function(err, count) {
              if (err) throw err;
              Schemas.StudentDetails.find({}, function(err, data1) {
                var matric;
                var score = 0;
                var noq = data.noq;
                for (var i = 0; i < count; i++) {
                  if (data.matricNumber == data1[i].matricNumber) {
                    matric = data.matricNumber;
                    for (var x = 0; x < noq; x++) {
                      if (data.Answers[x] == data2[x].answer) {
                        score++;
                      } else if (data.Answers[x] == "NA") {
                        score += 0;
                      } else {
                        score += 0;
                      }
                    }
                  }
                }
                var result = {
                  matricNumber: matric,
                  Fname: data.Fname,
                  Lname: data.Lname,
                  score: score
                };

                var save = Schemas.resultModel(result).save(function(
                  err,
                  data
                ) {
                  if (err) throw err;
                  console.log(data);
                });
              });
            });
          });
        }
        res.json(data3);
      });
    });
  });

  app.get("/done/:id/:id1/:id2", function(req, res) {
    Schemas.static_det.find({}, function(err, data5) {
      noq = data5[0].noq;
    });
    Schemas.resultModel.find({}, function(err, result) {
      if (err) throw err;
      var score = 0;
      Schemas.resultModel.count({}, function(err, count1) {
        if (err) throw err;
        for (var i = 0; i < count1; i++) {
          var matric = result[i].matricNumber;
          matric = matric.replace(/\//g, "");
          if (req.params.id1 == matric) {
            score = result[i].score;
          }
        }

        data = {
          punctual: req.params.id,
          matric: req.params.id1,
          writtenTwice: req.params.id2,
          score: score,
          noq: noq
        };
        res.render("done", { data: data });
      });
    });
  });
};
