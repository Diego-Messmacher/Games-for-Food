let state = 'h';
let alive = true;
let playerImg;
let canvy = 750;
let canvx = 750;
let reds = 0;
let greens = 0;
let blacks = 0;
let levels = 0;

let nme = [];
let nme2 = [];
let nme3 = [];
let plyr;
let theBoard;

let savedScore;

function setup()
{
    img = loadImage('/gamecode/fillitin/joe.png');
    createCanvas(canvx, canvy);
    background(255, 255, 255);
    plyr = new Player();
    theBoard = new Board();
    let filled = loadImage('/gamecode/fillitin/Blue.png');
    let nFilled  = loadImage('/gamecode/fillitin/White.jpg');

    savedScore = false;
}
function checkReds()
{
    for (i=0; i<reds; i++)
    {
        if ((nme[i].findEnemyx()>=plyr.playerX() && nme[i].findEnemyx() <= plyr.playerX()+plyr.playerSizeX())&&(nme[i].findEnemyy()>=plyr.playerY() && nme[i].findEnemyy() <= plyr.playerY()+plyr.playerSizeY()))
        {
            plyr.lostLife();
            theBoard.lostLife();
        }

        if (theBoard.isBlue((nme[i].findEnemyx()-  theBoard.getSquareSizeX()/2.6), nme[i].findEnemyy()) || (theBoard.isBlue((nme[i].findEnemyx()+theBoard.getSquareSizeX()/2.6), nme[i].findEnemyy())))
        {
            nme[i].changeXDir();
        }
        if (theBoard.isBlue((nme[i].findEnemyx()), nme[i].findEnemyy()+ theBoard.getSquareSizeY()/2.6) || (theBoard.isBlue((nme[i].findEnemyx()), nme[i].findEnemyy()-  theBoard.getSquareSizeY()/2.6)))
        {
            nme[i].changeYDir();
        }

        if (theBoard.isVulnerable(nme[i].findEnemyx(), nme[i].findEnemyy()))
        {
            plyr.lostLife();
            theBoard.lostLife();
        }
        nme[i].move();
        nme[i].display();
    }
}

function checkGreens()
{
    for (i=0; i<greens; i++)
    {
        if ((nme2[i].findEnemyx()>=plyr.playerX() && nme2[i].findEnemyx() <= plyr.playerX()+plyr.playerSizeX())&&(nme2[i].findEnemyy()>=plyr.playerY() && nme2[i].findEnemyy() <= plyr.playerY()+plyr.playerSizeY()))
        {
            plyr.lostLife();
            theBoard.lostLife();
        }
        if (nme2[i].findEnemyx()<= nme2[i].getRad() || nme2[i].findEnemyx() >= 750-10)
        {
            nme2[i].changeXDir();
        } else if (theBoard.isWhite((nme2[i].findEnemyx()-theBoard.getSquareSizeX()/3.2), nme2[i].findEnemyy()) || (theBoard.isWhite((nme2[i].findEnemyx()+theBoard.getSquareSizeX()/3.2), nme2[i].findEnemyy())))
        {
            nme2[i].changeXDir();
        }
        if (nme2[i].findEnemyy()<= nme2[i].getRad() || nme2[i].findEnemyy() >= 750-10)
        {
            nme2[i].changeYDir();
        } else if (theBoard.isWhite((nme2[i].findEnemyx()), nme2[i].findEnemyy()+ theBoard.getSquareSizeY()/2.9) || (theBoard.isWhite((nme2[i].findEnemyx()), nme2[i].findEnemyy()-  theBoard.getSquareSizeY()/2.9)))
        {
            nme2[i].changeYDir();
        }
        nme2[i].move();
        nme2[i].display();
    }
}

function checkBlacks()
{

    for (i=0; i<blacks; i++)
    {
        if ((nme3[i].findEnemyx()>=plyr.playerX() && nme3[i].findEnemyx() <= plyr.playerX()+plyr.playerSizeX())&&(nme3[i].findEnemyy()>=plyr.playerY() && nme3[i].findEnemyy() <= plyr.playerY()+plyr.playerSizeY()))
        {
            plyr.lostLife();
            theBoard.lostLife();
        }

        if (nme3[i].findEnemyx() <= 0 || nme3[i].findEnemyx() >= width-nme3[i].getRad()+7)
        {
            nme3[i].changeXDir();
        }
        if (nme3[i].findEnemyy() <= 0 || nme3[i].findEnemyy() >= height-nme3[i].getRad()+7)
        {
            nme3[i].changeYDir();
        }
        if (theBoard.isVulnerable(nme3[i].findEnemyx(), nme3[i].findEnemyy()))
        {
            plyr.lostLife();
            theBoard.lostLife();
        }
        nme3[i].move();
        nme3[i].display();
    }
}


function draw()
{
    background(255);
    if (plyr.getLives() == 0)
    {
        alive = false;
    }
    if (state === 'h')
    {
        theBoard.display();
        fill(255, 255, 255);
        square(20.5, 20.5, 700, 700);
        fill(0, 0, 0);
        textSize(32);
        text('Welcome to Fill It In!', 215, 60);
        textSize(18.3);
        text('The objective of this game is to fill the entire board of white squares into solid blue.\nYou turn white squares into blue ones by going over them.\nDont let the circle touch you or your light blue trail.\nThe light blue trail will become solid blue when you touch another dark blue square.\nYou have three lives!\nTry to complete as many levels as you can with only three lives!', 38, 90);
        text('Red enemies stays inside the white area.\nGreen enemies stays inside the blue area.\nBlack enemies can go anywhere!', 38, 270);
        textSize(50);
        text('HAVE FUN!', 225, 400);
    }
    if (alive)
    {
        if (state === '1')
        {

            theBoard.findW(plyr.playerX()+plyr.playerSizeX()/2, plyr.playerY()+plyr.playerSizeY()/2);
            theBoard.findB(plyr.playerX()+plyr.playerSizeX()/2, plyr.playerY()+plyr.playerSizeY()/2);
            theBoard.display();
            checkBlacks();
            checkReds();
            checkGreens();


            plyr.display(img);
            plyr.move();
            textSize(30);
            fill(0, 0, 0);
            text((int)(theBoard.count()*100)+'%', 25, 25);
            text('lives:' + plyr.getLives(), 400, 25);
            text("level: " +levels, 250, 25);
            if (theBoard.count() >= 0.90)
            {
                state = 'a';
            }
        }
        if (state === 'a')
        {
            theBoard.display();
            fill(255, 255, 255);
            square(37.5, 37.5, 674, 674);
            fill(0, 0, 0);
            textSize(33);
            text('You are at level' + levels, 50, 300);
            text('it gets much harder from here on out', 50, 350);
            text('To Continue press the Space bar!!', 50, 400);
        }
        if (state === '2')
        {


            theBoard.findW(plyr.playerX()+plyr.playerSizeX()/2, plyr.playerY()+plyr.playerSizeY()/2);
            theBoard.findB(plyr.playerX()+plyr.playerSizeX()/2, plyr.playerY()+plyr.playerSizeY()/2);
            theBoard.display();


            checkReds();
            checkGreens();
            checkBlacks();

            plyr.display(img);
            plyr.move();
            textSize(30);
            fill(0, 0, 0);
            text((int)(theBoard.count()*100)+'%', 25, 25);
            text('lives:' + plyr.getLives(), 400, 25);
            text("level: " +levels, 250, 25);
            if (theBoard.count() >= 0.90)
            {
                state = 'b';
            }
        }
        if (state === 'b')
        {
            theBoard.display();
            fill(255, 255, 255);
            square(37.5, 37.5, 674, 674);
            fill(0, 0, 0);
            fill(0, 0, 0);
            textSize(28);

            text('You are at level' + levels, 50, 300);
            text('Ready the next challenge??', 50, 350);
            text('To Continue press the Space bar!!', 50, 400);
        }
        if (state === '3')
        {



            theBoard.findW(plyr.playerX()+plyr.playerSizeX()/2, plyr.playerY()+plyr.playerSizeY()/2);
            theBoard.findB(plyr.playerX()+plyr.playerSizeX()/2, plyr.playerY()+plyr.playerSizeY()/2);
            theBoard.display();

            checkReds();
            checkGreens();
            checkBlacks();


            plyr.display(img);
            plyr.move();
            textSize(30);
            fill(0, 0, 0);
            text((int)(theBoard.count()*100)+'%', 25, 25);
            text('lives:' + plyr.getLives(), 400, 25);
            text("level: " +levels, 250, 25);
            if (theBoard.count() >= 0.90)
            {
                state = 'w';
            }
        }
        if (state === 'w')
        {
            theBoard.display();
            fill(255, 255, 255);
            square(37.5, 37.5, 674, 674);
            fill(0, 0, 0);
            textSize(40);
            text('you are at level' + levels, 50, 300);
            textSize(33);
            text('Remember to support Games for food \nany small donation will help a family in need! \n \-Diego Messmacher', 50, 400);
        }
    } else //he dead
    {
        clear();
        theBoard.display();
        fill(255, 255, 255);
        square(37.5, 37.5, 674, 674);
        fill(0, 0, 0);
        textSize(32);
        text('You have lost all 3 lives, better luck next time', 50, 300);
        text('You reached level ' + levels, 50, 350);
        textSize(32);
        text('press space to try again', 50, 400);

        if(!savedScore)
        {
            let url = '/savefill';

            let postData = 'Fill It In,' + str(levels);
            savedScore = true;
            httpPost(url, 'text', postData);
        }
    }
}

function loadNME()
{
    nme = [];
    nme2 = [];
    nme3 = [];
    for (i = 0; i < reds; i++)
    {
        nme[i] = new Enemy1(random(150, 350), random(100, 350));
        nme[i].setXSpeed(4.5);
        nme[i].setYSpeed(3);
    }
    for (i = 0; i < greens; i++)
    {
        nme2[i] = new Enemy2(random(1, 5), random(1, 5));
    }
    for (i = 0; i < blacks; i++)
    {
        nme3[i] = new Enemy3(random(150, 350), random(150, 350));
        nme3[i].setXSpeed(4.5);
        nme3[i].setYSpeed(3);
    }
}
function keyPressed()
{
    if (state === 'h')
    {
        if (keyIsDown(32))
        {
            levels = 1;
            theBoard.reset();
            state = '1';
            reds = 1;
            greens = 0;
            blacks = 0;
            loadNME();
            savedScore = false;
        }
    }
    if (state === 'a')
    {
        if (keyIsDown(32))
        {
            greens += 1;
            levels +=1;
            theBoard.reset();
            plyr.reset();
            loadNME();
            state = '2';
        }
    }

    if (state === 'b')
    {
        if (keyIsDown(32))
        {
            blacks += 1;
            levels += 1;
            theBoard.reset();
            plyr.reset();
            loadNME();
            state = '3';
        }
    }
    if (state === 'w')
    {
        if (keyIsDown(32))
        {
            reds += 1;
            levels +=1;
            theBoard.reset();
            plyr.reset();
            loadNME();
            state = '1';
        }
    }
    if (!alive)
    {
        if (keyIsDown(32))
        {
            state = 'h';
            alive = true;
            theBoard.reset();
            plyr.reset();
            plyr.resetLives();
        }
    }
}
