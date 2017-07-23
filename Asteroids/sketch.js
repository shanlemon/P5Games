var player;
var bullets = [];
var enemies = [];
var level = 1;

function setup(){
  createCanvas(600,600);
  player = new Player();

  spawnEnemies();

}

function draw(){
  background(51);

  player.update();
  player.show();

  textSize(25);
  text(level-1, 100, 50);

  if(enemies.length == 0){
    spawnEnemies();
  }


  for(var i = bullets.length -1; i > -1; i--){

    bullets[i].update();
    bullets[i].show();

    if(bullets[i].pos.x < 50 || bullets[i].pos.x > width-50 || bullets[i].pos.y < 50 || bullets[i].pos.y > height - 50){
      console.log("died");
      bullets.splice(bullets.indexOf(bullets[i]), 1);
    }

  }

  //for(var i =0; i < enemies.length; i++){
  for (var i = enemies.length - 1; i > -1; i--) {
    enemies[i].update();
    enemies[i].show();

    for(var k = 0; k < bullets.length; k++){
      if(enemies.length > 0){
        if(dist(
          enemies[i].pos.x,
          enemies[i].pos.y,
          bullets[k].pos.x,
          bullets[k].pos.y) < 50){
          enemies.splice(i, 1);
        }
    }
    }

    if(dist(enemies[i].pos.x,
       enemies[i].pos.y,
       player.pos.x,
       player.pos.y) < 50){
      level = 1;
      enemies = [];
      spawnEnemies;
    }
  }
}



function spawnEnemies(){
  var amount = level * 5;
  level++;
   for(var i = 0; i < amount; i++){
     enemies.push(new Enemy(player));
   }
}


function findEnemyPos(){
  var randomNum = floor(random(4));
  switch(randomNum){
    case 0: //(top: (random, 0))
      return createVector(random(width), 0);
      break;

    case 1: //(right: (width, random))
      return createVector(width, random(height));
      break;

    case 2:
      return createVector(random(width), height);
      break;

    case 3:
      return createVector(0, random(height));
      break;
    default:
      return createVector(0,0);
  }
}


function Enemy(p){

  this.pos = findEnemyPos();
  this.r = 50;
  this.speed = 2;
  this.cosA = cos(atan2(this.pos.y-height/2, this.pos.x-width/2));
  this.sinA = sin(atan2(this.pos.y-height/2, this.pos.x-width/2));

  this.update = function(){
    this.pos.x -= this.cosA * this.speed;
    this.pos.y -= this.sinA * this.speed;

  }

  this.show = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }


}


function Player(){
  this.r = 100;

  this.pos = createVector(width/2, height/2);


  this.update = function(){
    this.angle = atan2(mouseY-height/2, mouseX-width/2);
    this.pointer = createVector(cos(this.angle)*this.r/2, sin(this.angle) * this.r/2);
  }

  this.show = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    line(this.pos.x, this.pos.y, this.pointer.x + this.pos.x, this.pointer.y + this.pos.y);

  }

}

function Bullet(p){
  this.index = bullets.length;
  this.pos = createVector(p.pointer.x + p.pos.x, p.pointer.y + p.pos.y);
  this.scl = 10;
  this.speed = 10;
  this.cosA = cos(p.angle);
  this.sinA = sin(p.angle);

  this.update = function(){
    this.pos.x += this.cosA * this.speed;
    this.pos.y += this.sinA * this.speed;

  }
  this.show = function(){
    fill(color(255,0,0));
    ellipse(this.pos.x, this.pos.y, this.scl, this.scl);
  }
}

function mousePressed(){
  bullets.push(new Bullet(player));
}
