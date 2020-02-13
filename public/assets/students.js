$(document).ready(function() {
  function create() {
    var error = $("#error");
    error[0].style.display = "block";
    error[0].innerHTML = `
    <strong>Matric Number should be like "16/7987" or "17/6565".</strong>
    `;
  }
  function create2() {
    var error = $("#error");
    error[0].style.display = "block";
    error[0].innerHTML = `
    <strong>No Spaces should be included in your Matric Number. </strong>
    `;
  }
  function remove(error) {
    var error = $("#error");
    error[0].style.display = "none";
  }

  var error = $("#error");
  error[0].style.display = "none";

  function show() {
    $(".overlay").css("display", "block");
    $(".overlay").css("z-index", 1);
    $(".body").css("filter", "blur(3px)");
    $("#form-2 input").prop("disabled", true);
    $("#btnSub").prop("disabled", true);
  }

  function remove2() {
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
    remove2();
  });

  $("#form-1").on("submit", function(e) {
    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var matric = $("#matric-number").val();
    var studentDetails = {
      firstName: firstName,
      lastName: lastName,
      matricNumber: matric
    };
    matric_split = matric.split("");
    matric = matric.replace(/\//g, "-");

    var multiple = 0;
    var spaces = false;

    for (var i = 0; i <= matric_split.length; i++) {
      if (matric_split[i] == " ") {
        spaces = true;
      } else if (matric_split[i] == "/") {
        multiple++;
      }
    }

    if (matric_split[2] != "/") {
      e.preventDefault();
      $(".overlay").css("display", "none");
      $(".body").css("z-index", 1);
      $(".body").css("filter", "blur(0px)");
      $("#form-2 input").prop("disabled", false);
      $("#btnSub").prop("disabled", false);
      create();
      setTimeout(remove, 5000);
    } else if (
      isNaN(Number(matric_split[0])) ||
      isNaN(Number(matric_split[1])) ||
      isNaN(Number(matric_split[3])) ||
      isNaN(Number(matric_split[4])) ||
      isNaN(Number(matric_split[5])) ||
      isNaN(Number(matric_split[6]))
    ) {
      e.preventDefault();
      $(".overlay").css("display", "none");
      $(".body").css("z-index", 1);
      $(".body").css("filter", "blur(0px)");
      $("#form-2 input").prop("disabled", false);
      $("#btnSub").prop("disabled", false);
      create();
      setTimeout(remove, 5000);
    } else if (spaces == true) {
      e.preventDefault();
      $(".overlay").css("display", "none");
      $(".body").css("z-index", 1);
      $(".body").css("filter", "blur(0px)");
      $("#form-2 input").prop("disabled", false);
      $("#btnSub").prop("disabled", false);
      create2();
      setTimeout(remove, 5000);
    } else if (matric_split.length != 7) {
      e.preventDefault();
      $(".overlay").css("display", "none");
      $(".body").css("z-index", 1);
      $(".body").css("filter", "blur(0px)");
      $("#form-2 input").prop("disabled", false);
      $("#btnSub").prop("disabled", false);
      create();
      setTimeout(remove, 5000);
    } else if (multiple > 1) {
      e.preventDefault();
      $(".overlay").css("display", "none");
      $(".body").css("z-index", 1);
      $(".body").css("filter", "blur(0px)");
      $("#form-2 input").prop("disabled", false);
      $("#btnSub").prop("disabled", false);
      create();
      setTimeout(remove, 5000);
    } else {
      $.ajax({
        type: "POST",
        url: "/students",
        data: studentDetails,
        success: function(data) {
          location.href = `/exam/${matric_split[0]}${matric_split[1]}${
            matric_split[3]
          }${matric_split[4]}${matric_split[5]}${
            matric_split[6]
          }/${firstName}/${lastName}/${0}`;
        }
      });
    }
  });
});
