class ammo
{
  constructor()
  {
    this.posx = random(10,900);
    this.posy = 0;
    this.leng = 30;
    this.heig = 30;
    this.img = loadImage("gamecode/rocketdodger/ammo.png");
  }

  display()
  {
    image(this.img,this.posx, this.posy, this.leng, this.heig);
  }

  move()
  {
    if(timePassed/100 > 10000)
    {
      this.posy += 5;
    }
    else
    {
    this.posy +=3;
    }
  }
}
