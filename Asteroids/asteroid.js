function Asteroid(){
  this.angle = 0;
  this.maxVel = 10;
  this.r = random(15, 100);
  this.pos = createVector(random(width), random(height));
  //this.vel = createVector(random(-this.maxVel, this.maxVel), random(-this.maxVel, this.maxVel));
  this.vel = createVector(0,0);
  this.update = function(){
    this.pos.add(this.vel.mult(.99));
  }

  this.show = function(){
    fill(255);

  }


}
