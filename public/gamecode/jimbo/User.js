
class User
{
  constructor()
  {
    this.posx=width/2;
    this.posy=height-15;
    this.leng = 21.5;
    this.heig = 21.5;
    this.img=loadImage("gamecode/jimbo/Jimbo.png");
    //this.posmid = this.posx+this.leng/2;
  }

  display()
  {
    fill(230, 240, 80);
    image(this.img, this.posx, this.posy, this.leng, this.heig);
  }

  move()
  {


    if (keyIsDown(LEFT_ARROW)&& this.posx>1) {
      this.posx -= 2;
    }

    if (keyIsDown(RIGHT_ARROW) && this.posx<width-10) {
      this.posx += 2;
    }

    if (keyIsDown(UP_ARROW)) {
      this.posy -= 2;
    }

    if (keyIsDown(DOWN_ARROW) && this.posy<height-5) {
      this.posy += 2;
    }
  }
}
