
let xPosition = 225;
let yPosition = 50;
let diameter = 50;

// Keep track of the speed of the ball (just in y for this example)
let ySpeed = 0;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.1;

// Define the platforms as rectangles
class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 20;
    this.angle = 0;
  }

  move() {
    push(); // save the current canvas state
    translate(this.x + this.width/2, this.y + this.height/2); // move to the center of the platform
    rotate(this.angle); // rotate the canvas by the platform angle
    rect(-this.width/2, -this.height/2, this.width, this.height); // draw the platform centered at (0, 0)
    pop(); // restore the previous canvas state
  }

  display() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  platform1 = new Platform(200, 300);
  platform2 = new Platform(400, 500);

    // Add event listeners for arrow keys to tilt the platforms
    document.addEventListener("keydown", function(event) {
      if (event.code === "ArrowLeft") {
        platform1.angle -= 0.1;
        platform2.angle -= 0.1;
      } else if (event.code === "ArrowRight") {
        platform1.angle += 0.1;
        platform2.angle += 0.1;
      } else if (event.code === "ArrowUp") {
        platform1.y -= 5;
        platform2.y -= 5;
      } else if (event.code === "ArrowDown") {
        platform1.y += 5;
        platform2.y += 5;
      }
    });
}

function draw() {
  background(235);

  // Check for collisions with each platform and bounce the ball
  if (collideRectCircle(platform1.x, platform1.y, platform1.width, platform1.height, xPosition, yPosition, diameter)) {
    ySpeed = -ySpeed * 0.8; // flip the speed and reduce it a bit
    yPosition = platform1.y - diameter/2; // prevent the ball from sticking to the platform
  }

  if (collideRectCircle(platform2.x, platform2.y, platform2.width, platform2.height, xPosition, yPosition, diameter)) {
    ySpeed = -ySpeed * 0.8; // flip the speed and reduce it a bit
    yPosition = platform2.y - diameter/2; // prevent the ball from sticking to the platform
  }

  //acceleration is an addition to speed over time:
  ySpeed = ySpeed + gravityAcceleration;

  //speed is an addition to distance over time:
  yPosition = yPosition + ySpeed;

  //bounce the ball at the edge of the frame:
  if (yPosition + diameter/2 > height) {
    ySpeed = -ySpeed; //Flip the speed so ball now goes upwards

    //This next line prevents the ball from 'sticking'
    //to the bottom in an endless cycle of flipping signs.
    //It ensures the ball is above the bottom one the sign is flipped.
    yPosition = height - diameter/2
  }

  //Air friction is the reduction of speed by a small percentage over time
  ySpeed = ySpeed * 0.997;

  //Draw the ball
  fill("white");
  ellipse(xPosition, yPosition, diameter, diameter);

  // Draw the platforms
  platform1.display();
  platform2.display();
  platform1.move();
  platform2.move();
}
