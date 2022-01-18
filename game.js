var buttonColours = [
  "red", "blue", "green", "yellow"
];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var game = false;


function nextSequence(){
   var randomNumber = Math.round(Math.random() * 3);
   randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   $("h1").html("Level = " + level);
   level++
   console.log("cpu " + gamePattern);
};

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout( function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  console.log(userClickedPattern[currentLevel], gamePattern[currentLevel]);
  if (currentLevel === (level-1) && userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    userClickedPattern.splice(0, userClickedPattern.length);
    setTimeout(function(){nextSequence()},1000);
    return "sucess";
  }

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("sucess");
    return "sucess";
  }

  else{
    console.log("game over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout( function(){
      $("body").removeClass("game-over");
    },100);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver()
    return "game over";
  }
};

function startOver() {
level = 0;
gamePattern = [];
userClickedPattern = [];
game = false;
}


$(".btn").click(function(event){
  if(game=true){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log("p " +userClickedPattern);
    checkAnswer(userClickedPattern.length-1);}
  else {
    $("body").addClass("game-over");
    setTimeout( function(){
      $("body").removeClass("game-over");
    })
  }
});

$(document).keydown(function (){
  if(game===false) {nextSequence();
    game = true;
    $("h1").html("Level = 0");
  }
});
