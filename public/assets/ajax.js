$(document).ready(function() {
  var error = $("#error");
  error[0].style.display = "none";

  function create() {
    var error = $("#error");
    error[0].style.display = "block";
    error[0].innerHTML = `
    <strong>Inputs should be more than zero</strong>
    `;
  }
  function remover(error) {
    var error = $("#error");
    error[0].style.display = "none";
  }

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

  $("#form-1").on("submit", function() {
    var courseName = $("#course-name");
    var courseCode = $("#course-code");
    var lectName = $("#lect-name");
    var time = $("#time");
    var noq = $("#noq");
    var TyEx;

    if ($("#quiz").is(":checked")) {
      TyEx = $("#quiz");
    } else if ($("#mid-sem").is(":checked")) {
      TyEx = $("#mid-sem");
    } else if ($("#fin-exam").is(":checked")) {
      TyEx = $("#fin-exam");
    }

    var dets = {
      courseName: courseName.val(),
      courseCode: courseCode.val(),
      lectName: lectName.val(),
      TyEx: TyEx.val(),
      time: time.val(),
      noq: noq.val()
    };

    if (time.val() <= 0 || noq.val() <= 0) {
      remove();
      create();
      setTimeout(remover, 5000);
    } else {
      $.ajax({
        type: "POST",
        url: "/lecturer",
        data: dets,
        success: function(data) {
          window.location.href = "/setQuestions";
        }
      });
    }

    return false;
  });
});
