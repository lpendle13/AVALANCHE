
let xPosition = 500;
let yPosition = 200;
let diameter = 50;
let score = 0;

//// Keep track of the speed of the ball
let ySpeed = 0;
let xSpeed = 0;

let gameStarted = false;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.3;
let horizontalAcceleration = 0.2;

let platform = [];
var platformNumber = 12; 
var platformGap = 100;

let leftPressed = false;
let rightPressed = false;

var backgroundImg = document.createElement("IMG");
  backgroundImg.setAttribute("src", "graphics/BackgroundGame.png");
  backgroundImg.setAttribute("width", "1000");
  backgroundImg.setAttribute("height", "572");
var platformImg = document.createElement("IMG");
  platformImg.setAttribute("src", "graphics/Platforms.png");
  platformImg.setAttribute("width", "200");
  platformImg.setAttribute("height", "15");
var platformLeft = document.createElement("IMG");
  platformLeft.setAttribute("src", "graphics/PlatformsLeft.png");
  platformLeft.setAttribute("width", "193");
  platformLeft.setAttribute("height", "60");
var platformRight = document.createElement("IMG");
  platformRight.setAttribute("src", "graphics/PlatformsRight.png");
  platformRight.setAttribute("width", "193");
  platformRight.setAttribute("height", "60");
var snowballImg = document.createElement("IMG");
  snowballImg.setAttribute("src", "graphics/Ball.png");
  snowballImg.setAttribute("width", "50");
  snowballImg.setAttribute("height", "50");

class Platform { 
  constructor() {
    this.height = 15;
    this.tiltAngle = 0;
    }
}

function setup() {
  gameMusic = new sound("audio/gameMusic.mp3");
  gameOver = new sound("audio/gameOver.mp3");

  createCanvas(1000, 572);

  //create platforms
  platform[0] = new Platform();
  platform[0].x = 400;
  platform[0].y = 200;
  for (let i = 1; i < platformNumber; i++) {
    platform[i] = new Platform();
    platform[i].x = random(0, 800);
    platform[i].y = random(0, 100);
  }

// Event listeners for arrow key controls
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    leftPressed = true;
  } else if (event.code === 'ArrowRight') {
    rightPressed = true;
  } else if (event.code === 'ArrowUp') {
    startGame();
  }
});
document.addEventListener('keyup', function(event) {
  if (event.code === 'ArrowLeft') {
    leftPressed = false;
  } else if (event.code === 'ArrowRight') {
    rightPressed = false;
  }
});

// gameLoop continuously checks if the right and left arrow keys are being held
function gameLoop() {
  if (leftPressed) {
    for (let i = 0; i < platformNumber; i++) {
      platform[i].tiltAngle = -0.25;
    }
  } else if (rightPressed) {
    for (let i = 0; i < platformNumber; i++) {
      platform[i].tiltAngle = 0.25;
    }
  } else if (leftPressed === false || rightPressed === false) {
    for (let i = 0; i < platformNumber; i++) {
    platform[i].tiltAngle = 0;
  }
  }
}
setInterval(gameLoop, 16); 
}

function draw() {
  background(255);

  //draw canvas background image
  var context = canvas.getContext("2d");
  context.drawImage(backgroundImg,0,0);

  drawPlatform();

  //draw platform images based on tilt angle
  for (let i = 0; i < platformNumber; i++){
   if (platform[i].tiltAngle === -0.25) {
   var context = canvas.getContext("2d");
   context.drawImage(platformLeft,platform[i].x, platform[i].y-20,193,60);
 } else if (platform[i].tiltAngle === 0.25) {
   var context = canvas.getContext("2d");
   context.drawImage(platformRight,platform[i].x, platform[i].y-20,193,60);
 } else if (platform[i].tiltAngle === 0) {
   var context = canvas.getContext("2d");
   context.drawImage(platformImg,platform[i].x, platform[i].y-5,200,16);
  }  
}
  //Draw the ball
  noFill();
  var context = canvas.getContext("2d");
  context.drawImage(snowballImg,xPosition-25, yPosition-25, diameter, diameter);

  collisionCheck();
  boundaryCheck();

if (gameStarted === true) {
  ySpeed += gravityAcceleration;
  xSpeed += horizontalAcceleration * sin(platform[0].tiltAngle);
  yPosition += ySpeed;
  xPosition += xSpeed;
  ySpeed *= 0.987;
  xSpeed *= 0.987;
  score += 1;
  document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + score.toString();
}
}

// Create and move the platforms
function drawPlatform() {
  for (let i = 0; i < platformNumber; i++) {
   if (gameStarted===false) {
    platform[i].y = 400;
    stroke(0);
  } else if (gameStarted===true) {
  push();
  translate(platform[i].x + 100, platform[i].y + platform[i].height/2);
  rotate(platform[i].tiltAngle);
  pop();
  platform[i].y = 650 + i * platformGap - (frameCount % (650 + i * platformGap));
  }
}}

// Check for collisions with each platform and bounce the ball
function collisionCheck() {
  let inContact = false; 
  for (let i = 0; i < platformNumber; i++) {
    if (collideRectCircle(platform[i].x, platform[i].y, 200, platform[i].height, xPosition, yPosition, diameter)) {
      inContact = true; 
      ySpeed = -ySpeed * 0.8; 
      yPosition = platform[i].y - diameter/2; 
    }}
    if (inContact) {
      xSpeed += horizontalAcceleration * sin(platform[0].tiltAngle);
    }
  } 

// Check for collision with the edge of the game window and end the game
function boundaryCheck() {
    if (xPosition + diameter/2 > width || xPosition - diameter/2 < 0 || yPosition + diameter/2 > height || yPosition - diameter/2 < 0) {
      document.getElementsByClassName('finalScore')[0].innerHTML = 'Congratulations! Score: ' + score.toString();
      endGame();
    }
  }

// Reset the ball and platforms when starting a new game
function restartGame() {
  xPosition = 500;
  yPosition = 200;
  xSpeed = 0;
  ySpeed = 0;
  score = 0;

  //create platforms
  platform[0] = new Platform();
  platform[0].x = 400;
  platform[0].y = 200;

  for (let i = 1; i < platformNumber; i++) {
    platform[i] = new Platform();
    platform[i].x = random(0, 800);
    platform[i].y = random(0, 100);
  }

  for (let i = 0; i < platformNumber; i++) {platform[i].tiltAngle = 0;}
  loop();
  startGame();
}

// creates audio files and controls when they run
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
    if (gameOver.sound.currentTime>=5) {
      gameOver.sound.pause();
      gameOver.sound.currentTime=6;
    }
  }
  this.stop = function(){
    this.sound.pause();
  }
  this.reset = function(){
    this.sound.currentTime = 0;
}
}
