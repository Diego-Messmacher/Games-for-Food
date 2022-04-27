
function Tile(colo, x, y, size)
{
  this.colo = colo;
  this.x = x;
  this.y = y;
  this.size = size;


  this.display = function()
  {
    if (this.colo==1)
    {
      //RED
      noStroke();
      fill(237, 7, 7);
      rect(this.x, this.y, this.size, this.size);
    } else if (this.colo==2)
    {
      //YELLOW
      noStroke();
      fill(243, 247, 10);
      rect(this.x, this.y, this.size, this.size);
    } else if (this.colo==3)
    {
      //PURPLE
      noStroke();
      fill(189, 0, 203);
      rect(this.x, this.y, this.size, this.size);
    } else if (this.colo==4)
    {
      //ORANGE
      noStroke();
      fill(252, 144, 36);
      rect(this.x, this.y, this.size, this.size);
    } else if (this.colo==5)
    {
      //GREEN
      noStroke();
      fill(93, 214, 35);
      rect(this.x, this.y, this.size, this.size);
    } else
    {
      //BLUE
      noStroke();
      fill(89, 169, 252);
      rect(this.x, this.y, this.size, this.size);
    }
  }
}
