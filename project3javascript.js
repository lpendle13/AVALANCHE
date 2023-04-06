var gameCanvas = document.getElementById("gameCanvas");

function onOpen () {
    document.getElementById("levelOne").style.display="none";
    document.getElementById("startTwo").style.display="none";
    document.getElementById("levelTwo").style.display="none";
    document.getElementById("loseTwo").style.display="none";
    document.getElementById("startThree").style.display="none";
    document.getElementById("levelThree").style.display="none";
    document.getElementById("loseThree").style.display="none";
    document.getElementById("winScreen").style.display="none";
    document.getElementById("gameCanvas").style.display="none";
  }
  
function startLevelOne() {
    document.getElementById("gameCanvas").style.display="block";
    document.getElementById("startScreen").style.display="none";
    document.getElementById("levelOne").style.display="block";
  }

function startLevelTwo() {
    document.getElementById("gameCanvas").style.display="block";
    document.getElementById("startScreen").style.display="none";
    document.getElementById("startTwo").style.display="none";
    document.getElementById("levelTwo").style.display="block";
  }

function startLevelThree() {
    document.getElementById("gameCanvas").style.display="block";
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

gameCanvas.addEventListener('37', (e) => {
    //tilt left
});

gameCanvas.addEventListener('39', e => {
    //tilt right
});
*/