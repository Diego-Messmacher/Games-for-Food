
class Enemy3
{
  constructor(xp, yp) 
  {
    this.ra = 22.5; 
    this.xpo = xp;
    this.ypo = yp;
    this.xsp = 4.2;
    this.ysp = 3;
    this.xdi = 1; 
    this.ydi = 1;
  }

  move() 
  {
    this.xpo = this.xpo + this.xsp * this.xdi;
    this.ypo = this.ypo + this.ysp * this.ydi;
  }

  changeXDir()
  { 
    this.xdi *= -1;
  }

  changeYDir()
  {
    this.ydi *= -1;
  }



  display() 
  {
    fill(0);
    ellipse(this.xpo, this.ypo, this.ra, this.ra);
  }
  findEnemyx()
  {
    return this.xpo;
  }
  findEnemyy()
  {
    return this.ypo;
  }

  getXSpeed()
  {
    return this.xsp;
  }

  getYSpeed()
  {
    return this.ysp;
  }


  reset()
  {
    this.ypo=100;
    this.xpo=100;
  }
  setXSpeed(x)
  {
    this.xsp = x;
  }
  setYSpeed(y)
  {
    this.ysp= y;
  }
  getRad()
  {
    return this.ra;
  }
}
