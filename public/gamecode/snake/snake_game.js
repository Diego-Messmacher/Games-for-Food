var s;
var scl = 20;

var timerValue = 5;
var startButton;
var startTime = 5;

let saveScore;


var food;
let status;  //start page, instructions, alive, gameover

function setup() {
    createCanvas(600, 640);
    s = new Snake();
    frameRate(10);
    pickLocation();
    status = "homepage";
    saveScore = false;
    setInterval(timeIt, 1000);

    var options = { preventDefault: true};
    var hammer = new Hammer(document.body, options);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL});
    hammer.on("swipe", swiped);
}


function draw() {
    if (status === "homepage")
    {
        background(51);
        fill(255, 255, 204);
        textSize(24);
        textFont("Calibri");
        textAlign(CENTER, CENTER);
        text("Welcome to the Snake Game.\nPress i to see instructions, press Spacebar to start.", 300, 300);
        if (keyCode === 32)
        {
            status = "alive";
        }
        if (keyCode === 73)
        {
            status = "instructions";
        }
    }
    if (status === "instructions")
    {
        background(51);
        fill(255, 255, 204);
        textSize(20);
        textFont("Calibri");
        textAlign(CENTER, CENTER);
        text("Instructions\n\nUse the arrow keys to move in the wanted direction.\nEat apples to grow in size\nEach apple eaten is one point added. \n\n Press h to go back to the home page.", 300, 300);
        if (keyCode === 72)
        {
            status = "homepage";
        }
    }
    if (status === "alive")
    {
        saveScore = false;
        background(51);

        speed();

        if (s.eat(food))
        {
            pickLocation();
        }

        s.death();
        s.update();
        s.show();


        if (timerValue == 0 && s.score >= 5) {


            pickLocation();
            fill(255, 0, 75);
            rect(food.x, food.y, scl, scl);
        }
        else
        {
            fill(255, 0, 75);
            rect(food.x, food.y, scl, scl);

        }
        scoreboard();
    }

    if (status === "gameover")
    {
        textSize(18);
        textFont("Calibri");
        textAlign(CENTER, CENTER);
        text("You Died! Press spacebar to restart. \n Press h to go to the homepage", 300, 300);

        if(!saveScore)
        {
            let url = '/savesnake';
            //data to send to Ruby route
            let postData = 'Snake,' + s.score;
            saveScore = true;
            httpPost(url, 'text', postData);
        }
        let rand = random(4);
        if (keyCode === 32)
        {
            if (rand === 0)
            {
                s.xspeed = 1;
                s.yspeed = 0;
            } else if (rand === 1)
            {
                s.xspeed = -1;
                s.yspeed = 0;
            } else if (rand === 2)
            {
                s.yspeed = 1;
                s.xspeed = 0;
            } else if (rand === 3)
            {
                s.yspeed = -1;
                s.xspeed = 0;
            }
            status = "alive";
            s.x = 300;
            s.y = 300;
            s.score = 0;
        }
        if (keyCode === 72)
        {
            status = "homepage";
        }
    }
}

function pickLocation() {
    var cols = floor(600/scl);
    var rows = floor(600/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

    // Check the food isn't appearing inside the tail

    for (var i = 0; i < s.tail.length; i++) {
        var pos = s.tail[i];
        var d = dist(food.x, food.y, pos.x, pos.y);
        if (d < 1) {
            pickLocation();
        }
    }
}

function speed()
{
    if (s.score === 0 || s.score === 1)
    {
        frameRate(10);
    }

    if (s.score === 5)
    {
        frameRate(12);
    }
    if (s.score === 10)
    {
        frameRate(14);
    }

    if (s.score === 15)
    {
        frameRate(18);
    }

    if (s.score === 20)
    {
        frameRate(22);
    }

    if (s.score === 25)
    {
        frameRate(26);
    }
}

function touchStarted()
{
    if(status === "homepage")
    {
        status = "alive";
    }
    else if (status === "gameover" && saveScore)
    {
        let rand = random(4);
        if (rand === 0)
        {
            s.xspeed = 1;
            s.yspeed = 0;
        } else if (rand === 1)
        {
            s.xspeed = -1;
            s.yspeed = 0;
        } else if (rand === 2)
        {
            s.yspeed = 1;
            s.xspeed = 0;
        } else if (rand === 3)
        {
            s.yspeed = -1;
            s.xspeed = 0;
        }
        status = "homepage";
        s.x = 300;
        s.y = 300;
        s.score = 0;
    }
}

function swiped(event) {
    if(status === "alive")
    {
        if (s.score > 1)
        {
            if(event.direction == 2 && s.xspeed != 1) //left
            {
                s.dir(-1, 0);
            }
            else if(event.direction == 4 && s.xspeed != -1) //right
            {
                s.dir(1, 0);
            }
            else if(event.direction == 8 && s.yspeed != 1) //up
            {
                s.dir(0, -1);
            }
            else if(event.direction == 16  && s.yspeed != -1) //down
            {
                s.dir(0, 1);
            }
        }
        else
        {
            if(event.direction == 2) //left
            {
                s.dir(-1, 0);
            }
            else if(event.direction == 4) //right
            {
                s.dir(1, 0);
            }
            else if(event.direction == 8) //up
            {
                s.dir(0, -1);
            }
            else if(event.direction == 16) //down
            {
                s.dir(0, 1);
            }
        }
    }
}

function keyPressed()
{
    if (s.score > 1)
    {
        if (keyCode === UP_ARROW && s.yspeed != 1)
        {
            s.dir(0, -1); //yspeed = -1
        } else if (keyCode === DOWN_ARROW && s.yspeed != -1)
        {
            s.dir(0, 1);  //yspeed = 1
        } else if (keyCode === RIGHT_ARROW && s.xspeed != -1)
        {
            s.dir(1, 0); // xspeed = 1
        } else if (keyCode === LEFT_ARROW && s.xspeed != 1)
        {
            s.dir(-1, 0); //xspeed = -1
        }
    } else
    {
        if (keyCode === UP_ARROW)
        {
            s.dir(0, -1); //yspeed = -1
        } else if (keyCode === DOWN_ARROW)
        {
            s.dir(0, 1);  //yspeed = 1
        } else if (keyCode === RIGHT_ARROW)
        {
            s.dir(1, 0); // xspeed = 1
        } else if (keyCode === LEFT_ARROW)
        {
            s.dir(-1, 0); //xspeed = -1
        }
    }
}

function scoreboard() {
    fill(0);
    rect(0, 600, 600, 40);
    fill(255);
    textFont("Calibri");
    textSize(18);
    text("Score:  ", 40, 625);
    text("Highscore: ", 480, 625);
    text(s.score, 70, 625);
    text(s.highscore, 530, 625);
}

function timeIt() {
    if (timerValue > 0) {
        timerValue--;
    } else if (timerValue == 0)
    {
        timerValue = startTime;
    }
}
