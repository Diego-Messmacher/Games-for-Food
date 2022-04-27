class CarRow
{
  constructor(rowx, rowy, roww, rowh)
  {
    this.rowx=rowx;
    this.rowy=rowy;
    this.roww=roww;
    this.rowh=rowh;
    this.cars= [];
    this.numb=1;
    this.entered=false;
    this.img=loadImage("gamecode/jimbo/road.png");
    //new Car(this.rowy+2.5, random(1, 4), 40, this.rowh/2.5, random([1, 2]));
  }


  display()
  {
    //fill(207, 214, 208);
    //stroke(0);
    image(this.img, this.rowx, this.rowy, this.roww, this.rowh);

    //stroke(255);
    //line(0, this.rowy+this.rowh/2, width, this.rowy+this.rowh/2);

    noStroke();
    if (frameCount%60==0)
    {
      this.cars.push(new Car(this.rowy+2.5, random(1, 4), 45, this.rowh/2.5, random([1, 2]), random([1,2])));
    }

    for (let i=this.cars.length-1; i >=0; i--)
    {
      if (this.cars[i].posx >width || this.cars[i].posx<-40)
      {
        this.cars.splice(i, 1);
      }
    }

    for (let i=0; i<this.cars.length; i++)
    {
      this.cars[i].display();
    }
  }

  update()
  {
    for (let i=0; i<this.cars.length; i++)
    {
      this.cars[i].move();
    }
  }
  collision(User)
  {
    for (let i=0; i<this.cars.length; i++)
    {
      if (User.posx + User.leng > this.cars[i].posx && 
        User.posx < this.cars[i].leng + this.cars[i].posx && 
        User.posy + User.heig > this.cars[i].posy && 
        User.posy < this.cars[i].heig + this.cars[i].posy)
      {
        return true;
      }
    }
  }
}
