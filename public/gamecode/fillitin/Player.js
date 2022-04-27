let x = 0;
let y = 0;
let lives = 3;
let sizeX = 30;
let sizeY = 30;
class Player
{


 display(ima)
 {

   image(ima,x,y,sizeX,sizeY);

 }

 hurt()
 {
  lives -= 1;
 }

 move()
 {
    if((keyIsDown(65) || keyIsDown(37)) && x >= 3)
  {
   x -= 3.5;
  }
  if((keyIsDown(87) || keyIsDown(40)) && y <= canvy-sizeY)
  {
   y += 3.5;
  }
  if((keyIsDown(68) || keyIsDown(39)) && x <= canvx-sizeX)
  {
   x += 3.5;
  }
  if((keyIsDown(83)|| keyIsDown(38)) && y >= 3)
  {
   y -=3.5;
  }

 }

 playerSizeX()
 {
   return sizeX;
 }

 playerSizeY()
 {
   return sizeY;
 }

 playerX()
 {
  return x;
 }
 playerY()
 {
  return y;
 }

  lostLife()
  {
   lives -= 1;
   x=0;
   y=0;
  }

  setSizeX(x)
  {
   sizeX =x;
  }

  setSizeY(y)
  {
    sizeY = y;
  }

  getLives()
  {
   return lives;
  }

  reset()
  {
   x=0;
   y=0;
  }

  resetLives()
  {
    lives = 3;
  }


}
