var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var start = false;

$(document).keypress( function() {
  if ( !start ) {
    start = true;
    // $("h1").text("Level "+level);
    setTimeout( nextSequence, 200 );
  }
} );

$(document).click( function() {
  if ( !start ) {
    start = true;
    // $("h1").text("Level "+level);
    setTimeout( nextSequence, 200 );
  }
} );

function nextSequence() {
  level++;
  $("h1").text("Level "+level);
  var randomNum = Math.floor( Math.random() * 4);
  var randomChosenColor = buttonColors[ randomNum ];
  playSound( randomChosenColor );
  $("#"+randomChosenColor).addClass("hint");
  setTimeout( function() {$("#"+randomChosenColor).removeClass("hint");}, 100);
  gamePattern.push( randomChosenColor );
  // console.log("gamePattern: "+gamePattern);
}

$(".btn").click( function() {
  // getting the user selected color
  var userSelectedColor = $(this).attr("id");

  // play sound
  playSound( userSelectedColor );

  // animate
  $("#"+userSelectedColor).addClass("pressed");
  setTimeout( function() {$("#"+userSelectedColor).removeClass("pressed");}, 100);

  // add to user patter
  userPattern.push( userSelectedColor );
  // console.log("userPattern: "+userPattern);
  // check if so for correct
  isCorrect( userPattern.length - 1 );

});

function isCorrect( curLevel ) {

  if ( gamePattern[curLevel] == userPattern[curLevel]) {
    if ( gamePattern.length == userPattern.length ) {
      userPattern=[];
      setTimeout( nextSequence, 1000 );
    }
  }

  else {
    playSound( "wrong" );
    $("h1").text("Game Over!");
    $("body").addClass("game-over");
    gamePattern=[];
    userPattern=[];
    level=0;
    setTimeout(function() {$("body").removeClass("game-over");}, 500 );
    setTimeout( function() {$("h1").text("Press Any Key to Restart");}, 1000);
    start = false;
  }
}

function playSound( filename ) {
  var sound = new Audio( "sounds/" + filename + ".mp3");
  sound.play();
}

// $(document).on("click", nextSequence );
