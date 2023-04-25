function onOpen () {
    document.getElementById("levelOne").style.display="none";
    document.getElementById("startTwo").style.display="none";
    document.getElementById("levelTwo").style.display="none";
    document.getElementById("loseTwo").style.display="none";
    document.getElementById("startThree").style.display="none";
    document.getElementById("levelThree").style.display="none";
    document.getElementById("loseThree").style.display="none";
    document.getElementById("winScreen").style.display="none";
    canvas.style.display="none";
  }

  function startGame() {
    canvas.style.display="block";
    document.getElementById("startScreen").style.display="none";
    document.getElementById("levelOne").style.display="block";
  }

function startLevelTwo() {
    document.getElementById("startScreen").style.display="none";
    document.getElementById("startTwo").style.display="none";
    document.getElementById("levelTwo").style.display="block";
  }

function startLevelThree() {
    document.getElementById("startScreen").style.display="none";
    document.getElementById("startThree").style.display="none";
    document.getElementById("levelThree").style.display="block";  
  }
/*
  function endingLevelOne() {
    //if ball reaches bottom, display win screen
    //else, display lose screen
  }
  function endingLevelTwo() {
    //if ball reaches bottom, display win screen
    //else, display lose screen
  }
  function endingLevelThree() {
    //if ball reaches bottom, display final win screen
    //else, display lose screen
  }

stuff to add:
  var game piece component - snowball
  var obstacles - platforms
  var score component - by time passed
  var background component - mountain image
  update game area - frame rate
  clear and update functions
  obstacles movement - upwards to keep ball centered
  speedX and speedY 
  add event listener for key presses - 37 for left, 39 for right
  gravity
  stop method
  collision detection
  frame counter and execution for multiple obstacles - add obstacle at set intervals
  randomization of obstacle size and position

visuals to add:
  start screen
  mountain background
  snowball
  platforms
  lose/restart screen
  win screen
  final win screen

determine dimensions of canvas and browser
*/