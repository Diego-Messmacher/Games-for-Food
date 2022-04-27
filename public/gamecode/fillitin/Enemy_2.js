
class Enemy2
{
  constructor(xp, yp) {

    this.diameter = random(10, 30);
    this.speed = 1;
    this.xposi = 730;
    this.yposi = 730;
    this.xdir = 1; 
    this.ydir = 1; 
    this.radi = 10;
    this.xspee = xp;
    this.yspee = yp;
  }

  move() 
  {
    this.xposi = this.xposi + this.xspee * this.xdir;
    this.yposi = this.yposi + this.yspee * this.ydir;
  }

  changeXDir()
  { 
    this.xdir *= -1;
  }

  changeYDir()
  {
    this.ydir *= -1;
  }


  getRad()
  {
    return this.radi;
  } 

  display() 
  {
    fill(0, 255, 0);
    ellipse(this.xposi, this.yposi, this.radi, this.radi);
  }
  findEnemyx()
  {
    return this.xposi;
  }
  findEnemyy()
  {
    return this.yposi;
  }

  getXSpeed()
  {
    return this.xspee;
  }

  getYSpeed()
  {
    return this.yspee;
  }
  setXSpeed()
  {
    this.xspeed = random(1, 4);
  }
  setYSpeed()
  {
    this.yspeed= random(1, 4);
  }

  reset()
  {
    this.xposi = 740;
    this.yposi = 740;
  }

  setRad(x)
  {
    this.radi = x;
  }
}
