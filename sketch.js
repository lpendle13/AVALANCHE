
let xPosition = 200;
let yPosition = 50;
let diameter = 50;

// Keep track of the speed of the ball (just in y for this example)
let ySpeed = 0;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.1;

// Define the platforms as rectangles
let platform1 = {
  x: 200,
  y: 300,
  width: 200,
  height: 20
};

let platform2 = {
  x: 500,
  y: 400,
  width: 150,
  height: 20
};

function setup() {
  createCanvas(innerWidth, innerHeight);

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
  fill(100);
  rect(platform1.x, platform1.y, platform1.width, platform1.height);
  rect(platform2.x, platform2.y, platform2.width, platform2.height);

  push(); // save the current canvas state
  translate(platform1.x + platform1.width/2, platform1.y + platform1.height/2); // move to the center of the platform
  rotate(platform1.angle); // rotate the canvas by the platform angle
  rect(-platform1.width/2, -platform1.height/2, platform1.width, platform1.height); // draw the platform centered at (0, 0)
  pop(); // restore the previous canvas state
}