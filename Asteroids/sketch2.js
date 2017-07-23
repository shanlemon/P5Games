var ship;
var bullets = [];
var asteroids = [];
var time = 0;
var resetTime = 1;
var fireRate = 8;


function setup() {
  createCanvas(1000,1000);
  ship = new Ship();
  asteroids.push(new Asteroid());
}


function draw(){
  if(millis() > resetTime){
    time++;
    resetTime++;
  }
  background(51);
  fill(255);
  text(time, 100, 100);
  for(var i = 0; i < bullets.length; i++){
    bullets[i].update();
    bullets[i].show();
  }
  for(var i = 0 ; i < asteroids.length; i++){
    asteroids[i].update();
    asteroids[i].show();
    rect(asteroids[i].pos.x,asteroids[i].pos.y, 25,25);
  }

  ship.update();
  ship.show();

}

function handleKeys(){
  if(keyIsDown(87)){
    ship.vel.add(p5.Vector.fromAngle(ship.angle));
    ship.vel = createVector(constrain(ship.vel.x,-ship.speed, ship.speed),constrain(ship.vel.y,-ship.speed, ship.speed))
  }
  if(mouseIsPressed){
    if(time > fireRate){
      bullets.push(new Bullet());
      time = 0;
    }
  }
}
