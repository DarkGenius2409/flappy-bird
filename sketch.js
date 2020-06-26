function Pipe(){
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;
  
  this.gameOver = false;
  
  this.hits = function(bird){
    if(bird.y < this.top || bird.y > height -             this.bottom){
      if(bird.x > this.x && bird.x < this.x + this.w)       {
        this.gameOver = true;
        return true;
      }
    }
    
    this.gameOver = false;
    return false;
  }
  
  this.show = function(){
    fill(20, 255, 0);
    
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }
  
  this.update = function(){
    this.x -= this.speed;
  }
  
  this.offScreen = function() {
    if(this.x < -this.w){
      return true;
    }
    else{
      return false;
    }
  }
}

function Bird(){
  this.y = height/2;
  this.x = 64;
  this.gravity = 0.6;
  this.velocity = 0;
  this.lift = -15;
  
  this.show = function(rValue, gValue, bValue){
    fill(rValue, gValue, bValue);
    ellipse(this.x, this.y, 32, 32);
  }
  
  this.up = function(){
    this.velocity += this.lift;
  }
  
  this.update = function(){
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    if(this.y > height){
      this.y = height;
      this.velocity = 0;
    }
    if(this.y < 0){
      this.y = 0;
      this.velocity = 0;
    }
  }
}

var bird;
var pipes = [];
var gameOver = false;

function setup() {
  createCanvas(400, 400);
  bird = new Bird();
  pipes.push(new Pipe());
}

function keyPressed(){
  if(key === ' '){    
    bird.up();
    //console.log('space');
  }
}

function draw() {
  background(0);
  
  for(let i = pipes.length-1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    
    if(pipes[i].hits(bird)){
      if(pipes[i].gameOver){
        pipes[i].speed = 0;
        noStroke();
        background(150, 0, 255);
        fill(0, 0, 255);
        textSize(50);
        text('Game Over', 50, 200);
        fill(150, 0, 255)
        gameOver = true;
      }
    }
    
    if(pipes[i].offScreen()){
      pipes.splice(i, 1);
    }
  }
  
  if(gameOver === false){
    bird.show(255, 255, 0);
    bird.update();
  }
  else{
    bird.show(150, 0, 255);
  }
  
  if(frameCount % 100 === 0){
    pipes.push(new Pipe());
  }
  
  
}