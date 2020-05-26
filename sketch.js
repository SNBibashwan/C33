const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

gameState = "onSling";

var score = 0,bonus = 0;

function preload(){
  bgImg = loadImage('images/playground.jpg');
}

function setup(){
  var canvas = createCanvas(window.innerWidth,window.innerHeight);
  engine = Engine.create();
  world = engine.world;


  main_ground = new Ground(width/2,height-20,width,60);
  base1 = new Ground(1000,500,300,20);
  base2 = new Ground(700,50,50,20);

  enemy1 = new Enemy1(950,460);
  enemy2 = new Enemy2(1050,460);
  enemy3 = new Enemy3(1000,410);
  enemy5 = new Enemy_base(660,100,60,60);


  log1 = new Log(900,460,15,80);
  log2 = new Log(1100,460,15,80);
  log3 = new Log(1000,460,15,80);
  log4 = new Log(945,420,110,15);
  log5 = new Log(1055,420,110,15);
  log6 = new Log(950,380,15,80);
  log7 = new Log(1050,380,15,80);
  log8 = new Log(1000,320,120,15);
  

  sling1 = new Sling(enemy5.body,{x:700, y:50});

  player = new Player(300,400);
  slingshot = new SlingShot(player.body,{x:300, y:400});


} 



function draw() {
  background(bgImg);  

  noStroke();
  textSize(20);
  text("PRESS THE SPACE BAR TO GET ONE MORE SHOT!", 10, 50);
  text("CUT THE ROPE OF THE HANGING ENEMY FOR A BONUS POINT!", 10, 80);

  textSize(35);
  fill("black");
  text("Score - " + score, width-300, 50);

  fill("Yellow");
  text("Bonus - " + bonus, width-550, 50);


  Engine.update(engine);

  base1.display();
  base2.display();

  base1.color = "grey";
  base2.color = "grey";

  base1.stroke = "#575757";
  base2.stroke = "#575757";

  main_ground.display();


  enemy1.display();
  enemy2.display();
  enemy3.display();

  //enemy5.display();
  slingCut();
  yScore();

  enemy1.score();
  enemy2.score();
  enemy3.score();
  

  log1.display();
  log2.display();
  log3.display();
  log4.display();
  log5.display();
  log6.display();
  log7.display();
  log8.display();

  slingshot.display();

  sling1.display();
 
  player.display();

}

function mouseDragged(){
  if (gameState!=="launched"){
      Matter.Body.setPosition(player.body, {x: mouseX , y: mouseY});
  }
}


function mouseReleased(){
  slingshot.fly();
  gameState = "launched";
}



function keyPressed(){
  if(keyCode === 32){

    World.remove(world,player.body);
    player = new Player(300,400);
    slingshot.attach(player.body);
    gameState = "onSling";
  }
   
}


function slingCut(){

  if(player.body.position.y < enemy5.body.position.y - enemy5.height/2 &&
    player.body.position.y >= 50 &&
    player.body.position.x >= enemy5.body.position.x)
    {
      sling1.tear();
      //sling1.yScore();
  }
}

function yScore(){
  {
    if(sling1.sling.bodyA === null){
    /*
    setTimeout(function(){
        for(var s = 0; s<=1; s++){
          score += s;
        }
    }, 1000);
    */
    bonus = 500;
    //setTimeout(function(){
    push();
    enemy5.Visiblity -= 3;
    tint(255,enemy5.Visiblity);
    image(enemy5.image, enemy5.body.position.x, enemy5.body.position.y, 60, 60);
    World.remove(world, enemy5.body);
    pop();

    //}, 3000);
  }
  else{
    enemy5.display();
  }

  }
}