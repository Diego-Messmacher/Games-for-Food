class ufo
{
    constructor()
    {
        this.posx = random(10,900);
        this.posy = 0;
        this.leng = 60;
        this.heig = 60;

        this.img = loadImage("gamecode/rocketdodger/alien.png");
        this.equi=this.posx;
        this.speed=random(1, 4);
        this.zig=true;
    }

    display()
    {
        image(this.img,this.posx, this.posy, this.leng, this.heig);
    }

    move()
    {
        this.posy+=this.speed;
        if (this.zig)
        {
            this.posx-=this.speed;
            if (this.posx<this.equi-random([65,75,90,105]))
            {
                this.zig=false;
            }
        } else
        {
            this.posx+=this.speed;
            if (this.posx>this.equi+random([65,75,90,105]))
            {
                this.zig=true;
            }
        }
    }
}
