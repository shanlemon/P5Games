var scl = 25;
var snake;
var food;
var score  =0;

function setup(){
  createCanvas(500,500);
  snake = new Snake();
  pickLocation();
  frameRate(15);


}

function draw(){
  background(0);

  snake.update();
  snake.show();

  textSize(50);
  text(score, 10, 480);

}

function Snake(){
  this.x = 0;
  this.y = 0;
  this.xV = 1;
  this.yV = 0;
  this.tail = [];
  this.size = 1;


  this.update = function(){
    if(this.x < 0){
      this.x = this.scl;
    }
    if(this.x > this.scl){
      this.x = 0;
    }
    if(this.y < 0){
      this.y = height/this.scl;
    }
    if(this.y> this.scl){
      this.y = 0;
    }

    this.x+= this.xV;
    this.y+= this.yV;
    //this.x = constrain(this.x, 0, (width/scl)-1);
    //this.y = constrain(this.y, 0, (height/scl)-1);
    if(this.x == food.x && this.y == food.y){
      pickLocation();
      this.size++;
    }
    for(var i = 0; i < this.tail.length; i++){
      if(this.x == this.tail[i].x && this.y ==  this.tail[i].y ){
        this.size = 1;
        score = 0;
      }
    }

    this.tail.push(createVector(this.x, this.y));
    while(this.tail.length > this.size){
      this.tail.shift();
    }

  }


  this.show = function(){
    fill('white');
    rect(this.x *scl, this.y * scl, scl, scl);

    fill(color(255,0,0));
    rect(food.x * scl, food.y * scl, scl, scl);

    fill(255);
    for(var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x * scl,this.tail[i].y * scl, scl, scl);
    }
  }

}

function pickLocation(){
  score++;
  food = createVector(floor(random(width/scl)), floor(random(height/scl)));
}

function keyPressed(){
  switch (keyCode) {
    case UP_ARROW:
    if(snake.yV != 1){
      snake.xV=0;
      snake.yV=-1;
    }
      break;
    case DOWN_ARROW:
        if(snake.yV != -1){
      snake.xV=0;
      snake.yV=1;
    }
      break;
    case LEFT_ARROW:
        if(snake.xV != 1){
      snake.xV=-1;
      snake.yV=0;
    }
      break;
    case RIGHT_ARROW:
        if(snake.xV != -1){
      snake.xV=1;
      snake.yV=0;
    }
      break;
    case 65:
      snake.size++;

      break;

  }
}
