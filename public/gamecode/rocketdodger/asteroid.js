class asteroid
{

  constructor(posx, randspeed, randobj, randsize, randmov)
  {
    if (randsize === 0)
    {
      this.leng = 15;
      this.heig = 30;
    } else
      if (randsize === 1)
      {
        this.leng = 30;
        this.heig = 60;
      } else
        if (randsize === 2)
        {
          this.leng = 35;
          this.heig = 70;
        } else
          if (randsize === 3)
          {
            this.leng = 40;
            this.heig = 80;
          } else
            if (randsize === 4)
            {
              this.leng = 50;
              this.heig = 100;
            } else
              if (randsize === 5)
              {
                this.leng = 60;
                this.heig = 120;
              }

    this.posx = posx;
    this.posy = -10;
    this.speed = randspeed;
    this.randobj = randobj;
    this.img1 = loadImage("gamecode/rocketdodger/asteroid1.png");
    this.img2 = loadImage("gamecode/rocketdodger/asteroid2.png");
    this.randmov = randmov;
    this.zig=true;
    this.equi=posx;
  }

  display()
  {
    let imag;
    if (this.randobj==1)
    {
      imag=this.img1;
    } else
    {
      imag=this.img2;
    }

    //if (this.randmov == 0 && timePassed/100 > 1000)
    //{
    //  push();
    //  translate(this.posx, this.posy);
    //  if (!this.zig)
    //  {
    //    rotate(radians(-45));
    //  } else
    //  {
    //    rotate(radians(45));
    //  }
    //image(imag, 0, 0, this.leng, this.heig);
    //noFill();
    //stroke(255, 0, 0);
    //  rect(0, 0, this.leng, this.heig);
    //  pop();
    //} else
    //{
    image(imag, this.posx, this.posy, this.leng, this.heig);
    noFill();
    stroke(255, 0, 0);
    //rect(this.posx, this.posy, this.leng, this.heig);
  }



move()
{
  //if (timePassed/100<1000)
  //{
  //  this.posy += this.speed;
  //} else
  //{
  //  if (this.randmov==0)
  //  {
  //    print('crisscross');
  //    this.posy+=this.speed;
  //    if (this.zig)
  //    {
  //      this.posx-=this.speed;
  //      if (this.posx<this.equi-100)
  //      {
  //        this.zig=false;
  //      }
  //    } else
  //    {
  //      this.posx+=this.speed;
  //      if (this.posx>this.equi+100)
  //      {
  //        this.zig=true;
  //      }
  //    }
  //  } else
  //  {
  this.posy+=this.speed;
  //}
  //}
}
collision(User)
{
  let collided=false;

  //if (this.randmov==0 && timePassed/100>1000)
  //{
  //  push();

  //  translate(this.posx, this.posy);
  //  if (!this.zig)
  //  {
  //    rotate(radians(-45));
  //  } else
  //  {
  //    rotate(radians(45));
  //  }
  //  if (User.posx-this.posx+ User.leng > 0 &&
  //    User.posx-this.posx < this.leng  &&
  //    User.posy-this.posy+ User.heig > 0 &&
  //    User.posy-this.posy < this.heig )
  //  {

  //    collided = true;
  //  }
  //  pop();
  //} else
  //{
  if (User.posx + User.leng > this.posx &&
    User.posx < this.leng + this.posx &&
    User.posy + User.heig > this.posy &&
    User.posy < this.heig + this.posy)
  {
    collided=true;
  }
  return collided;
}



}
