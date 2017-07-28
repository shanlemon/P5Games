var scl = 75;
var blocks = [];
var speed = 8;
var lvl = 6;
var index = blocks.length - 1;
var gameOver = false;
var score = 0;


function setup() {
  var canvas = createCanvas(525, 525);
  canvas.parent('sketchHolder');
  frameRate(speed);
  blocks.push(new Blocks(lvl));
}
function draw() {
  frameRate(speed);
  background(51);
  console.log(lvl);

  if (gameOver) {
    textSize(25);
    text("You Lost, Your Score was " + score +  "\nPress F5 To Restart", 25, height/2);
  } else {
    textSize(50);
    text(score, 20, 75);
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].update();
      blocks[i].show();
    }
  }


}

function keyPressed() {
  if (keyCode == 32) {
    speed *= 1.05;
    index = blocks.length - 1;
    if (blocks[index].pos.y < scl * 3) {
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].pos.y += scl;
      }
      lvl++;
    }
    if (lvl != 6) {
      if (blocks[index - 1].pos.x == blocks[index].pos.x && blocks[index - 1].right == true ||
        blocks[index].pos.x == blocks[index - 1].pos.x - scl && blocks[index - 1].middle == true ||
        blocks[index].pos.x == blocks[index - 1].pos.x - (scl * 2) && blocks[index - 1].left == true) {
        blocks[index].right = true;
      } else {
        blocks[index].right = false;
      }
      if (blocks[index - 1].pos.x == blocks[index].pos.x - scl && blocks[index - 1].right == true ||
        blocks[index].pos.x - scl == blocks[index - 1].pos.x - scl && blocks[index - 1].middle == true ||
        blocks[index].pos.x - scl == blocks[index - 1].pos.x - (scl * 2) && blocks[index - 1].left == true) {
        blocks[index].middle = true;
      } else {
        blocks[index].middle = false;
      }
      if (blocks[index - 1].pos.x == blocks[index].pos.x - (scl * 2) && blocks[index - 1].right == true ||
        blocks[index].pos.x - (scl * 2) == blocks[index - 1].pos.x - scl && blocks[index - 1].middle == true ||
        blocks[index].pos.x - (scl * 2) == blocks[index - 1].pos.x - (scl * 2) && blocks[index - 1].left == true) {
        blocks[index].left = true;
      } else {
        blocks[index].left = false;
      }
    }
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].activated = false;
    }
    lvl--;
    blocks.push(new Blocks(lvl));
  }
}


function Blocks(lvl) {
  this.pos = createVector(300, lvl * scl);
  this.goingLeft = false;
  this.activated = true;
  if (blocks.length < 1) {
    this.left = true;
    this.middle = true;
    this.right = true;
  } else {
    this.left = blocks[blocks.length - 1].left;
    this.middle = blocks[blocks.length - 1].middle;
    this.right = blocks[blocks.length - 1].right;
  }

  if (this.left == false &&this.middle == false && this.right == false ) {
    gameOver = true;
  }else{
    if(lvl != 6)
    score++;
  }
  this.color = color(random(0, 255), random(0, 255), random(0, 255));


  this.update = function() {

    if (this.activated) {
      if (this.pos.x > 675) {
        this.goingLeft = true;
      } else if (this.pos.x < 0) {
        this.goingLeft = false;
      }
      if (this.goingLeft) {
        this.pos.x -= scl;
      } else {
        this.pos.x += scl;
      }
    }
  }


  this.show = function() {
    fill(this.color);
    if (this.right) {
      rect(this.pos.x, this.pos.y, scl, scl);
    }
    if (this.middle) {
      rect(this.pos.x - scl, this.pos.y, scl, scl);
    }
    if (this.left) {
      rect(this.pos.x - (scl * 2), this.pos.y, scl, scl);
    }


  }
}
