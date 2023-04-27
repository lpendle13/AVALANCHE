
let xPosition = innerWidth/2;
let yPosition = 50;
let diameter = 50;

//// Keep track of the speed of the ball
let ySpeed = 0;
let xSpeed = 0;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.9;
let horizontalAcceleration = 0.1;

let platform = [];
var platformNumber = 12; //can adjust later
var platformGap = 100; //can adjust later

function preload() {
  //load all graphics here
}

class Platform { 
  constructor() {
    this.height = 15;
    this.tiltAngle = 0;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  //create platforms
  for (let i = 0; i < platformNumber; i++) {
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
//resize canvas if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(235);
  drawPlatform();

  //Draw the ball
  fill("white");
  ellipse(xPosition, yPosition, diameter, diameter);

 collisionCheck();

 boundaryCheck();

  // accelerate the ball downwards and sideways
  ySpeed += gravityAcceleration;
  xSpeed += horizontalAcceleration * sin(platform[0].tiltAngle);

  // update the position of the ball
  yPosition += ySpeed;
  xPosition += xSpeed;

  //bounce the ball at the edge of the frame:
  if (yPosition + diameter/2 > height) {
    ySpeed = -ySpeed;
    yPosition = height - diameter/2
  }

  //Air friction is the reduction of speed by a small percentage over time
  ySpeed *= 0.987;
  xSpeed *= 0.987;
}

function drawPlatform() {
  fill(100); //change to platform graphic
  for (let i = 0; i < platformNumber; i++) {
    push();
    translate(platform[i].x + 100, platform[i].y + platform[i].height/2);
    rotate(platform[i].tiltAngle);
    rect(-100, -platform[i].height/2, 200, platform[i].height);
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
  if (xPosition + diameter/2 > width || xPosition - diameter/2 < 0) {
    endGame();
  }
}

function restartGame() {
  xPosition = innerWidth/2;
  yPosition = 50;
  xSpeed = 0;
  ySpeed = 0;
  for (let i = 0; i < platformNumber; i++) {platform[i].tiltAngle = 0;}
  loop();
  startGame();
}
