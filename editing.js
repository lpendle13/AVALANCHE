
let xPosition = innerWidth/2;
let yPosition = 5;
let diameter = 50;

//// Keep track of the speed of the ball
let ySpeed = 0;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.1;

let platform = [];
var platformNumber = 6; //can adjust later
var platformGap = 100; //can adjust later

function preload() {
  //load all graphics here
}

class Platform { 
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 15;
    this.angle = 0;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight); //change to final graphics size
  //create platforms
  for (let i = 0; i < platformNumber; i++) {
    platform[i] = new Platform();
    platform[i].x = random(0, 400); //change to final graphics width
    platform[i].y = platformGap;
  }
}

function draw() {
  background(235);
  drawPlatform();

  //Draw the ball
  fill("white");
  ellipse(xPosition, yPosition, diameter, diameter);

 collisionCheck();

  ySpeed = ySpeed + gravityAcceleration; //acceleration is an addition to speed over time:

  yPosition = yPosition + ySpeed; //speed is an addition to distance over time:

  //bounce the ball at the edge of the frame:
  if (yPosition + diameter/2 > height) {
    ySpeed = -ySpeed; //Flip the speed so ball now goes upwards

    //This next line prevents the ball from 'sticking'
    //to the bottom in an endless cycle of flipping signs.
    //It ensures the ball is above the bottom one the sign is flipped.
    yPosition = height - diameter/2
  }

  ySpeed = ySpeed * 0.997;  //Air friction is the reduction of speed by a small percentage over time
}

//randomly generate platforms
function drawPlatform() {
  fill(100); //change to platform graphic
  for (let i = 0; i < platformNumber; i++) {
  if (keyCode === LEFT_ARROW) {
    push();   
    rect(platform[i].x, platform[i].y, 200, platform[i].height);
    platform[i].y = 500 + i * platformGap - (frameCount % (450 + i * platformGap)); //adjust number for graphics height
    translate(width/2, height/2);
    rotate(-30);
    pop();
} else if (keyCode === RIGHT_ARROW) {
    push();   
    rect(platform[i].x, platform[i].y, 200, platform[i].height);
    platform[i].y = 500 + i * platformGap - (frameCount % (450 + i * platformGap)); //adjust number for graphics height
    translate(width/2, height/2);
    rotate(30);
    pop();
} else {
    rect(platform[i].x, platform[i].y, 200, platform[i].height);
    platform[i].y = 500 + i * platformGap - (frameCount % (450 + i * platformGap)); //adjust number for graphics height
}
  }
}

// Check for collisions with each platform and bounce the ball
function collisionCheck() {
  for (let i = 0; i < platformNumber; i++) {
    if (collideRectCircle(platform[i].x, platform[i].y, 200, platform[i].height, xPosition, yPosition, diameter)) {
      ySpeed = -ySpeed * 0.8; // flip the speed and reduce it a bit
      yPosition = platform[i].y - diameter/2; // prevent the ball from sticking to the platform
    }
  }
} 

