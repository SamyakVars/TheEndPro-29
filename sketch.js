var ground, groundImg, invisibleGround;
var char, charAnimation;

var char1, char2, char3

var charCollided;

var gameState = 1;

var health = 5;

var rock1, rock2, rock3, rock4;

var rock;

var health0, health1, health2, health3, health4, health5;

var bg;

var damagePossible = true;

var restart, gameOver, goImg, restartImg;

function preload(){
  groundImg = loadImage("Images/groundLava.png")
  char1 = loadImage("Images/img1.png")
  char2= loadImage("Images/img2.png")
  char3 = loadImage("Images/img3.png")
  
  charAnimation = loadAnimation(char1, char2, char3)
  charCollided = loadAnimation(char1)

  rock1 = loadImage("Images/rock1.png")
  rock2 = loadImage("Images/rock2.png")
  rock3 = loadImage("Images/rock3.png")
  rock4 = loadImage("Images/rock4.png")

  bg = loadImage("Images/bgLava.jpg")

  health0 = loadImage("Images/health0.png")
  health1 = loadImage("Images/health1.png")
  health2 = loadImage("Images/health2.png")
  health3 = loadImage("Images/health3.png")
  health4 = loadImage("Images/health4.png")
  health5 = loadImage("Images/health5.png")

  goImg = loadImage("Images/goImg.png")
  restartImg = loadImage("Images/restart.png")
}

function setup() {
  createCanvas(1000, 400);
  
  ground = createSprite(800, 380)
  ground.addImage(groundImg)
  ground.scale = 0.7
  //ground.velocityX = -4

  char = createSprite(100, 300)
  char.addAnimation("Animation", charAnimation)
  char.addAnimation("collided", charCollided)
  // char.debug = true
  char.setCollider("circle", 0, 0, 60)

  invisibleGround = createSprite(500, 380, 1000, 45)
  invisibleGround.visible = false

  rocksGroup = createGroup()

  restart = createSprite(camera.position.x, 300)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false

  gameOver = createSprite(camera.position.x, 100)
  gameOver.addImage(goImg)
  gameOver.scale = 0.7
  gameOver.visible = false

}

function draw() {
  background(bg);
  char.x = camera.position.x - 400
  invisibleGround.x = camera.position.x
  restart.x = camera.position.x
  gameOver.x = camera.position.x
  char.collide(invisibleGround)


  if(gameState == 1){
    camera.position.x += 5

    if(ground.x < camera.position.x - 300){
      ground.x = camera.position.x + 300
    }

    if(keyDown("space")&& char.y >= 100) {
      char.velocityY = -12;
    }

    char.velocityY = char.velocityY + 0.8

    rocks()

    if(rocksGroup.isTouching(char) && damagePossible == true){
      health -= 1;
      damagePossible = false
    }

    if(rocksGroup.isTouching(char) != true){
      damagePossible = true
    }
  } else if(gameState == 0){
    char.changeAnimation("collided", charCollided)

    rocksGroup.setLifetimeEach(-1)

    gameOver.visible = true
    restart.visible = true
  }

  if(health == 5){
    image(health5, camera.position.x + 200, 70, 170, 17)
  }else if(health == 4){
    image(health4, camera.position.x + 200, 70, 170, 17)
  }else if(health == 3){
    image(health3, camera.position.x + 200, 70, 170, 17)
  }else if(health == 2){
    image(health2, camera.position.x + 200, 70, 170, 17)
  }else if(health == 1){
    image(health1, camera.position.x + 200, 70, 170, 17)
  }else if(health == 0){
    gameState = 0
  }

  if(mousePressedOver(restart)) {
    reset();
}

  drawSprites();
}

function rocks(){
  if (camera.position.x % 500 === 0){
    rock = createSprite(camera.position.x + 450, 330,10,40);
    //rock.debug = true
    rock.setCollider("circle", 0, 0, 115)
    

     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1:
         rock.addImage(rock1)
         break;
       case 2:
         rock.addImage(rock2);
         break;
         case 3:
         rock.addImage(rock3)
         break;
       case 4:
         rock.addImage(rock4)
         break;
       default: break;
     }
               
     rock.scale = 0.5;
     rock.lifetime = 200;

     rock.depth = 0
     ground.depth = 1
    
     rocksGroup.add(rock);
  }

}

function reset(){

  gameState = 1

  gameOver.visible = false
  restart.visible = false

  rocksGroup.destroyEach()
  char.changeAnimation("Animation", charAnimation)
  health = 5
}
