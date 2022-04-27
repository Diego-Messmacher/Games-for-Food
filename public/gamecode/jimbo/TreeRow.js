class TreeRow
{
  constructor(rowx, rowy, roww, rowh, randspace)
  {
    this.rowx=rowx;
    this.rowy=rowy;
    this.roww=roww;
    this.rowh=rowh;
    this.randspace = randspace;
    this.trees=[];
    this.numb=3;
    this.entered=false;
    for (let i=0; i<23; i++)
    {
      this.trees.push(new Tree((i*40), this.rowy+8, 35, 50));
      if (i==this.randspace)
      {
        i++;
      }
    }
  }

  display()
  {
    fill(152, 74, 74);
    stroke(0);
    rect(this.rowx, this.rowy, this.roww, this.rowh);



    for (let i=0; i<this.trees.length; i++)
    {
      this.trees[i].display();
    }
  }

  collision(User)
  {
    for (let i=0; i<this.trees.length; i++)
    {
      if(User.posx + User.leng > this.trees[i].posx &&
        User.posx < this.trees[i].leng + this.trees[i].posx && 
        User.posy + User.heig > this.trees[i].posy && 
        User.posy < this.trees[i].heig + this.trees[i].posy)
        {
          return true;
        }
      }
    }
  }
