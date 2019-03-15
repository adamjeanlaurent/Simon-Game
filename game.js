var userClickedPattern = []; 
var buttonColors = ["red","blue","green","yellow"];
// array for random pattern to follow
var gamePattern = []; 
var level = 0; 
var started = false;

// key press event listener to start the game
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// click event listener for user clicked pattern
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// increases level adds additional color to the game pattern
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Plays sound of given MP3 file 
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Pressing animation when player clicks on a button
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// checks if user inputed button matches the game pattern
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
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
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }   
}

//resets the game after a loss
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

