$(document).ready(function() {
  var scoreMarker = $(".score-mark");
  var yourScore = $(".your-score");
  var score = Number($("#score").text());
  var noq = Number($("#NOQ").text());

  var percentLevel = (score / noq) * 100;
  var percentText = Math.round(percentLevel * 100) / 100;

  scoreMarker.css("color", "#000");
  scoreMarker.css("padding", "10px 1px");
  scoreMarker.css("font-weight", "bold");
  scoreMarker.css("width", `${percentText}%`);
  yourScore.html(`<strong>Your score: ${percentText}% </strong>`);

  if (percentLevel >= 75) {
    scoreMarker.css("background", "#229954");
  } else if (percentLevel >= 60) {
    scoreMarker.css("background", "#EB812D");
  } else if (percentLevel >= 50) {
    scoreMarker.css("background", "#B4550A ");
  } else {
    scoreMarker.css("background", "#C12308");
  }

  console.log(percentText);
});
