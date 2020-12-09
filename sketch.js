var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  //monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  //creating survival time
  var survivalTime = 0;
  
  //creating food & obstacle group
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //score
  score = 0;
}


function draw() {
  //background/backdrop
  background("white");
  
  //repeating ground
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  //monkey's jump
  //upwards movement of jump
  if(keyDown("space") ) {
    monkey.velocityY = -12;
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //monkey colliding ground
  monkey.collide(ground);
  
  //spawning the food and obstacles
  spawnFood();
  spawnObstacles();
  
  //drawing sprites on canvas
  drawSprites();
  
  //score text
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500, 50);
  
  //survival time text
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime  = Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime, 100, 50);
  
  //end state or when monkey touched rock
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
}

//creating the spawning food function
function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(400, 250, 20, 20);
    banana.y = random(120, 200);
    banana.velocityX = -5;
    
    banana.lifeTime = 300;
    monkey.depth = banana.depth + 1;

    banana.addImage(bananaImage);
    banana.scale=0.05;

    foodGroup.add(banana);
  }
}


//creating the obstacle course function
function spawnObstacles(){
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,324,20,20);
    obstacle.velocityX = -6;

    obstacle.addImage(obstaceImage);
    obstacle.scale=0.13;

    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);
  }
}

