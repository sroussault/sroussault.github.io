var particles = [];
var grav, px;
var myHue=0;
var inc=1;

document.ontouchmove=function(event){
  event.preventDefault();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  px =0;
  grav= createVector(0,0.008);
  init();
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);


}

function draw() {
  //background(0,10);
  vcolor();
  for(var i=0;i<particles.length;i++){
  particles[i].update();
  }

  noStroke();
  fill(255);
}

function Particle(){

  this.update=function(){
    stroke(this.ecolor);
    fill(this.ecolor);
    //fill(255);
  	ellipse(this.pos.x,this.pos.y,this.taille);
    ellipse(this.pos.x,this.pos.y,this.taille);

    push();
    translate(this.pos.x,this.pos.y);
    rotate(45);
    line(0,30,0,30);
    pop();


    this.pos.add(this.speed);
    this.speed.rotate(this.courbe*(noise(this.perlin, )-0.5));
    this.speed.add(grav);
    this.life--;
    this.perlin+=0.1;
    this.ecolor= color(random(200,255)-(this.lifeMx-this.life)*255/this.lifeMx,0-(this.lifeMx-this.life)*0/this.lifeMx,random(0,255)-(this.lifeMx-this.life)*255/this.lifeMx,50);

    if(this.life<=0 || this.pos.y>windowHeight){
    	this.init();
    }
  }

  this.init=function(){
  	this.pos= createVector(mouseX+noise(px,10)*30,mouseY+noise(px,30)*10);
  	this.taille= randomGaussian(0.2,1);
    this.speed= createVector(random(-2,2),random(-2,2));
  	this.ecolor= color(random(200,255), 0, random(0,255));
  	this.life= random(60,100);
    this.lifeMx= this.life;
    this.perlin= random(-20,20);
    this.courbe= random(2,30);
    px += 0.01;
  }

  this.init();
}


function init(){
  for(var i=0;i<40;i++){
  particles[i]=new Particle();
  }

}
function mousePressed() {
  background(0);
  init();
}

function vcolor(){
  myHue+=inc;
  if(myHue>=180||myHue<=0){
    inc=-inc
  }
  var myCanvas = document.getElementsByTagName("canvas");
  myCanvas[0].style.filter="hue-rotate("+myHue+"deg)";

}
