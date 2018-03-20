//load our images
var pika, bgscreen, pokeball;

//pika array list for pikas falling
var pikas = [];

//calculate the pikachu caught in total
var points = 0;

function preload(){
  pika = loadImage("pika1.png");
  bgscreen = loadImage("bg.jpg");
  pokeball = loadImage("pokeball.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  //load pikas for the game
   for (i = 0; i<10; i++){
     pikas.push(new Pika());
   }

}

function draw(){
  imageMode(CENTER);
  //draw background image
  image(bgscreen,width/2,height/2);

  //draw pokeball image
  noCursor();
  image(pokeball, mouseX, mouseY, 75, 75);

  //display our pikas and add points only when it intersects with mouse(pokeball)
  for (i = 0; i<pikas.length; i++){
    pikas[i].display();

    var result = pikas[i].move(mouseX, mouseY);

    //catches pika, pika disappears and goes back to the loop
    if (result == "catchu") {
      pikas[i].y = random(-height,0);
      pikas[i].x = random(width);
      points++;
    }


    fill(0);
    textSize(25);
    text("You catched " + points + " Pika(s)!" , 25, 50);

}

}

//pika object
function Pika(){

    //keep tracking positions of pikachu
    this.x = random(width);
    this.y = random(-height,0);

    //let pika move in different speed
    this.speed = random(2,6);

    //let each pika rotate from a random number
    this.rotation = random(0,360);

    //let pika display in different sizes
    this.size = random(50,150);

    //let pika rotate in different angles while falling down
    this.display = function(a,b){
      push();
      translate(this.x, this.y);
      rotate(radians(this.rotation));
      image(pika,0,0, this.size, this.size);
      pop();
      this.rotation += random(1,4);
    }

    this.move = function(a,b){
      this.y += this.speed;
      if (dist(this.x, this.y, a, b) < 50) {
        return "catchu";
      }
      //let pikachu restart their random positions after falling out of screen
      if (this.y > height) {
        this.y = random(-height,0);
        this.x = random(width);
      }

    }
}
