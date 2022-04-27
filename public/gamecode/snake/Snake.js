function Snake()
{
    this.x = 300 ;
    this.y = 300;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.score = 0;
    this.highscore = 0;
    this.status = true;

    this.dir = function(x, y)
    {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function()
    {
        if (this.total === this.tail.length)
        {
            for (var i = 0; i < this.tail.length -1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);


        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;

        //this.x = constrain(this.x, 0, width-scl);
        //this.y = constrain(this.y, -1, height-10);
    }

    this.show = function()
    {
        fill(156, 225, 255);

        if (this.tail.length > 0)
        {
            for (var i = 0; i < this.tail.length; i++)
            {
                rect(this.tail[i].x, this.tail[i].y, scl, scl);
            }
        }

        rect(this.x, this.y, scl, scl);
    }

    this.eat = function(pos)
    {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            this.score++;
            text(this.score, 70, 625);
            if (this.score > this.highscore) {
                this.highscore = this.score;
            }
            text(this.highscore, 540, 625);
            return true;
        } else {
            return false;
        }
    }

    this.death = function()
    {
        if(this.x < 0 || this.x + scl > width )
        {
            keyCode = 0;
            status = "gameover";
            this.tail = [];
            this.total = 0;
//            this.score = 0;
        }
        if(this.y < 0 || this.y + scl > 600)
        {
            keyCode = 0;
            status = "gameover";
            this.tail = [];
            this.total = 0;
  //          this.score = 0;
        }
        for (var i = 0; i < this.tail.length; i++)
        {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if ( d < 1)
            {
                keyCode = 0;
                console.log('starting over');
//                this.score = 0;
                this.total = 0;
                this.tail = [];
                status = "gameover";
            }
        }
    }
}
