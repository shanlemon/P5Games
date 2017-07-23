var shooter;
var follower;
function setup(){
  createCanvas(1000,1000);
  shooter = new Shooter();
  follower = new Follower();
  angleMode(DEGREES);

}

function draw(){
  background(51);
  shooter.update();
  shooter.show();
  follower.update();
  follower.show();
}


function Shooter(){
  this.r = 400;
  this.x = width /2;
  this.y = height /2;
  this.angle = 0;
  this.pointingLoc = createVector(cos(this.angle)*this.r, sin(this.angle) * this.r);
  //console.log(this.pointingLoc.x + "  " + this.pointingLoc.y);

  this.update = function(){
    this.angle = atan2(mouseY-height/2, mouseX-width/2);
    this.pointingLoc = createVector(cos(this.angle)*this.r/2, sin(this.angle) * this.r/2);
    textSize(40);
    strokeWeight(1);
    text(this.angle, width/2 - 25, 50);

  }

  this.show = function(){
    noFill();
    stroke(255);
    strokeWeight(10);
    ellipse(this.x, this.y, this.r, this.r);

    line(this.x, this.y, this.pointingLoc.x + this.x, this.pointingLoc.y + this.y);
  }

}

function Follower(){
  this.target = createVector(mouseX, mouseY);
  this.pos;
  this.r = 100;
  this.anglee = 0;

  this.update = function(){
    this.anglee = this.anglee +5;
    if(this.anglee > 175){
      this.anglee = this.anglee * -1;
    }
    this.target = createVector(mouseX, mouseY);
    this.pos = createVector(cos(this.anglee) * this.r, sin(this.anglee) * this.r);

  }

  this.show = function(){
    //fill(255);
    strokeWeight(2);
    ellipse(this.pos.x + mouseX, this.pos.y + mouseY, 10, 10);
    line(mouseX, mouseY, this.pos.x + mouseX, this.pos.y + mouseY);
  }

}
