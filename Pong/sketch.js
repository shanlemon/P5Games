var puck;
var leftPaddle;
var rightPaddle;

var leftScore = 0;
var rightScore = 0;

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.parent('sketchHolder');
  puck = new Puck();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(51);

  puck.checkPaddleLeft(leftPaddle);
  puck.checkPaddleRight(rightPaddle);
// console.log(rightPaddle.x);

if(puck.getY > leftPaddle.y){
  leftPaddle.move(10);
}else if(puck.getY < leftPaddle.y){
  leftPaddle.move(-10);
}

  leftPaddle.update();
  rightPaddle.update();
  leftPaddle.show();
  rightPaddle.show();

  puck.update();
  puck.show();

  fill(255);
  textSize(40);
  text(leftScore, 20, 40);
  text(rightScore, width - 45, 40);

}

function keyPressed(){
  if(keyCode === 87){
    leftPaddle.move(-10);
  } else if( keyCode === 83){
    leftPaddle.move(10);
  }

    if(keyCode === UP_ARROW){
      rightPaddle.move(-10);
    } else if( keyCode === DOWN_ARROW){
      rightPaddle.move(10);
    }

    if(keyCode === 82){
      puck.reset();
      leftScore = 0;
      rightScore = 0;
    }
}

function keyReleased(){
  leftPaddle.move(0);
  rightPaddle.move(0);
}
