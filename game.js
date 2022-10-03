var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColour;
var level = 0;

$(".btn").click(function() {
  var clk = $(this).attr("id");
  makeSound(clk);
  fading(clk);
  
  userClickedPattern.push(clk);

  checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function() {
  if (level === 0) {
    nextSequence()
    $("h1").text("Level 0");
  }
})

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("h1").text("Level " + level);
  level++;
  console.log(userClickedPattern);
  console.log(gamePattern);
  return (randomNumber);
}

function checkAnswer(currentLevel) {
  if ((gamePattern.at(currentLevel)) == userClickedPattern.at(currentLevel)) {
    console.log("success");
    if ((gamePattern.length - 1) == currentLevel) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function makeSound(colour) {

  switch (colour) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;


    default:
      console.log(colour)

  }
};

function fading(button) {

  $("#" + button).addClass("pressed").fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
  });
  setTimeout(function() {
    $("#" + button).removeClass("pressed");
  }, 100);
};
