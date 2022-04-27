class bullet
{
  constructor(x,y)
  {
    this.posy = y;
    this.posx = x;
    this.leng=10;
    this.img = loadImage("gamecode/rocketdodger/bullet.png");
  }

  display()
  {

    fill(255);
    image(this.img, this.posx, this.posy, this.leng);
  }

  move()
  {

    this.posy -= 5;

  }


}
