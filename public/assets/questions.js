$(document).ready(function() {
  //   $(".btnSub").attr("disabled", true);
  var answer = [];
  var question_answers = [];
  var question_text = [];
  var As = [];
  var Bs = [];
  var Cs = [];
  var Ds = [];
  var check = false;

  var data = $(".form input:last")
    .prev()
    .val();
  var noq = Number(data); //Number of questions
  console.log(noq);

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

  $("#form-2").on("submit", function(e) {
    e.preventDefault();
    show();
  });

  $("#NO").on("click", function() {
    remove();
  });

  $("#form-1").on("submit", function(e) {
    for (i = 1; i <= noq; i++) {
      question_text[i] = $(`#question${i}text`).val();
      if ($(`#Q${i}-OptOne`).is(":checked")) {
        answer[i] = "A";
      } else if ($(`#Q${i}-OptTwo`).is(":checked")) {
        answer[i] = "B";
      } else if ($(`#Q${i}-OptThree`).is(":checked")) {
        answer[i] = "C";
      } else if ($(`#Q${i}-OptFour`).is(":checked")) {
        answer[i] = "D";
      }
    }

    for (i = 1; i <= noq; i++) {
      As[i - 1] = $(`#A${i}`).val();
      Bs[i - 1] = $(`#B${i}`).val();
      Cs[i - 1] = $(`#C${i}`).val();
      Ds[i - 1] = $(`#D${i}`).val();

      question_answers[i - 1] = {
        Question: question_text[i],
        OptionOne: As[i - 1],
        OptionTwo: Bs[i - 1],
        OptionThree: Cs[i - 1],
        OptionFour: Ds[i - 1],
        answer: answer[i]
      };

      $.ajax({
        type: "POST",
        url: "/setQuestions",
        data: question_answers[i - 1],
        success: function(data) {
          console.log(data);
          window.location.href = "/stats";
        }
      });
    }
  });
});
