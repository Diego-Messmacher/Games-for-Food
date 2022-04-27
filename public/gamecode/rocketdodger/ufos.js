class ufos
{
    constructor()
    {
        this.ufos=[];
    }
    display()
    {
        if(timePassed/100>1000 && timePassed/100<10000)
        {
            if(frameCount%random([100,125,150,175,200])==0)
            {
                this.ufos.push(new ufo());
            }
        }
        if(timePassed/100>=10000 && timePassed/100<20000)
        {
            if(frameCount%random([100,110,120,130,140])==0)
            {
                this.ufos.push(new ufo());
            }
        }
        if(timePassed/100>=20000)
        {
            if(frameCount%random([80,90,100,110,120])==0)
            {
                this.ufos.push(new ufo());
            }
        }
        for (let i=0; i<this.ufos.length; i++)
        {
            this.ufos[i].display();
            this.ufos[i].move();
            this.collision(rock);
        }
    }
    collision(User)
    {
        for (let i=0; i<this.ufos.length; i++)
        {
            if (User.posx + User.leng > this.ufos[i].posx &&
                User.posx < this.ufos[i].leng + this.ufos[i].posx &&
                User.posy + User.heig > this.ufos[i].posy &&
                User.posy < this.ufos[i].heig + this.ufos[i].posy)
            {
                gameover=true;
                playing=false;
            }
        }
    }
    bollision(bullet)
    {

        for (let i=0; i<this.ufos.length; i++)
        {

            if (bullet.posx + bullet.leng > this.ufos[i].posx &&
                bullet.posx < this.ufos[i].leng + this.ufos[i].posx &&
                bullet.posy + bullet.leng > this.ufos[i].posy &&
                bullet.posy < this.ufos[i].heig + this.ufos[i].posy)
            {
                timePassed += 50000;

                bullets.splice(bullets.indexOf(bullet), 1);
                this.ufos.splice(i, 1);
            }
        }
    }
}
