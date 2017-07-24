var ship;
var bullets = [];
var asteroids = [];
var fps = 0;

function setup(){
  createCanvas(1000,1000);
  ship = new Ship();
  frameRate(60);

  for(var i = 0; i < 3; i++){
  asteroids.push(new Asteroid());
  }

}

function draw(){
  background(51);
  fps++;
  checkBullets();
  for(var i = bullets.length-1; i > -1; i--){
    bullets[i].update();
    bullets[i].show();
  }

  for(var i = asteroids.length-1; i > -1; i--){
    asteroids[i].update();
    asteroids[i].show();
  }

  ship.update();
  ship.show();
  handleKeys();



}

function checkBullets(){
  console.log(bullets.length);
  for(var i = bullets.length-1; i >= 0; i--){
  if(bullets[i].pos.x > width + 100){
    bullets.splice(i, 1);
  }else if(bullets[i].pos.x < 0 - 100){
    bullets.splice(i, 1);
  }else if(bullets[i].pos.y > height + 100){
    bullets.splice(i, 1);
  }else if(bullets[i].pos.y < 0 -100){
    bullets.splice(i, 1);
    }
  }
}

function handleKeys(){
  var turnSpeed = 5;
// console.log(keyCode);
  if(keyIsDown(UP_ARROW)){
    //ship.angle = atan2(mouseY - ship.pos.y, mouseX - ship.pos.x);
    ship.acc = p5.Vector.fromAngle(radians(ship.angle));
    ship.vel.add(ship.acc);
  }
  if(keyIsDown(LEFT_ARROW)){
    ship.angle -= turnSpeed;
    if(ship.angle < 0){
      ship.angle = 360;
    }
  }

  if(keyIsDown(RIGHT_ARROW)){
    ship.angle += turnSpeed;
    if(ship.angle > 360){
      ship.angle = 0;
    }
  }
  if(keyIsDown(32)){
    console.log("hit");
      if(fps > 5){
      bullets.push(new Bullet());
      fps = 0;
    }
  }
}

function Ship(){
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0,0);
  this.acc = 0;
  this.scl = 25;
  this.angle = 0;
  this.update = function(){
    this.vel.mult(.99);
    this.pos.add(this.vel);

    if(this.pos.x > width + this.scl){
      this.pos.x = 0;
    }else if(this.pos.x < 0 - this.scl){
      this.pos.x = width + this.scl;
    }
    if(this.pos.y > height + this.scl){
      this.pos.y = 0;
    }else if(this.pos.y < 0 - this.scl){
      this.pos.y = height + this.scl;
    }

  }

  this.show = function(){
    push();
    noStroke();
    fill(255);
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(radians(ship.angle) + PI/2);
    triangle(-this.scl, this.scl, 0 , -this.scl, this.scl, this.scl);
    fill(color(255,0,0));
    triangle(-this.scl/2, this.scl/2, 0 , -this.scl/2, this.scl/2, this.scl/2)
    pop();
    strokeWeight(10);
    fill(color(255,0,0));
  }

}

function Bullet(){
  this.r = 10;
  this.pos = createVector(ship.pos.x, ship.pos.y);
  this.angle = ship.angle;
  this.vel = createVector(0,0);
  this.acc = p5.Vector.fromAngle(radians(this.angle));


  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }

  this.show = function(){
    fill(color(255,0,0));
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
  }

  function Asteroid(){
    this.r = 50;
    this.rA = [];
    this.vertex = random(3,15);
    for(var i = 0 ; i < this.vertex; i++){
      this.rA[i] = random(this.r / 2, this.r);
    }

    this.speed = random(5,10);
    this.pos = createVector(random(0,width),random(0,height));
    this.vel = createVector(random(-1,1) * this.speed,random(-1,1) * this.speed );
    console.log(this.scl);

    this.update = function(){
      this.pos.add(this.vel);


      if(this.pos.x > width + this.r){
        this.pos.x = 0;
      }else if(this.pos.x < 0 - this.r){
        this.pos.x = width + this.r;
      }
      if(this.pos.y > height + this.r){
        this.pos.y = 0;
      }else if(this.pos.y < 0 - this.r){
        this.pos.y = height + this.r;
      }

    }

    this.show = function(){
      noFill();
      stroke(255);
      strokeWeight(3);
      beginShape();
      for(var i = 0; i < this.vertex; i++){
        var angle = map(i, 0, this.vertex, 0 , TWO_PI);
        var x = cos(angle) * this.rA[i];
        var y = sin(angle) * this.rA[i];
        vertex(x + this.pos.x,y + this.pos.y );
      }
      endShape(CLOSE);

    }

}
