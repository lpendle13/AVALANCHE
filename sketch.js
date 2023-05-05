
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
var platformNumber = 12; //can adjust later
var platformGap = 100; //can adjust later

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


/*  function preload() {
  //load all graphics here
  backgroundImg = loadImage('graphics/BackgroundGame.png');
  platformImg = loadImage('graphics/Platforms.png');
  snowballImg = loadImage('graphics/Ball.png');
} */


class Platform { 
  constructor() {
    this.height = 15;
    this.tiltAngle = 0;
    }
}

function setup() {

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

let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    leftPressed = true;
  } else if (event.code === 'ArrowRight') {
    rightPressed = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.code === 'ArrowLeft') {
    leftPressed = false;
  } else if (event.code === 'ArrowRight') {
    rightPressed = false;
  }
});

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
setInterval(gameLoop, 16); // run gameLoop every 16ms;
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
  //noStroke();
  //ellipse(xPosition, yPosition, diameter, diameter);
  var context = canvas.getContext("2d");
  context.drawImage(snowballImg,xPosition-25, yPosition-25, diameter, diameter);

  //image(snowballImg,xPosition-25,yPosition-25,diameter,diameter);

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

function drawPlatform() {

for (let i = 0; i < platformNumber; i++) {
  if (gameStarted===false) {
    platform[i].y = 400;
    stroke(0);
  } else if (gameStarted===true) {
  push();
  translate(platform[i].x + 100, platform[i].y + platform[i].height/2);
  rotate(platform[i].tiltAngle);
  //rect(-100, -platform[i].height/2, 200, platform[i].height);
 // image(platformImg, -100, -platform[i].height/2, 200, platform[i].height);
  pop();
  platform[i].y = 650 + i * platformGap - (frameCount % (650 + i * platformGap));
  }
}}

// Check for collisions with each platform and bounce the ball
function collisionCheck() {
  let inContact = false; // boolean variable to track if the ball is in contact with any platform
  for (let i = 0; i < platformNumber; i++) {
    if (collideRectCircle(platform[i].x, platform[i].y, 200, platform[i].height, xPosition, yPosition, diameter)) {
      inContact = true; // set the boolean variable to true if the ball is in contact with a platform
      ySpeed = -ySpeed * 0.8; // flip the speed and reduce it a bit
      yPosition = platform[i].y - diameter/2; // prevent the ball from sticking to the platform
    }}
    if (inContact) {
      xSpeed += horizontalAcceleration * sin(platform[0].tiltAngle);
    }
  } 

function boundaryCheck() {
    if (xPosition + diameter/2 > width || xPosition - diameter/2 < 0 || yPosition + diameter/2 > height || yPosition - diameter/2 < 0) {
      document.getElementsByClassName('finalScore')[0].innerHTML = 'Congratulations! Score: ' + score.toString();
      endGame();
    }
  }

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
