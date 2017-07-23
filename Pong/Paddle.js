function Paddle(left){
  this.x;
  this.w = 20;
  this.h = 100;
  this.speed = 0;
  this.y = height / 2;



  if(left){
    this.x = this.w/2 + 10;
  }else{
    this.x = width - this.w/2 - 10;
  }

  this.update = function(){
    this.y += this.speed;
    this.y = constrain(this.y, this.h/2, height - this.h/2)
  }

  this.move = function(steps){
    this.speed = steps;

  }

  this.show = function(){
    fill('white');
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h)
  }

}
