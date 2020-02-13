$(document).ready(function() {
  var counter = 0;
  var questions = [];
  var answers = [];
  var next = $("#next");
  var prev = $("#prev");
  var submit = $("#form-1");
  var noq = Number($("#NOQ").text());
  var time = Number($("#TIME").text());
  var secs = time * 60;
  var count = 0;
  var countDown = $(".countDown");

  function startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    setInterval(function() {
      count++;
      if (count == secs - 60) {
        countDown.css("color", "red");
      }
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.html(`Time remaining: ${minutes}mins  ${seconds}s`);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  startTimer(time * 60, countDown);

  function show() {
    $(".overlay").css("display", "block");
    $(".overlay").css("z-index", 1);
    $(".body").css("filter", "blur(3px)");
    $("#form-2 input").prop("disabled", true);
    $("#btnSub").prop("disabled", true);
  }

  function remove() {
    $(".overlay").css("display", "none");
    $(".body").css("z-index", 1);
    $(".body").css("filter", "blur(0px)");
    $("#form-2 input").prop("disabled", false);
    $("#btnSub").prop("disabled", false);
  }

  for (var i = 1; i <= noq; i++) {
    questions[i - 1] = $(`.question${i}`);
  }
  for (var i = 2; i <= noq; i++) {
    questions[i - 1].css("display", "none");
  }

  next.click(function() {
    counter++;
    if (counter == 0) {
      for (var i = 2; i <= noq; i++) {
        questions[i - 1].css("display", "none");
      }
      questions[0].css("display", "block");
    } else {
      questions[counter - 1].css("display", "none");
      questions[counter].css("display", "block");
    }
    if (counter + 1 == noq) {
      next.prop("disabled", true);
    } else if (counter + 1 != noq) {
      next.prop("disabled", false);
    }

    if (counter <= 0) {
      prev.prop("disabled", true);
    } else {
      prev.prop("disabled", false);
    }
  });

  prev.prop("disabled", true);

  prev.click(function() {
    counter--;
    if (counter == 0) {
      prev.prop("disabled", true);
      next.prop("disabled", false);

      for (var i = 2; i <= noq; i++) {
        questions[i - 1].css("display", "none");
      }
      questions[0].css("display", "block");
    } else {
      prev.prop("disabled", false);
      questions[counter + 1].css("display", "none");
      questions[counter].css("display", "block");
    }

    if (counter != noq) {
      next.prop("disabled", false);
    }
  });

  function timer() {
    for (var i = 1; i <= noq; i++) {
      if ($(`input[name=Q${i}]:checked`).length > 0) {
        if ($(`#Q${i}-OptOne`).is(":checked")) {
          answers[i - 1] = "A";
        } else if ($(`#Q${i}-OptTwo`).is(":checked")) {
          answers[i - 1] = "B";
        } else if ($(`#Q${i}-OptThree`).is(":checked")) {
          answers[i - 1] = "C";
        } else if ($(`#Q${i}-OptFour`).is(":checked")) {
          answers[i - 1] = "D";
        }
      } else {
        answers[i - 1] = "NA";
      }
    }

    var matric = $("#matric").text();
    var fname = $("#fname").text();
    var lname = $("#lname").text();
    matric = matric.replace(/\s/g, "");
    fname = fname.replace(/\s/g, "");
    lname = lname.replace(/\s/g, "");
    matric2 = matric.replace(/\//g, "");
    fname2 = matric.replace(/\//g, "");
    lname2 = matric.replace(/\//g, "");

    var Student_Answers = {
      matricNumber: matric,
      Answers: answers,
      noq: noq,
      Fname: fname,
      Lname: lname
    };

    console.log(Student_Answers);

    $.ajax({
      type: "POST",
      url: `/exam/${matric2}/${fname2}/${lname2}`,
      contentType: "application/json",
      data: JSON.stringify(Student_Answers),
      success: function(data) {
        location.href = `/done/timeout/${matric2}/${data.writtenTwice}`;
      }
    });
  }

  submit.on("submit", function(e) {
    e.preventDefault();
    for (var i = 1; i <= noq; i++) {
      if ($(`input[name=Q${i}]:checked`).length > 0) {
        if ($(`#Q${i}-OptOne`).is(":checked")) {
          answers[i - 1] = "A";
        } else if ($(`#Q${i}-OptTwo`).is(":checked")) {
          answers[i - 1] = "B";
        } else if ($(`#Q${i}-OptThree`).is(":checked")) {
          answers[i - 1] = "C";
        } else if ($(`#Q${i}-OptFour`).is(":checked")) {
          answers[i - 1] = "D";
        }
      } else {
        answers[i - 1] = "NA";
      }
    }

    var matric = $("#matric").text();
    var fname = $("#fname").text();
    var lname = $("#lname").text();
    matric = matric.replace(/\s/g, "");
    fname = fname.replace(/\s/g, "");
    lname = lname.replace(/\s/g, "");
    matric2 = matric.replace(/\//g, "");
    fname2 = matric.replace(/\//g, "");
    lname2 = matric.replace(/\//g, "");

    var Student_Answers = {
      matricNumber: matric,
      Answers: answers,
      noq: noq,
      Fname: fname,
      Lname: lname
    };

    console.log(Student_Answers);

    $.ajax({
      type: "POST",
      url: `/exam/${matric2}/${fname2}/${lname2}`,
      contentType: "application/json",
      data: JSON.stringify(Student_Answers),
      success: function(data) {
        location.href = `/done/submitted/${matric2}/${data.writtenTwice}`;
      }
    });
  });

  $("#form-2").on("submit", function(e) {
    e.preventDefault();
    show();
  });

  $("#NO").on("click", function() {
    remove();
  });

  setTimeout(timer, time * 60 * 1000);
});
