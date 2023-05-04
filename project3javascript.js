function onOpen () {
  gameStarted=false;
  canvas.style.display="none";
  document.getElementById("head").style.visibility="visible";
  document.getElementById("instructions").style.display="block";
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("endScreen").style.display="none";
  }


function startGame() {
  gameStarted=true;
  canvas.style.display="block";
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="block";
  document.getElementById("endScreen").style.display="none";
  }

function endGame() {
  gameStarted=false;
  canvas.style.display="none";
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("endScreen").style.display="block";
  }
