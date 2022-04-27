class asteroids
{
  constructor()
  {
    this.asts = [];
   
  }

  display()
  {
    if (timePassed/100<5000)
    {
      if (frameCount % 80 == 0)
      {
        this.asts.push(new asteroid(random(10, 980), random(1, 5), random([1, 2]), random([0, 1, 2, 3, 4, 5]), random([0, 1, 2])));
      }
    } else if (timePassed/100>5000 && timePassed/100<10000)
    {
      if (frameCount % 65 == 0)
      {
        this.asts.push(new asteroid(random(10, 980), random(1, 5), random([1, 2]), random([0, 1, 2, 3, 4, 5]), random([0, 1, 2])));
      }
    } else if (timePassed/100>10000 && timePassed/100<15000)
    {
      if (frameCount % 50 == 0)
      {
        this.asts.push(new asteroid(random(10, 980), random(1, 5), random([1, 2]), random([0, 1, 2, 3, 4, 5]), random([0, 1, 2])));
      }
    } else
    {
      if (frameCount % 35 == 0)
      {
        this.asts.push(new asteroid(random(10, 980), random(1, 5), random([1, 2]), random([0, 1, 2, 3, 4, 5]), random([0, 1, 2])));
      }
    }

    for (let i=this.asts.length-1; i >=0; i--)
    {
      if (this.asts[i].posy >height)
      {
        this.asts.splice(i, 1);
      }
    }

    for (let i=0; i<this.asts.length; i++)
    {
      this.asts[i].display();
    }
  }

  update(player)
  {
   
    for (let i=0; i<this.asts.length; i++)
    {
      this.asts[i].move();
      if (this.asts[i].collision(player) == true)
      {
        playing = false;
        gameover = true;
        break;
      }
    }
  }
 

  bollision(bullet)
  {

    for (let i=0; i<this.asts.length; i++)
    {

      if (bullet.posx + bullet.leng > this.asts[i].posx && 
        bullet.posx < this.asts[i].leng + this.asts[i].posx && 
        bullet.posy + bullet.leng > this.asts[i].posy && 
        bullet.posy < this.asts[i].heig + this.asts[i].posy)
      {
        timePassed += 25000;
        
        bullets.splice(bullets.indexOf(bullet), 1);
        this.asts.splice(i, 1);
      }
    }
  }
}
