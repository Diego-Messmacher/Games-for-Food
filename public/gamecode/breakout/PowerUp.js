function PowerUp(x, y, typ)
{
    this.x = x;
    this.y = y;
    this.wid = bSize + 20;
    this.hgt = this.wid;
    this.type = typ;
    this.hit = false;
    this.fallSpeed = 2;

    this.display = function()
    {
        if (this.type === "splitBall")
        {
            image(icons.splitBall, this.x, this.y, this.wid, this.hgt);
        } else if (this.type === "reverse")
        {
            image(icons.reverse, this.x, this.y, this.wid, this.hgt);
        }
    }

    this.update = function(paddle)
    {
        this.y += this.fallSpeed;

        if (this.collided(paddle))
            this.hit = true;

        if (this.hit && this.type === "splitBall")
        {
            score += 100;
            let dupes = [];
            for (let bll of balls)
            {
                let newBall = new Ball(bSize);
                newBall.x = bll.x;
                newBall.y = bll.y;
                newBall.speedX = random(2, 4);
                newBall.speedY = random(2, 4);
                newBall.movingRight = !bll.movingRight;
                newBall.movingDown = bll.movingDown;
                dupes.push(newBall);
            }
            balls = balls.concat(dupes);
        }
        else if (this.hit && this.type === "reverse")
        {
            reversed = true;
            reverseTime = reversedFrames;
        }
        else if (this.hit && this.type === "shrink")
        {

        }
        else if (this.hit && this.type === "stretch")
        {

        }
    }

    this.collided = function(paddle)
    {
        return !(paddle.x > this.x + this.wid ||
                 paddle.x + paddle.padWidth < this.x ||
                 paddle.y > this.y + this.hgt ||
                 paddle.y + paddle.padHeight < this.y)
    }
}
