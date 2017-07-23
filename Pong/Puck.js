
  function Puck(){
    var x = width / 2;
    var y = height / 2;
    var angle = random(TWO_PI);
    var xspeed = 5 * cos(angle);
    var yspeed = 5 * sin(angle);
    var r = 12;


    this.update = function(){
      edges();
      x += xspeed;
      y += yspeed;
    }

    this.getY = function(){return y;}

    this.checkPaddleLeft = function(paddle){
      if(y < paddle.y + paddle.h/2 && y > paddle.y - paddle.h/2 && x - r < paddle.x + paddle.w/2){
        if(x > paddle.x){
            var diff = y - (paddle.y - paddle.h/2);
            var rad = radians(45);
            var angle = map(diff, 0, paddle.h, -rad, rad);
            xspeed = 5 * cos(angle);
            yspeed = 5 * sin(angle);
            x = paddle.x + paddle.w /2 + r;
            //xspeed *= -1;
          }
        }
    }

    this.checkPaddleRight = function(paddle){
      if(y < paddle.y + paddle.h/2 && y > paddle.y - paddle.h/2 && x + r > paddle.x - paddle.w/2){
        if(x < paddle.x){
          var diff = y - (paddle.y - paddle.h/2);
          var rad = radians(135);
          var angle = map(diff, 0, paddle.h, -rad, rad);
          xspeed = 5 * cos(angle);
          yspeed = 5 * sin(angle);
          x = paddle.x - paddle.w/2 - r;
          //xspeed *= -1;
          }
        }
    }


    this.reset = function(){
      x = width / 2;
      y = height / 2;
      angle = random(-PI/4, PI/4);
      xspeed = 5 * cos(angle);
      yspeed = 5 * sin(angle);

    }

    function reset(){
      x = width / 2;
      y = height / 2;
      angle = random(TWO_PI);
      xspeed = 5 * cos(angle);
      yspeed = 5 * sin(angle);

    }

    function edges(){
      if(y < 0 || y > height){
        yspeed *= -1;
      }
      if(x - r > width){
        leftScore++;
        reset();
      }

      if(x + r < 0){
        rightScore++;
        reset();
      }
    }

    this.show = function() {
      noStroke();
      fill('white');
      ellipse(x,y,r*2,r*2);

    }
  }
