
let xPosition = 50;
let yPosition =50;
let diameter = 50;


// Keep track of the speed of the ball (just in y for this example)
let ySpeed = 0;

//Variable used to accelerate ball downwards
let gravityAcceleration = 0.1;

function setup() {
  createCanvas(innerWidth, innerHeight);
}

  function draw() {
    background(235);
    
    //acceleration is an addition to speed over time:
    ySpeed = ySpeed + gravityAcceleration;
    
    //speed is an addition to distance over time:
    yPosition = yPosition + ySpeed;
    
    //bounce the ball at the edge of the frame:
    if(yPosition + diameter/2 > height){
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
  }
  