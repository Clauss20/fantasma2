var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostGif;
var invisibleBlock, invisibleBlockGroup;
var gameState="PLAY"
function preload(){
    towerImg = loadImage("tower.png");
    doorImg=loadImage("door.png");
    climberImg=loadImage("climber.png");
    ghostGif=loadAnimation("ghost-standing.png","ghost-jumping.png");

}

function setup(){
    createCanvas(600,600);

    doorGroup = new Group();
    climberGroup = new Group();
    invisibleBlockGroup = new Group();

    tower = createSprite(300,300,10,10);
    tower.addImage(towerImg);
    tower.velocityY=1;

    ghost=createSprite(200,200,30,30);
    ghost.addAnimation("gosth",ghostGif);
    ghost.scale = 0.5;
    

    

}

function draw(){
    background('purple');
    if(gameState==="PLAY"){

    if(tower.y>300){
        tower.y=200;
    }

    if(keyDown("s")){
        ghost.velocityX = 2;

    }
    if(keyDown("a")){
        ghost.velocityX = -2;

    }
    if(keyDown("space")){
        ghost.velocityY = -5;

    }

    ghost.velocityY=ghost.velocityY +0.8;

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y >600){
        ghost.velocityY=0;
        ghost.destroy();
        gameState = "END"
       
    }

    spawnDoors();
    drawSprites();

    }

    if(gameState==="END"){
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over", 230,250);

    }
}
function spawnDoors(){
    if(frameCount % 200 === 0){
        door=createSprite(Math.round(random(120,400)),-50,30,30);
        door.addImage(doorImg);
        door.velocityY=2;

        climber=createSprite(door.x,10,30,30);
        climber.addImage(climberImg);
        climber.velocityY=2;

        invisibleBlock=createSprite(door.x,15,climber.width,15);
        invisibleBlock.velocityY=2;
        invisibleBlock.visible=false;

        door.lifetime = 800;
        climber.lifetime=800;
        invisibleBlock.lifetime=800;
        
        doorGroup.add(door);
        climberGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);
    }
    
}