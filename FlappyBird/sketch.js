var bird;
var gravity;
var birdRadius = 20;
var vel;
var jump;
var pipes = [];
var spawnRate = 1.6;
var frame= 0;
var isDead =false;
var score = 0;

function setup(){
  var canvas = createCanvas(500, 500);
  canvas.parent('sketchHolder');
  frameRate(60);
  bird = createVector(70, height/2);
  gravity = .3;
  vel = 0;
  jump = false;

  pipes.push(new Pipe());

  var config = {
    apiKey: "AIzaSyCe9BVL8x5UueAQl8NhSYywxElQ5yYEFZc",
    authDomain: "p5games-6204a.firebaseapp.com",
    databaseURL: "https://p5games-6204a.firebaseio.com",
    projectId: "p5games-6204a",
    storageBucket: "",
    messagingSenderId: "954367592379"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


}

function keyPressed(){
  if(isDead)
  return;
  if(keyCode == 32){
    jump = true;
  }
}

function draw(){
  background(51);
  frame++;



  if(frame > spawnRate * 60){
    pipes.push(new Pipe());
    frame = 0;
  }

  for(var i = 0 ; i< pipes.length; i++){
    if(pipes[i].pos.x < 0 - pipes[i].r){
      pipes.splice(i, 1);
    }
  }

  for(var i = 0 ; i< pipes.length; i++){
    pipes[i].update();
    pipes[i].show();
  }

  //jump
  if(jump){
    vel = -6;
    jump = false;
  }

  //Velocity
  if(bird.y < width - birdRadius/2){
    vel += gravity;
    bird.y += vel;
  }else{
    bird.y = width- birdRadius/2;
    isDead = true;
  }

  //Draw
  fill(color(255,255,0));
  ellipse(bird.x, bird.y, birdRadius, birdRadius);

  if(isDead){
    textSize(20);
    text("Score: " + score + " \nPress F5 To Restart", 120, 50);
  }else{
    textSize(50);
    text(score, 25, 50);
  }

}

function Pipe(){
  this.space = 75;
  this.r = 25;
  this.top = random(0, height - this.space);
  this.length = createVector(this.top, height - (this.top + this.space));
  this.pos = createVector(width, 0);
  this.speed = 3
  this.scored = false;

  this.update = function(){
    if(!isDead)
    this.pos.x -= this.speed;

    if((bird.x  > this.pos.x - this.r/2 && bird.x < this.pos.x + this.r && bird.y  > this.pos.y && bird.y  < this.length.x)
      || (bird.x  > this.pos.x - this.r/2&& bird.x < this.pos.x + this.r && bird.y > this.length.x + this.space && bird.y  < this.pos.y+height)){
      isDead = true;
    }

    if(bird.x > this.pos.x
      && bird.y > this.pos.y
      && bird.y < this.length.x + this.space){
        if(!this.scored && !isDead){
          score++;
          this.scored = true;
        }
    }

  }

  this.show = function(){
    fill(color(255,0,0));
    rect(this.pos.x, this.pos.y, this.r, this.length.x);
    rect(this.pos.x , this.pos.y + height, this.r, -this.length.y);
  }
}
