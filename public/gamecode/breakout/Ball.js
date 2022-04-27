function Ball(size)
{
  this.x = 0;
  this.y = 0;
  this.ballSize = size;
  this.movingRight = false;
  this.movingDown = true;
  this.speedX = 0;
  this.speedY = 0;
  this.dead = false;
  this.hitCount = 0;

  this.display = function() {
    fill(255, 0, 0);
    strokeWeight(1);
    stroke(100, 0, 0);

    ellipse(this.x, this.y, this.ballSize, this.ballSize);
  }

  this.update = function() {
    if (this.movingDown === true)
    {
      this.y = this.y + this.speedY;
    }
    if (this.movingDown === false)
    {
      this.y = this.y - this.speedY;
    }
    if (this.movingRight === true)
    {
      this.x = this.x + this.speedX;
    }
    if (this.movingRight === false)
    {
      this.x = this.x - this.speedX;
    }

    if (this.y + this.ballSize / 2 >= height)
    {
      this.dead = true;
    }
    if (this.y - this.ballSize / 2 <= 0)
    {
      this.movingDown = true;
    }
    if (this.x  + this.ballSize / 2 >= width)
    {
      this.movingRight = false;
    }
    if (this.x - this.ballSize / 2<= 0)
    {
      this.movingRight = true;
    }
  }
}
