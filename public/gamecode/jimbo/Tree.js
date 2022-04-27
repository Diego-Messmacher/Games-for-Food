class Tree
{
  constructor(posx, posy, leng, heig)
  {
    this.posx=posx;
    this.posy=posy;
    this.leng=leng;
    this.heig=heig;
    this.img= loadImage("gamecode/jimbo/lava.png");
  }
  
  display()
  {
    fill(31, 255, 81);
    image(this.img, this.posx, this.posy, this.leng, this.heig);
    
  }
}
