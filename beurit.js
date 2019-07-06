var context, controller, movement, game;

context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 500;
context.canvas.width = 800;

movement = {

  height: 100,
  jumping: true,
  width: 80,
  x: 0,
  x_velocity: 0,
  y: 0,
  y_velocity: 0

};
var trap = {
  posX: 760,
  posY: 290,
  trapX_Velocity: 8,
  height:40,
  width:40,
}

controller = {

  left: false,
  right: false,
  up: false,
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {

      case 37:// left key
        controller.left = key_state;
        break;
      case 38:// up key
        controller.up = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;
    }
  }
};
var myScore;

function game () {
    var crash=false

  if (trap.posX-movement.x>=60 && trap.posX-movement.x<=80 && movement.y===220){
    trap.trapX_Velocity=0
    trap.posX=movement.x+80
    crash=true
  }
  else{
    trap.trapX_Velocity=8
  }
  
  trap.posX-=trap.trapX_Velocity

  if (controller.up && movement.jumping == false) {

    movement.y_velocity -= 40;
    movement.jumping = true;
  }

  if (controller.left) {

    movement.x_velocity -= 0.5;
  }

  if (controller.right) {
    if (crash){
      movement.x_velocity+=0;
    }
    else{
      movement.x_velocity += 0.5;
    }
  }

  movement.y_velocity += 1.5;
  movement.x += movement.x_velocity;
  movement.y += movement.y_velocity;
  movement.x_velocity *= 0.9;
  movement.y_velocity *= 0.9;
  
  if (movement.y > 500 -280) {

    movement.jumping = false;
    movement.y = 500 - 280;
    movement.y_velocity = 0;

  }
  
  if (movement.x < 0) {

    movement.x = 0;

  } 
  if (movement.x > 720) {

    movement.x = 720;
  }

  if (trap.posX<-40){
    trap.posX=800;
  } 


  var background = new Image();
  background.src = "img/BG.png";
  background.onload = function () {
    context.drawImage(background, 0, 0, 800, 500);
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 800, 500);
  
  var img = new Image();
  img.onload = function () {
    context.drawImage(img, 0, 0, 80, 100);
  }
  img.src = 'img/tikus-ngeroll.png';

  context.beginPath();
  context.drawImage(background, 0, 0, 800, 500)
  context.drawImage(img, movement.x, movement.y, movement.width, movement.height)
  
  context.arc(trap.posX, trap.posY,20, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle='black'
  context.fill();
  window.requestAnimationFrame(game);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(game);