let img;
class Car
{
  constructor(posy, xspeed, leng, heig, randdir, randobj)
  {

    this.posy=posy;
    this.xspeed=xspeed;
    this.leng=leng;
    this.img1 = loadImage("gamecode/jimbo/van.png");
    this.img2 = loadImage("gamecode/jimbo/car.png");
    this.randobj=randobj;
    this.heig=heig;
    this.randdir = randdir;
    if (this.randdir==1)
    {
      this.posx=width-20;
      this.xspeed= this.xspeed *-1;
    }
    if (this.randdir==2)
    {
      this.posx=5;
      this.posy = this.posy +32;
    }
  }

  display()
  {
    
    //fill(247, 27, 27);
    if(this.randobj==1)
    {
    image(this.img1, this.posx, this.posy, this.leng, this.heig);
    }
    if(this.randobj==2)
    {
      image(this.img2, this.posx, this.posy, this.leng, this.heig);
    }
  }

  move()
  {
    this.posx+=this.xspeed;
  }
}
