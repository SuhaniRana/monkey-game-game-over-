var monkey, monkeyImage;
var ground, invisibleground;
var banana, stone, bananaGroup, stoneGroup;
var END, PLAY, gameState;
var survivaltime;


function preload(){
monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
bananaImage = loadImage ("banana.png");

stoneImage = loadImage("stone.png");
  
backImage = loadImage("jungle.jpg");
  
}




function setup() {
  createCanvas(800, 400);
  
  //BACKGROUND
  scene = createSprite(600,60,400,400);
  scene.addAnimation("jungle", backImage);
  scene.velocityX=-2;
  scene.x=scene.width/2;
  scene.scale = 1.6;
  
  
  //MONKEY CREATION
  monkey = createSprite(100,200,20,50);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.12;
  
  
  //INVISIBLE GROUND CREATION
  ground = createSprite(200,390,520,20);
  ground.x = ground.width/2;
  ground.visible = false;
    
  
//GAMESTATES
 END = 0;
 PLAY = 1;
 gameState = PLAY;


//SURVIVAL TIME
 score = 0;


//CREATE GROUPS
bananaGroups = createGroup();
StoneGroups = createGroup();

  
  
}

function draw() {
  background(220);
  
  if(scene.x<0){
    scene.x = scene.width/2
  }
  
  //camera position
  camera.position.x = displayWidth/4;
          camera.position.y = monkey.y-20;

 //GROUND RESET
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  
  
  drawSprites();
  
  
   //DISPLAY SURVIVAL TIME
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score,200,50);
  
  
  
  
  //MONEKY COLLIDES WITH GROUND
monkey.collide(ground);
  
    
    //SPAWN OBJECTS
    spawnbananas();
    spawnstones();
  
  
      //MONKEY JUMPS
      if(keyDown("space")&& monkey.y>=333){
        monkey.velocityY=-18;
      }
  
  
  //GRAVITY
  monkey.velocityY = monkey.velocityY+0.8;
    
    
  //GROUND MOVES
  ground.velocityX=-5;
     

    
      //BANANAS TOUCH MONKEY
       if(bananaGroups.isTouching(monkey)){
         
         
         //SCORE INCREASE
         score = score+2;
         
         //MONKEY GROWS FROM BANANAS
         switch(score){
           case 10: monkey.scale = 0.14;
             break;
         case 20: monkey.scale = 0.16;
             break;
         case 30: monkey.scale = 0.18;
             break;
             case 40: monkey.scale = 0.20;
             break;
             default: break;
         }
         
        
         //DESTROY BANANAS
       bananaGroups.destroyEach();
     }
    
  
       
    
      //STONE TOUCH MONKEY
      if(StoneGroups.isTouching(monkey)){
        
        //MONKEY SHRINK
         monkey.scale = monkey.scale-0.001;
         
   if(monkey = 0.10){

    monkey.velocityX = 0;
    StoneGroups.velocityX = 0;
    fill("black");
    textSize(30);
    text("Game over!",200,200);
    gameState = 0;
   

    
   }
   

  
}



//SPAWN BANANAS
function spawnbananas(){
  
  if(World.frameCount%80===0){
    
    
   banana = createSprite(390,20,20,20);
  banana.addAnimation("banana", bananaImage);
  banana.scale=0.06;
  banana.y=random(120,200);
  banana.velocityX=-5;
  
  banana.lifetime=100;
  bananaGroups.add(banana);
  }
  
}


//SPAWN STONES
  function spawnstones(){
   
      
    if(World.frameCount%300===0){
       stone = createSprite(800,350,20,20);
     stone.addAnimation("stone", stoneImage);
      stone.scale= 0.17;
      stone.velocityX=-9;
  
      stone.lifetime=100;
      StoneGroups.add(stone);
    }
  
  }
}