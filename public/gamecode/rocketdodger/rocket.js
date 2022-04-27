class rocket
{
  constructor()
  {
    this.bullets = 5;
    this.posx=width/2;
    this.posy= height - 60;
    this.leng = 30;
    this.heig = 60;
    this.img=loadImage("gamecode/rocketdodger/rocket.png");
    this.dir = 0;
  }


  move()
  {


    if (keyIsDown(LEFT_ARROW)&& this.posx>1) {
      this.posx -= 3;

    }

    if (keyIsDown(RIGHT_ARROW) && this.posx<width-30) {
      this.posx += 3;

    }

    if (keyIsDown(UP_ARROW) && this.posy > 1) {
      this.posy -= 3;

    }

    if (keyIsDown(DOWN_ARROW) && this.posy<height-60) {
      this.posy += 3;

    }
  }

   display()
  {
    fill(255,255,255);
    image(this.img, this.posx, this.posy, this.leng, this.heig);
  }




}
