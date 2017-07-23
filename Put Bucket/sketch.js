var bucket;
var bucketSize;

function setup(){
  createCanvas(500,500);
  bucket = createVector(0,0,0);
  bucketSize = 40;

}


function draw(){
  background(51);

  bucket.z += .01;
  bucket.x = Math.abs((sin(bucket.z))) * width/1.1;
  bucket.y = Math.abs(noise(bucket.z)) * height/2;

  rect(bucket.x, bucket.y, bucketSize,bucketSize);

}
