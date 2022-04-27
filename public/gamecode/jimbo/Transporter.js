

class Transporter
{
  constructor(posx, posy, xspeed, leng, heig)
  {
    this.posx=posx;
    this.posy = posy;
    this.xspeed=xspeed;
    this.leng=leng;
    this.heig=heig;
    this.img=loadImage("gamecode/jimbo/log.png");
  }


  display()
  {
    //fill(193, 98, 8);
    image(this.img, this.posx, this.posy, this.leng, this.heig);
  }
  move()
  {
    this.posx+=this.xspeed;
    if (this.posx > width-this.leng || this.posx < 0) { 
      this.xspeed = this.xspeed * -1;
    }
  }

  collision(User)
  {
    if (User.posx + User.leng/3 > this.posx && 
      User.posx + User.leng/2< this.leng + this.posx  && 
      User.posy + User.heig> this.posy && 
      User.posy < this.heig + this.posy)
    {
      //User.posx = this.posx + this.leng/2.75;
      User.posx+=this.xspeed*0.25;
      return false;
      //I need to fix this because the user dies on the transporter sometimes
    }
    
    
  }
}
