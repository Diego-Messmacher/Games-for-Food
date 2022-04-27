var start = true;
let use;
var alive;
let rows=[];
var rand;
var scorepass;
var score=0;
let deadJim;

let saveScore;

function setup()
{
    createCanvas(700, 700);
    background(40);
    deadJim= loadImage("gamecode/jimbo/deadJimbo.png");
    reset();
    saveScore = false;
}

function reset()
{
    scorepass=635;


    rows = [];
    use = new User();

    for (let i=0; i<10; i++)
    {

        rand = int(random(0, 10));
        while (i !=0 && rand ==9 && rows[i-1].numb==3)
        {
            rand= int(random(0, 10));
        }

        if (rand>=0 && rand<5)
        {
            rows.push(new CarRow(0, (i*65), width, 62));
        }

        if (rand>4 && rand<9)
        {
            rows.push(new TransporterRow(0, (i*65), width, 62));
        }

        if (rand>=9)
        {

            rows.push(new TreeRow(0, (i*65), width, 62, int(random(0, 10))));
        }
    }

    alive = true;
}

function draw()
{

    if (use.posy<=scorepass)
    {
        scorepass=scorepass-65;
        score++;
    }
    if (start==true)
    {
        textSize(40);
        text('Welcome to Jimbo Crossing', width/6, height/4 );
        fill(0, 102, 153);
        //image(coverimg, 185, 75, 300, 200);

        textSize(25);
        text('Get as far as you can without getting hit by a car, \n running into the lava, or falling into the dangerous water.\n When you start the game, move in any direction \n to choose your map. In the middle of the game, \n you can press space to reset the game and come \n back to the map chooser.', width/22, height/2.5);
        fill(247, 27, 27);
        textSize(25);
        text('Press the spacebar to begin the game', width/6, 550);
        fill(109, 224, 75);
    }

    if (start==false && alive==true)
    {
        saveScore = false;
        clear();
        background(100);
        fill(255, 255, 255);


        for (let i =0; i<rows.length; i++)
        {
            if (rows[i].numb==1)
            {

                rows[i].update();

                rows[i].display();
            }

            if (rows[i].numb==2)
            {
                rows[i].update();
                rows[i].collision(use);
                rows[i].display();
            }

            if (rows[i].numb==3)
            {
                rows[i].display();
            }
            if (rows[i].collision(use) == true)
            {
                alive=false;
            }
        }

        use.move();
        use.display();
        advance();
        textSize(30);
        text('Score: ' + score, width-150, height -16);
    } else if (alive==false)
    {
        clear();
        background(120);
        fill(255, 196, 196);
        textSize(40);
        text('You are dead. Your Score was ' + score + '\n Press space to try again', width/8, height/4);
        image(deadJim, 215, 400, 250, 250);

        if(!saveScore)
        {
            let url = '/savejump';
            //data to send to Ruby route
            let postData = 'Jimbo Crossing,' + score;
            saveScore = true;
            httpPost(url, 'text', postData);
        }
    }


}


function keyPressed()
{
    if (keyCode === 32)
    {
        start=false;
        reset();
        score=0;
        keyCode = 0;
    }
}

function advance()
{
    if (use.posy<0)
    {
        reset();
    }
}

function userPos(User)
{
    for (let i=0; i<rows.length; i++)
    {
        if (User.posy <rows[i].rowy && User.posy + User.heig > rows[i].rowy+rows[i].heig)
        {
            return 10-i;
        }
    }
}
