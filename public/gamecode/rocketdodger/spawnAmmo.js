class spawnAmmo
{
  constructor()
  {
    this.ammos = [];
  }

  display()
  {
    if (timePassed/100<5000)
    {
      if (frameCount % 270 == 0)
      {
        this.ammos.push(new ammo());
      }
    }
    else if(timePassed/100>5000 && timePassed/100<10000)
    {
      if (frameCount % 210 == 0)
      {
        this.ammos.push(new ammo());
      }
    }
    else if(timePassed/100>10000 && timePassed/100<15000)
    {
       if (frameCount % 160 == 0)
      {
        this.ammos.push(new ammo());
      }
    }
    else 
    {
       if (frameCount % 130 == 0)
      {
        this.ammos.push(new ammo());
      }
    }


    for (let i=0; i<this.ammos.length; i++)
    {
      this.ammos[i].display();  
      this.ammos[i].move();
      this.collision(rock);
    }
  }

  collision(User)
  {
    for (let i=0; i<this.ammos.length; i++)
    {
      if (User.posx + User.leng > this.ammos[i].posx && 
        User.posx < this.ammos[i].leng + this.ammos[i].posx && 
        User.posy + User.heig > this.ammos[i].posy && 
        User.posy < this.ammos[i].heig + this.ammos[i].posy)
      {
        rock.bullets+=1;
        this.ammos.splice(i, 1);
      }
    }
  }
}
