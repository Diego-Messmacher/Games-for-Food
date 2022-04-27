

class TransporterRow
{
  constructor(rowx, rowy, roww, rowh)
  {
    this.rowx=rowx;
    this.rowy=rowy;
    this.roww=roww;
    this.rowh=rowh;
    this.trans= new Transporter(10, this.rowy, random(1, 2.5), random(40, 80), this.rowh);
    this.numb=2;
    this.entered=false;
    this.img=loadImage("gamecode/jimbo/river.png");
  }


  display()
  {
    fill(130, 255, 256);
    stroke(0);
    image(this.img, this.rowx, this.rowy, this.roww, this.rowh);
    this.trans.display();
  }

  update()
  {
    this.trans.move();
  }
  collision(User)
  {
    this.trans.collision(User);

      if (User.posx > this.rowx && 
      User.posx < this.roww + this.rowx && 
      User.posy + User.heig> this.rowy && 
      User.posy < this.rowh + this.rowy &&
      this.trans.collision(User)!=false)
    {
      return true;
    }
  }
}
