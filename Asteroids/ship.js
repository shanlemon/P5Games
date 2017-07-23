
function Ship(){
  this.speed = 12;
  this.scl = 38;
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0,0);
  this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);

  this.update = function(){
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    this.pos.add(this.vel);
    this.vel.mult(.98);
    handleKeys();

    if(this.pos.x > width + this.scl){
      this.pos.x = 0 - this.scl;
    }else if(this.pos.x < 0 - this.scl){
      this.pos.x = width + this.scl;
    }
    if(this.pos.y > height + this.scl){
      this.pos.y = 0 - this.scl;
    }else if(this.pos.y < 0 - this.scl){
      this.pos.y = height + this.scl;
    }
  }

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle + PI/2);
    fill(color(0, 220, 100));
    strokeWeight(7);
    stroke(255);
    triangle(-this.scl, this.scl, this.scl, this.scl, 0, -this.scl);
    pop();
  }
}
