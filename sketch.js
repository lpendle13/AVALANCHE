
let xPosition = 500;
let yPosition = 50;
let diameter = 50;
let score = 0;

//// Keep track of the speed of the ball
let ySpeed = 0;
let xSpeed = 0;
let gameStarted = false;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.9;
let horizontalAcceleration = 0.1;

let platform = [];
var platformNumber = 12; //can adjust later
var platformGap = 100; //can adjust later

var backgroundImg;
var platformImg;
var snowballImg;

function preload() {
  //load all graphics here
  backgroundImg = loadImage('graphics/BackgroundGame.png');
  platformImg = loadImage('graphics/Platforms.png');
  snowballImg = loadImage('graphics/Ball.png');
}

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
  platform[0].y = 400;

  for (let i = 1; i < platformNumber; i++) {
    platform[i] = new Platform();
    platform[i].x = random(0, 800);
    platform[i].y = random(0, 100);
  }

  // add event listeners for arrow keys
  document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft') {
      // update the tiltAngle property of all platforms
      for (let i = 0; i < platformNumber; i++) {
        platform[i].tiltAngle -= 0.1;
      }
    } else if (event.code === 'ArrowRight') {
      // update the tiltAngle property of all platforms
      for (let i = 0; i < platformNumber; i++) {
        platform[i].tiltAngle += 0.1;
      }
    }
  });
}

function draw() {
  background(255);
  image(backgroundImg,0,0);
  drawPlatform();

  //Draw the ball
  noFill();
  noStroke();
  ellipse(xPosition, yPosition, diameter, diameter);
  image(snowballImg,xPosition-25,yPosition-25,diameter,diameter);

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
  push();
  translate(platform[i].x + 100, platform[i].y + platform[i].height/2);
  rotate(platform[i].tiltAngle);
  noFill();
  noStroke();
  rect(-100, -platform[i].height/2, 200, platform[i].height);
  image(platformImg, -100, -platform[i].height/2, 200, platform[i].height);
  pop();
  platform[i].y = 650 + i * platformGap - (frameCount % (650 + i * platformGap));
}
}

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
  yPosition = 286;
  xSpeed = 0;
  ySpeed = 0;
  score = 0;

  //create platforms
  platform[0] = new Platform();
  platform[0].x = 400;
  platform[0].y = 400;
  for (let i = 1; i < platformNumber; i++) {
    platform[i] = new Platform();
    platform[i].x = random(0, 800);
    platform[i].y = random(0, 100);
  }

  for (let i = 0; i < platformNumber; i++) {platform[i].tiltAngle = 0;}
  loop();
  startGame();
}
