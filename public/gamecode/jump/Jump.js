let canvy = 500;
let canvx = 500;

let savedScore;

let displayScoreUpdate;

let nme;
let plyr;
let kill;
let scoreNumber;

let array = [];
let arrayKill = [];
let arrayMoveKill = [];

let arrSize = 9;
let killSize = 5;

let tophit = false;
let dead = false;

let y = canvy + 20;
let x;
let yK = canvy;

var play = true;

var action = "home";

function setup()
{
    createCanvas(canvx, canvy);

    background(0); // create black background

    plyr = new Player(); // create Player obj

    savedScore = false;
    displayScoreUpdate = false;
    scoreNumber = new Score();
    nme = new Enemy(250, 470);
    array.push(nme);

    creatArray();
    creatKillers();
}

let touching;

function touchStarted()
{
    touching = true;

    if(action == "home")
    {
        if(mouseX > 0 && mouseX < canvx && mouseY > 0 && mouseY < canvy)
        {
            action = "start";
            savedScore = false;
            displayScoreUdpate = false;
        }
    }
    else if (action == "dead")
    {
        if(mouseX > 0 && mouseX < canvx && mouseY > 0 && mouseY < canvy)
        {
            //must delete arrays and creat new then call function in setup
            for (let i = 0; i < array.length; i++)
            {
                array.splice(i, array.length);
            }

            for (let j = 0; j < arrayKill.length; j++)
            {
                arrayKill.splice(j, arrayKill.length);
            }

            y = canvy + 20;
            yK = canvy;

            plyr = new Player(); // create Player obj

            scoreNumber = new Score();

            creatArray();
            creatKillers();

            action = "home";
        }
    }
}

function touchEnded()
{
    touching = false;
}


function draw()
{
    if (action == "home")
    {
        background(0);
        textSize(32);
        textAlign(LEFT);
        text('Welcome', 180, 200);
        text('Press Space To Begin ', 100, 250);
        text('Press "i" For Instructions ', 100, 290);
        fill(255, 0, 0);

        if (keyIsDown(32))
        {
            action = "start";
            savedScore = false;
            displayScoreUdpate = false;
        }
        if (keyIsDown(73))
        {
            action = "ins";
        }
    }

    if (action == "ins")
    {
        background(0);
        textSize(23);
        textAlign(LEFT);
        text('Instructions:', 50, 80);
        text('You are the red square and can',10, 130);
        text('move side to side using the arrow keys. ', 10, 170);
        text('The green rectangles are platforms. ', 10, 210);
        text('You can bounce on them.', 10, 250);
        text('The goal is to get as far as possible. ', 10, 290);
        text('Beware of the blue squares, they will kill you.', 10, 330);
        text('Unless you bounce on top of them.', 10, 370);
        text('This gets you extra points. ', 10, 410);
        text('Press Space To Begin ', 100, 450);
        fill(255, 0, 0);


        if (keyIsDown(32))
        {
            action = "start";
            savedScore = false;
            displayScoreUdpate = false;
        }
    }



    if (action == "start")
    {
        if(touching)
        {
            if( mouseX < canvx / 2)
            {
                plyr.x -= 3.5;
            }
            else if (mouseX > canvx / 2)
            {
                plyr.x += 3.5;
            }
        }


        background(0);
        isValid();

        collideEnemy();
        collideKillers();

        plyr.display();
        plyr.move();

        plyr.updatePos();
        if ((plyr.y - 14) > canvy)
        {
            endGame();
        }
        plyr.resety(canvy);
        plyr.resetx(canvx);

        displayArray();
        displayKillers();

        updateScreen();
        moveKillers();

        scoreNumber.display();
        updateScore();
    }

    if (action == "dead")
    {
        background(0);
        textSize(32);
        textAlign(LEFT);
        text('Game Over', 140, 250);
        playAgain();
        text('Press space to start again', 80, 300);
        textAlign(LEFT);
        text('Score: ' + scoreNumber.score, 150, 340);
        fill(0, 255, 0);

        if(!savedScore)
        {
            let url = '/savejump';
            //data to send to Ruby route
            let postData = 'Square Jump,' + str(scoreNumber.score);
            savedScore = true;
            httpPost(url, 'text', postData);
        }
    }
}

function collideEnemy() // checks the collision of the platforms
{
    if (plyr.yspeed > 0)
    {
        for (let i = 0; i < array.length; i++)
        {
            if ((array[i].xpos + array[i].w >= plyr.x && array[i].xpos <= plyr.x + plyr.sizeX) && (array[i].ypos >= plyr.y && array[i].ypos <= plyr.y + plyr.sizeY))
            {
                plyr.changedirection();
            }
        }
    }
}


function collideKillers()  // checks the collision with the enemy
{
    if (checkTop() == true)
    {
        plyr.changedirection();
    }

    if ( checkLeft() == true || checkRight() == true || checkBottom() == true )
    {
        endGame();
    }
}
function checkTop()  // checks top collision
{
    for (let i = 0; i < arrayKill.length; i++)
    {
        if ((arrayKill[i].xpos + arrayKill[i].sizeX >= plyr.x && arrayKill[i].xpos <= plyr.x + plyr.sizeX) && (arrayKill[i].ypos >= plyr.y && arrayKill[i].ypos <= plyr.y + plyr.sizeY))
        {
            arrayKill[i].visable = false;
            scoreNumber.score += 100;
            return true;
        }
    }
}


function checkLeft() //checks bottom collision
{
    for (let i = 0; i < arrayKill.length; i++)
    {
        if (((plyr.x > arrayKill[i].xpos) && (plyr.x < (arrayKill[i].xpos + arrayKill[i].sizeX))) && ((plyr.y > arrayKill[i].ypos) && (plyr.y < (arrayKill[i].ypos + arrayKill[i].sizeY))))
        {
            return true;
        }
    }
}
function checkRight() //checks bottom collision
{
    for (let i = 0; i < arrayKill.length; i++)
    {
        if ((((plyr.x + plyr.sizeX) > arrayKill[i].xpos) && ((plyr.x + plyr.sizeX) < (arrayKill[i].xpos + arrayKill[i].sizeX))) && ((plyr.y > arrayKill[i].ypos) && (plyr.y < (arrayKill[i].ypos + arrayKill[i].sizeY))))
        {
            return true;
        }
    }
}
function checkBottom()
{
    for (let i = 0; i < arrayKill.length; i++)
    {
        if ((arrayKill[i].xpos + arrayKill[i].sizeX >= plyr.x && arrayKill[i].xpos <= plyr.x + plyr.sizeX) && (arrayKill[i].ypos + arrayKill[i].sizeY >= plyr.y && arrayKill[i].ypos <= plyr.y))
        {
            return true;
        }
    }
}

function playAgain()
{
    if (keyIsDown(32))
    {
        //must delete arrays and creat new then call function in setup
        for (let i = 0; i < array.length; i++)
        {
            array.splice(i, array.length);
        }

        for (let j = 0; j < arrayKill.length; j++)
        {
            arrayKill.splice(j, arrayKill.length);
        }

        y = canvy + 20;
        yK = canvy;

        plyr = new Player(); // create Player obj

        scoreNumber = new Score();

        creatArray();
        creatKillers();

        action = "home";
    }
}


function creatArray() // creates array of Enemy objects
{
    for (let i = 0; i < arrSize; i++)
    {
        x = (int) (random(0, 450));
        let paltform;

        platform = new Enemy(x, y);
        array.push(platform);
        y -= 62.5;
    }
}

function isValid()
{
    for (let i = 0; i < array.length-1; i++)
    {
        while (((array[i+1].xpos < array[i].xpos+70)&& (array[i+1].xpos > array[i].xpos)) || ((array[i+1].xpos > array[i].xpos-50)&&(array[i+1].xpos < array[i].xpos+20)))
        {
            array[i+1].xpos = (int) (random(0, 450));
        }
    }
}


function creatKillers()
{
    for (let i = 0; i < killSize; i++)
    {
        xK = (int) (random(0, 450));
        //yK = 500;//array[i-1].ypos - 167;
        yK -= 100;
        let killer;
        killer = new Killers(xK, yK);
        arrayKill.push(killer);
    }
}


function updateScreen() //if Enemy is not on the screen remove and creat a new one
{
    if (plyr.y < 200)
    {
        plyr.y +=5;
        let xnew = (int) (random(0, 450));
        let ynew = y - 100;

        for (let i = 0; i < array.length; i++)
        {
            array[i].ypos += 5;
            if (array[i].ypos > 500)
            {
                array[i].ypos = ynew;
                array[i].xpos = xnew;
            }
        }


        for (let i = 0; i < arrayKill.length; i++)
        {
            arrayKill[i].ypos += 5;
            if (arrayKill[i].ypos > 500 )
            {
                arrayKill[i].ypos = 0;
                arrayKill[i].xpos = (int) (random(0, 450));
                arrayKill[i].visable = true;
            }
        }
    }
}

function displayArray()
{
    for (let i = 0; i < array.length; i++)
    {
        array[i].display();
    }
}
function displayKillers()
{
    for (let i = 0; i < arrayKill.length; i++)
    {
        if ( arrayKill[i].visable == true )
        {

            arrayKill[i].display();
        }
    }
}

function moveKillers()
{
    for (let i = 0; i < arrayKill.length; i++)
    {
        if (i % 2 != 0)
        {
            arrayKill[i].xpos += 2;
            if (arrayKill[i].xpos > 500)
            {
                arrayKill[i].xpos = 0;
            }
        }
    }
}


function endGame()
{
    action = "dead";
}

function updateScore()
{
    if (plyr.yspeed < 0)
    {
        scoreNumber.score += 1;
    } else
    {
        scoreNumber.score -= 1;
    }

    if (scoreNumber.score < 0)
    {
        scoreNumber.score = 0;
    }
}



function checkXCrazy()
{
    for (let i = 1; i <= arrSize; i++)
    {
        if ((array[i].xpos - 10 > array[i-1].xpos) || (array[i].xpos + 60 < array[i-1].xpos))
        {
            x = (int) (random(0, 500));
            array[i].xpos = x;
        }
    }
}
