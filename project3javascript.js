function onOpen () {
  document.getElementById("startScreen").style.display="block";
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("endScreen").style.display="none";
  canvas.style.display="none";
  }

function instructionPage() {
  document.getElementById("startScreen").style.display="none";
  document.getElementById("instructions").style.display="block";
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("endScreen").style.display="none";
  canvas.style.display="none";
  }

function startGame() {
  canvas.style.display="block";
  document.getElementById("startScreen").style.display="none";
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="block";
  document.getElementById("endScreen").style.display="none";
  }

function endGame() {
  canvas.style.display="none";
  document.getElementById("startScreen").style.display="none";
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("endScreen").style.display="block";
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