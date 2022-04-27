
function Paddle()
{
  this.x = width / 2;
  this.y = height - height / 5;
  this.padWidth = paddleWidth;
  this.padHeight = paddleHeight;

  this.display = function()
  {
    fill(0, 222, 190);
    strokeWeight(1);
    stroke(0, 108, 93);
    rect(this.x, this.y, this.padWidth, this.padHeight, 5, 5, 5, 5);
  }

  this.update = function(ball)
  {
    if (reversed)
    {
      if (mouseX + this.padWidth / 2 <= width && mouseX - this.padWidth / 2 >= 0)
      {
        this.x = width - mouseX;
      } else if (mouseX + this.padWidth / 2 > width)
        this.x = 0;
      else if (mouseX - this.padWidth / 2 < 0)
        this.x = width - this.padWidth;
    } else
    {
      if (mouseX + this.padWidth / 2 <= width && mouseX - this.padWidth / 2 >= 0)
      {
        this.x = mouseX - this.padWidth / 2;
      } else if (mouseX + this.padWidth / 2 > width)
        this.x = width - this.padWidth;
      else if (mouseX - this.padWidth / 2 < 0)
        this.x = 0;
    }

    if (this.hitTop(ball))
    {
      ball.hitCount = 0;
      ball.movingDown = false;
    }
    if (this.hitRight(ball))
    {
      ball.hitCount = 0;
      ball.movingRight = true;
    }
    if (this.hitLeft(ball))
    {
      ball.hitCount = 0;
      ball.movingRight = false;
    }
  }

  this.hitTop = function(ball)
  {
    if (ball.y + ball.ballSize / 2 > this.y && ball.y + ball.ballSize / 2 < this.y + this.padHeight
      && ball.x > this.x && ball.x < this.x + this.padWidth)
    {
      return true;
    } else
    {
      return false;
    }
  }

  this.hitRight = function(ball)
  {
    if (ball.x - ball.ballSize / 2 < this.x + this.padWidth &&
      ball.x - ball.ballSize / 2 > this.x &&
      ball.y > this.y &&
      ball.y < this.y + this.padHeight &&
      ball.movingRight === false)
    {
      return true;
    } else
    {
      return false;
    }
  }
  this.hitLeft = function(ball)
  {
    if (ball.x + ball.ballSize / 2 < this.x + this.padWidth &&
      ball.x + ball.ballSize / 2 > this.x &&
      ball.y > this.y &&
      ball.y < this.y + this.padHeight &&
      ball.movingRight === true)
    {
      return true;
    } else
    {
      return false;
    }
  }
}
