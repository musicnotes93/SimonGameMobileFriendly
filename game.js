var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).on("keypress", function(e) {
  if(e.which == 13) {
        $("#level-title").text("Level " + level);
        startOver();
      }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    };

function startOver() {
    level = 0;
    gamePattern = [];
    nextSequence();
}


function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
          if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
          } else {
          console.log("wrong");
          var wrongAudio = new Audio ("sounds/wrong.mp3");
          wrongAudio.play();
          $("body").addClass("game-over");
          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
          $("#level-title").text("Game Over, Press 'Enter' to Restart");
          }
        }

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          $("#level-title").text("Press Here to Start Game");
          $("#level-title").on("click", function() {
            startOver();
          });
          function checkAnswer(currentLevel) {
            if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
             console.log("success");
                   if (userClickedPattern.length === gamePattern.length){
                     setTimeout(function () {
                       nextSequence();
                     }, 1000);
                 }
                   } else {
                   console.log("wrong");
                   var wrongAudio = new Audio ("sounds/wrong.mp3");
                   wrongAudio.play();
                   $("body").addClass("game-over");
                   setTimeout(function() {
                     $("body").removeClass("game-over");
                   }, 200);
                   $("#level-title").text("Game Over, Press Here to Restart");
                   }
                 }
         }
 
