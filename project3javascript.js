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
  gameMusic.play();
  gameOver.stop();
  gameOver.reset();
}

function endGame() {
  gameStarted=false;
  canvas.style.display="none";
  document.getElementById("instructions").style.display="none";
  document.getElementById("gameScreen").style.display="none";
  document.getElementById("endScreen").style.display="block";
  gameMusic.stop();
  gameOver.play();
  gameMusic.reset();
  }
  
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp') {
      if (!gameStarted) {
       restartGame();
       }
    } else if (event.code === 'ArrowUp' && document.getElementById("startScreen").classlist.contains("hidden")) {
       if (gameStarted) {
        onOpen();
      }
     }
   }); 