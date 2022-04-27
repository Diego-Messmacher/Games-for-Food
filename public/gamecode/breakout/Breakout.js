//the game objects
let balls;
let bSize;
let bSpeedMin;
let bSpeedMax;
let paddle;
let paddleWidth;
let pwperc;
let paddleHeight;

let score;

//brick data
let bricks;
let brickWidth;
let brickHeight;
let bricksPerRow;

let powerups;
let reversed;
let reversedFrames = 1000;
let reverseTime;

let gameOver; //is the game over or not?
let data; //read from level files
let icons;

let gameState; //start, playing, gameover, paused, instructions
let MAX_LEVEL = 8;
let level = 1;


var yellow;
var orange;
var greenColor;
var redColor;
var violet;

var brickColors;
var brickPoints;

let doneLoading = false;
let loadTime = 3;
let timer = 0;

let savedScore;

let parentDiv = document.getElementById("drawArea");
let cnv;

function preload()
{
    data =  loadStrings('gamecode/breakout/levels/' + level + '.lvl');
    icons = {};
    icons['splitBall'] = loadImage('gamecode/breakout/imgs/SplitIcon.png');
    icons['reverse'] = loadImage('gamecode/breakout/imgs/Reverse.png');
}
function setup()
{
    yellow = color(255, 255, 0);
    orange = color(255, 150, 0);
    greenColor = color(0, 255, 0);
    redColor = color(255, 0, 0);
    violet = color(155, 0, 255);

    brickColors = [greenColor, yellow, orange, redColor, violet];
    brickPoints = [1, 2, 3, 5, 7];

    cnv = createCanvas(parentDiv.offsetWidth, .75 * parentDiv.offsetWidth);
    cnv.parent("drawArea");
    background(75);

    gameState = "start";
    score = 0;
    bricks = [];
    bSpeedMin = 2;
    bSpeedMax = 4;

    pwperc = .10;
    paddleWidth = pwperc * width;
    paddleHeight = 15;

    reversed = false;
    reverseTime = 0;
    savedScore = false;
}

function windowResized()
{
    resizeCanvas(parentDiv.offsetWidth, .75 * parentDiv.offsetWidth);
}

function draw() {
    background(75);

    if (gameState === "start")
    {
        savedScore = false;
        score = 0;
        let welcomeText = "Breakout";
        fill(0, 255, 0);
        noStroke();
        textAlign(CENTER);
        textSize(36);
        text(welcomeText, width / 2, height / 2);
        textSize(20);
        let msg = 'Press "i" for instructions or the Spacebar to begin!';

        text(msg, width / 2, height / 2 + 50);
    } else if (gameState === "playing")
    {
        //draw the game objects
        paddle.display();
        displayBalls();
        displayBricks();
        displayPowerUps();

        textAlign(LEFT);
        stroke(0);
        strokeWeight(2);
        fill(0, 255, 0);
        textSize(32);
        //show at bottom right
        let stxt = "Score: " + score;
        text(stxt, width - 7 - textWidth(stxt), height - 15);

        //update the game objects
        for (let i = balls.length - 1; i >= 0; i--)
        {
            paddle.update(balls[i]);
            balls[i].update();
            updateBricks(balls[i]);
            if (balls[i].dead)
                balls.splice(i, 1);
        }
        updatePowerUps(paddle);

        if (balls.length == 0)
            gameState = "gameover";

        if (bricks.length == 0)
        {
            gameState = "loading";
            //finished level
            level++;
            if (level > MAX_LEVEL)
            {
                level = 1;
                bSpeedMin *= 1.5;
                bSpeedMax *= 1.25;
            }
            doneLoading = false;
            data = loadStrings('gamecode/breakout/levels/' + level + '.lvl', function() {
                doneLoading = true;
            }
                              );
        }
    } else if (gameState === "paused")
    {
        //draw the game objects
        paddle.display();
        displayBalls();
        displayBricks();
        displayPowerUps();

        fill(100, 200);
        noStroke();
        rect(0, 0, width, height);
        noStroke();
        fill(0, 255, 0); //pick text color
        fill(0, 255, 0);
        textSize(30); //pick text size
        textAlign(CENTER); //center text on x, y
        text("PAUSE", width / 2, height / 2);
    } else if (gameState === "instructions")
    {
        fill(0, 255, 0);
        noStroke();
        textSize(30); //pick text size
        textAlign(CENTER); //center text on x, y
        text("How to Play", width / 2, 60);

        let message = "Try to score as high as possible by breaking the bricks with your bouncing ball.\n";
        message += "Occasionally, bricks will drop power ups!\n";
        message += "Be careful though, as power downs will also appear.\n\n";
        message += "Good Luck!!!\n";

        textSize(16);
        text(message, width / 2, 110);

        textSize(26); //pick text size
        textAlign(CENTER); //center text on x, y
        text("Controls", width / 2, 250);

        textSize(14);
        text("Move the mouse left and right\nto move the paddle.", width / 4, 280);
        textSize(14);
        text("Touch a powerup with your paddle\nto activate it.", width * 3 / 4, 280);

        noFill();
        stroke(0, 255, 0);
        rect(40, 220, width - 70, 100);

        fill(0, 255, 0);

        textSize(20);
        noStroke();
        text("Press the spacebar to go back to the start screen.", width / 2, height - .1 * height);
    } else if (gameState === "loading")
    {
        if (doneLoading && timer >= loadTime)
        {
            resetGame();
            gameState = "playing";
            doneLoading = false;
            timer = 0;
        } else
        {
            if (frameCount % 60 === 0)
                timer++;

            textSize(40);
            textAlign(CENTER);
            noStroke();
            fill(0, 255, 0);
            let msg = "Loading";
            for (var i = 0; i <= timer; i++)
                msg += ".";
            text(msg, width / 2, height / 2);
        }
    } else if (gameState === "gameover")
    {
        noStroke();
        fill(0, 255, 0); //pick text color
        fill(0, 255, 0);
        textSize(30); //pick text size
        textAlign(CENTER); //center text on x, y
        text("GAME OVER!", width / 2, height / 2);
        textSize(28);
        text("Your score was: " + score + "!", width / 2, height / 2 + 40);
        textSize(20);
        text("Press the spacebar to go to the main menu.", width / 2, height / 2 + 75);

        if(!savedScore)
        {
            let url = '/savebreakout';
            let postData = 'Breakout,' + score;
            savedScore = true;
            httpPost(url, 'text', postData);
        }
    }
}

function resetGame()
{
    bricksPerRow = int(data[0]);
    brickWidth = width / bricksPerRow;
    brickHeight = 15;
    bSize = 15;

    loadBricks(data);
    balls = [];
    powerups = [];

    //create a new ball
    let ball = new Ball(bSize);
    ball.x = width / 2;
    ball.y = height / 2;
    ball.speedX = random(2, 4);
    ball.speedY = random(bSpeedMin, bSpeedMax);
    ball.movingRight = random([true, false]);
    balls.push(ball);

    //create a new paddle
    paddle = new Paddle();
    reversed = false;
    reverseTime = 0;
}


function keyReleased()
{
    if (gameState === "start")
    {
        if (key === ' ')
        {
            gameState = "playing";
            resetGame();
        } else if (key === 'i')
        {
            gameState = "instructions";
        }
    } else if (gameState === "playing")
    {
        if (key === 'p')
        {
            gameState = "paused";
        }
    } else if (gameState === "paused")
    {
        if (key === 'p')
        {
            gameState = "playing";
        }
    } else if (gameState === "gameover")
    {
        if (key === ' ')
        {
            level = 1;
            gameState = "start";
        }
    } else if (gameState === "instructions")
    {
        if (key === ' ')
        {
            gameState = 'start';
        }
    }
}

function displayBalls()
{
    for (let bll of balls)
        bll.display();
}

function loadBricks(brickRows)
{
    bricks = [];

    //skip the first row as it is the brick count for the rows
    for (let i = 1; i < brickRows.length; i++)
    {
        let currRow = brickRows[i];
        for (let j = 0; j < currRow.length; j++)
        {
            if (currRow[j] === ' ')
            {
                continue;
            } else
            {
                var brick = new Brick(brickWidth, brickHeight, currRow[j]);
                brick.y = (i-1) * brickHeight;
                brick.x = j * brickWidth;
                bricks.push(brick);
            }
        }
    }
}

function displayBricks()
{
    //for (var i = 0; i < bricks.length; i++)
    for (var brk of bricks)
    {
        //bricks[i].display();
        brk.display();
    }
}

function updateBricks(b)
{
    for (var i = bricks.length - 1; i >= 0; i--)
    {
        bricks[i].update(b);
        if (bricks[i].hit === true)
        {
            let extra = int(.5*balls.length) + int(.75 * b.hitCount);
            score += int(brickPoints[bricks[i].col] + extra);
            bricks.splice(i, 1);
        }
    }
}

function displayPowerUps()
{
    for (let pow of powerups)
    {
        pow.display();
    }
}

function updatePowerUps(bll)
{
    for (let i = powerups.length - 1; i >= 0; i--)
    {
        powerups[i].update(bll);
        if (reversed)
        {
            reverseTime--;
        }
        if (reverseTime <= 0)
        {
            reversed = false;
            reverseTime = 0;
        }

        if (powerups[i].hit)
        {
            powerups.splice(i, 1);
        }
    }
}
