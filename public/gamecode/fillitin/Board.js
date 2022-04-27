
let board = [];
let size = 750;
let boardx = 25;
let boardy = 25;
let squareSizeX = size/boardx;
let squareSizeY = size/boardy;
let count = 0;


class Board
{
  constructor()
  {
    for (let x = 0; x < boardx; x++)
    {
      board[x] = [];      
    }
    for(let x = 0; x <boardx ; x++)
    {
       for(let y = 0; y < boardy; y++)
       {
        if(x==0||y==0||x==boardx-1||y==boardy-1)
        {
          board[x][y] = 1;
        }
          else
          {
          board[x][y] = 2;
          }
       }
    }
  }
  
  getSquareSizeX()
  {
    return squareSizeX;
  }
  
  getSquareSizeY()
  {
    return squareSizeY;
  }
  display()
  {
    for (let x = 0; x < boardx; x++)
    {
        for(let y = 0; y < boardy; y++)
       {
         
         if(board[x][y] == 1)
         {
           fill(0,102,152);
          square(x*squareSizeX,y*squareSizeY,squareSizeX,squareSizeY);
         }
         else if(board[x][y] == 2)
         {
         fill(255,255,255);
         square(x*squareSizeX,y*squareSizeY,squareSizeX,squareSizeY);
         }
         else if(board[x][y] == 4)
         {
          fill(0,60,255);
          square(x*squareSizeX,y*squareSizeY,squareSizeX,squareSizeY);
         }
         else if(board[x][y] == 3)
         {
          fill(255,128,0); 
          square(x*squareSizeX,y*squareSizeY,squareSizeX,squareSizeY);
         }
         
       }
    }
    
    
    
  }
  
  
  findW(x,y)
    {
      if(board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] == 2)
      {
        board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] = 4;
      }
    }
    
    findB(x,y)
    {
     if(board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] == 1)
     {
        for (let i = 0; i < boardx; i++)
      {
        for(let j = 0; j < boardy; j++)
       {
         
         if(board[i][j] ==4)
         {
           board[i][j] = 1;
       }
      }
      }
     }
    }
  lostLife()
  {
    for (let i = 0; i < boardx; i++)
      {
        for(let j = 0; j < boardy; j++)
       {
         
         if(board[i][j] ==4)
         {
           board[i][j] = 2;
       }
      }
      }
  }
  
  isBlue(x,y)
  { 
  return board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] == 1;
  }
  
  toOrange(x,y)
  {
    board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] = 3;
  }
  
  isOrange(x,y)
  {
    return board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] == 1;
  }
  
  
  isVulnerable(x,y)
  { 
  return board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] == 4;
  }
       
  isWhite(x,y)
  { 
   
  return board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] == 2;
  }
  
  toWhite(x,y)
  {
    board[(int)(x/squareSizeX)][(int)(y/squareSizeY)] = 2;
  }
  
  setBoardX(x)
  {
   boardx = x;
  }
  
  setBoardY(y)
  {
   boardy = y; 
  }
  
  reset()
  {
    squareSizeX = size/boardx;
    squareSizeY = size/boardy;
    for (let x = 0; x < boardx; x++)
    {
      board[x] = [];      
    }
    for(let x = 0; x <boardx ; x++)
    {
       for(let y = 0; y < boardy; y++)
       {
        if(x==0||y==0||x==boardx-1||y==boardy-1)
        {
          board[x][y] = 1;
        }
          else
          {
          board[x][y] = 2;
          }
       }
    }
  }
  
  count()
  {
    let tempC = 0;
    for(let x = 0; x <boardx ; x++)
    {
       for(let y = 0; y < boardy; y++)
       {
        if(board[x][y] == 1)
        {
          tempC++;
        }
       }
    }
    
    return tempC/(boardx*boardy);
  }
       
       
       
       
       
       
       
       
       
     
  
  
  
  
  

}
    
