
function Bullet(){
  this.dir = ship.angle;
  this.pos = ship.pos.copy();
  this.scl = 15;
  this.speed = 15;

  this.update = function(){
    this.pos.add(p5.Vector.fromAngle(this.dir).mult(this.speed));
  }

  this.show = function(){
    fill(color(255,0,0));
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.scl, this.scl);
  }

}
