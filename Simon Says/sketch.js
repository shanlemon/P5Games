var buttons = [];
var order = [];
var yourOrder = [];
var lvl = 3;
var frameR = 5;
var o = 0;
var turn = true;
var atm = 0;
var lost = false;
var score = 0;

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('sketchHolder');
  frameRate(frameR);

  //INIT
  var spacing = 150;
  var x = spacing;
  var y = spacing;
  for (var i = 0; i < 2; i++) {
    buttons.push(new Button(x, y, [random(255), random(255), random(255), 255]));
    x += spacing;
  }
  x = spacing;
  y += spacing;
  for (var i = 0; i < 2; i++) {
    buttons.push(new Button(x, y, [random(255), random(255), random(255), 255]));
    x += spacing;
  }

  //CreatePattern
  createPattern();
  console.log(order);




}

function draw() {
  background(51);
  if(lost){
    textSize(30);
    text("You Lost, Press F5 To Restart", width/2 - 200, height/2);
  }else{
    textSize(45);
    text(score, width/2 - 35, height - 50 );
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].show();
  }


  if (isSame()) {
    lvl++;
    yourOrder = [];
    order.push(floor(random(0, 4)));
    o = 0;
    atm = 0;
    score++;
    console.log(order);
  }

  //show buttons
  if (turn) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].a = false;
    }
    turn = false;
  } else {
    if (o < lvl) {
      buttons[order[o]].a = true;
      o++;
    }
    turn = true;
  }
  }
}


function isSame() {
  for (var i = 0; i < order.length; i++) {
    if (order[i] != yourOrder[i]) {
      return false;
    }
  }
  return true;
}

function createPattern() {
  for (var i = 0; i < lvl; i++) {
    order[i] = floor(random(0, 4));
  }
}

function mousePressed() {
  for (var i = 0; i < buttons.length; i++) {
    if ((mouseX < buttons[i].pos.x + (buttons[i].r / 2)) &&
      (mouseX > buttons[i].pos.x - (buttons[i].r / 2)) &&
      (mouseY > buttons[i].pos.y - (buttons[i].r / 2)) &&
      (mouseY < buttons[i].pos.y + (buttons[i].r / 2))) {
      yourOrder.push(i);
    }
  }
  if (order[atm] == yourOrder[atm]) {
    atm++;
  } else {
    console.log("you lose");
    lost = true;
  }
}



function Button(x, y, c) {
  this.a = false;
  this.color = c;
  this.r = 150;
  this.pos = createVector(x, y);

  this.activate = function() {
    this.a = !this.a;
  }

  this.show = function() {
    if (this.a) {
      noStroke();
      fill(this.color);
      ellipse(x, y, this.r * 1.25, this.r * 1.25);
    } else {
      noStroke();
      fill(this.color);
      ellipse(x, y, this.r, this.r);
    }
  }

}
