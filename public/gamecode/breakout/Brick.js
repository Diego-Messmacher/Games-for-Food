let splitChance = .10;
let reverseChance = .15;

function Brick(wd, ht, cN)
{
    this.wid = wd;
    this.hgt = ht;
    this.x = 0;
    this.y = 0;
    this.col = int(cN);
    this.hit = false;

    this.display = function()
    {
        fill(brickColors[this.col]);
        strokeWeight(1);
        stroke(0);
        rect(this.x, this.y, this.wid, this.hgt);
    }

    this.update = function(ball)
    {
        if (this.hitRight(ball))
        {
            this.hit = true;
            ball.movingRight = true;
        }
        if (this.hitTop(ball))
        {
            this.hit = true;
            ball.movingDown = false;
        }
        if (this.hitLeft(ball))
        {
            this.hit = true;
            ball.movingRight = false;
        }
        if (this.hitBottom(ball))
        {
            this.hit = true;
            ball.movingDown = true;
        }

        if (this.hit)
        {
            ball.hitCount++;
            if (this.col === 1)
            {
                let chance = random();
                if (chance <= splitChance + 0.0025 * (ball.hitCount - 1))
                {
                    let pu = new PowerUp(this.x + this.wid / 2, this.y + this.hgt / 2, 'splitBall');
                    powerups.push(pu);
                }
            } else if (this.col === 2)
            {
                let chance = random();
                if (chance <= reverseChance + 0.0025 * (ball.hitCount - 1))
                {
                    let pu = new PowerUp(this.x + this.wid / 2, this.y + this.hgt / 2, 'reverse');
                    powerups.push(pu);
                }
            }
        }
    }

    this.colorEquals = function(col)
    {
        return red(this.col) === red(col) && green(this.col) === green(col) && blue(this.col) === blue(col);
    }

    this.hitRight = function(ball)
    {
        if (ball.x - ball.ballSize / 2 < this.x + this.wid &&
            ball.x - ball.ballSize / 2 > this.x &&
            ball.y > this.y &&
            ball.y < this.y + this.hgt &&
            ball.movingRight === false)
        {
            return true;
        } else
        {
            return false;
        }
    }

    this.hitTop = function(ball)
    {
        if (ball.y + ball.ballSize / 2 > this.y &&
            ball.y + ball.ballSize / 2 < this.y + this.hgt &&
            ball.x > this.x &&
            ball.x < this.x + this.wid &&
            ball.movingDown === true)
        {
            return true;
        } else
        {
            return false;
        }
    }

    this.hitBottom = function(ball)
    {
        if (ball.y - ball.ballSize / 2 > this.y &&
            ball.y - ball.ballSize / 2 < this.y + this.hgt &&
            ball.x > this.x &&
            ball.x < this.x + this.wid &&
            ball.movingDown === false)
        {
            return true;
        } else
        {
            return false;
        }
    }

    this.hitLeft = function(ball)
    {
        if (ball.x + ball.ballSize / 2 < this.x + this.wid &&
            ball.x + ball.ballSize / 2 > this.x &&
            ball.y > this.y &&
            ball.y < this.y + this.hgt &&
            ball.movingRight === true)
        {
            return true;
        } else
        {
            return false;
        }
    }
}
