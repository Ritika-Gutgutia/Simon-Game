var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = true;

function nextSequence() {

  userClickedPattern = [];
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  var selectedId = "#" + randomChosenColour;
  $(selectedId).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $("h1").text("Level-" + level);
  level++;


}

$(".btn").on("click", function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {

  var audioToBePlayed = name + ".mp3";
  var audio = new Audio("sounds/" + audioToBePlayed);
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed").delay(100).removeClass("pressed");
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
}
}
 else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

  $("h1").text("Game Over, Press any key to restart");
  startOver();
}
}

if (started) {
  document.addEventListener("keydown", function() {
    started = false;
    nextSequence();

  });
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = true;
}
