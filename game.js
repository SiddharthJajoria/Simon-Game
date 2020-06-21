var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started= false;

var level=0;


$(document).keydown(function(){
  if(started===false){
    // $("#level-title").text("Level"+level);
    nextSequence();
    started=true;
  }
})



function nextSequence(){
  userClickedPattern=[];
  level+=1;
  $("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

// animation
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
//For user Input
$(".btn").click(function(){
  var userChosenColour=this.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
})

//for audio on click
function playSound(name){
  //Audio
    var audio= new Audio(name+".mp3")
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100);
}



function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence()
      },1000);
    }

  }else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var audio1=new Audio("wrong.mp3")
    audio1.play();
    $("h1").text("Game Over. Press any key to continue");
    startOver();
  }
}
