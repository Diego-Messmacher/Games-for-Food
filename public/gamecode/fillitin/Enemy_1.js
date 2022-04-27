
class Enemy1
{
  constructor(xp, yp) 
  {

    this.diameter = random(10, 30);
    this.speed = 1;
    this.xpos = xp;
    this.ypos = yp;
    this.xspeed = x;
    this.yspeed = y;
    this.xdirection = 1; 
    this.ydirection = 1;
    this.rad = 22.5;
  }

  move() {
    this.xpos = this.xpos + this.xspeed * this.xdirection;
    this.ypos = this.ypos + this.yspeed * this.ydirection;
  }

  changeXDir()
  { 
    this.xdirection *= -1;
  }

  changeYDir()
  {
    this.ydirection *= -1;
  }



  display() 
  {
    fill(255, 0, 0);
    ellipse(this.xpos, this.ypos, this.rad, this.rad);
  }
  findEnemyx()
  {
    return this.xpos;
  }
  findEnemyy()
  {
    return this.ypos;
  }

  getXSpeed()
  {
    return this.xspeed;
  }

  getYSpeed()
  {
    return this.yspeed;
  }


  reset()
  {
    this.ypos=100;
    this.xpos=100;
  }
  setXSpeed(x)
  {
    this.xspeed = x;
  }
  setYSpeed(y)
  {
    this.yspeed= y;
  }
}
