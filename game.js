var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var usrClickedPtn = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// when the button is pressed

$(".btn").on("click", function() {
  if (started) {
    var pressedBtn = $(this).attr("id");
    usrClickedPtn.push(pressedBtn);
    checkAnswer(usrClickedPtn.length - 1);
    animatePress(pressedBtn);
    playSound(pressedBtn);
  } else {
    alert("Start game first.");
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === usrClickedPtn[currentLevel]) {
    // checking user has clicked full sequence
    if (gamePattern.length === usrClickedPtn.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    // user has clicked something wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    restart();
  }
}
function animatePress(color) {
  $("#" + color).addClass("pressed");

  // making that in default state
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  usrClickedPtn = [];
  level++;
  $("#level-title").text("Level " + level);

  // random between 0-3
  var rand = Math.floor(Math.random() * 4);
  var chosenRandomColor = colors[rand];
  gamePattern.push(chosenRandomColor);

  $("#" + chosenRandomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(chosenRandomColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function restart() {
  usrClickedPtn = [];
  gamePattern = [];
  level = 0;
  started = false;
}
