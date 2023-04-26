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

stuff to add:
  var score component - by time passed
  var background component - mountain image
  stop method
  audio
  game over
  reset button

visuals to add:
  mountain background
  snowball
  platforms
  lose/restart screen
  win screen
  final win screen

determine dimensions of canvas and browser
*/