let rock;
let homescreen = true;
let playing;
let instructions;
let gameover;
let nightsky;
let playingp;
let bullets;
let ammospawn;
let timePassed;
let score;
let savedscore;
function setup() {
    savedscore = false;
    createCanvas(1000, 700);
    rock = new rocket();
    asts = new asteroids();
    ammo1 = new ammo();
    nightsky = loadImage("gamecode/rocketdodger/nightsky.gif");

    bullets = [];
    ammospawn = new spawnAmmo();
    aliens = new ufos();
    timePassed = 0;

}



function draw() {

    if (homescreen == true)
    {
        clear();
        background(nightsky);
        textSize(40);
        textAlign(CENTER, TOP);
        fill(0, 255, 0);
        text('Welcome to Asteroid Dodgers', 500, height/4 );
        textSize(25);
        textAlign(CENTER, BOTTOM);
        fill(0, 255, 0);
        text('Survive as long as you can without getting hit by an asteroid', 500, height/2);
        textSize(25);
        fill(0, 255, 0);
        textAlign(CENTER, BOTTOM);
        text('Press "i" for instructions and controls\nPress the spacebar to begin the game', 500, 550);

        if (keyCode === 73)
        {
            homescreen = false;
            instructions = true;
        }
        if (keyCode === 32)
        {
            homescreen = false;
            playing = true;
        }
    }
    if (instructions == true)
    {
        clear();
        background(nightsky, 255);

        textSize(40);
        textAlign(CENTER, TOP);
        fill(0, 255, 0);
        text('Controls', 500, height/4);
        textSize(32);
        textAlign(CENTER);
        text('Press the arrow keys (left and right) to move around in the night sky.\nPress the space bar to shoot bullets at the asteroids.\nEvery asteroid destroyed is an additional X points', 500, height/2);
        textSize(24);
        textAlign(CENTER);
        fill(0, 255, 0);
        text('Press "h" to go back to the homescreen.\nPress spacebar to begin the game', 500, height/1.4);

        if (keyCode === 72)
        {
            homescreen = true;
            instructions = false;
        }

        if (keyCode === 32)
        {
            instructions = false;
            playing = true;
        }
    }

    if (playing == true) {
        background(nightsky);
        timePassed += 100;
        textSize(20);
        textAlign(CENTER);
        fill(0,255,0);
        score = timePassed/100;
        text('Score: ' + round(score, 0), width*0.90, 50);
        text('Ammo: ' + rock.bullets, width*0.9, 75);

        for (let i = 0; i < bullets.length; i++)
        {
            if (bullets[i].posy < 0)
            {
                bullets.splice(i, 1);
            }
        }
        rock.move();
        rock.display();
        asts.update(rock);
        asts.display();
        ammospawn.display(rock);
        aliens.display();



        for (let i = 0; i < bullets.length; i++)
        {
            bullets[i].move();
            bullets[i].display();
            asts.bollision(bullets[i]);

        }
        for (let i = 0; i < bullets.length; i++)
        {
            aliens.bollision(bullets[i]);
        }

    }
    if (gameover == true)
    {
        clear();
        background(nightsky);
        rock.bullets = 5;
        rock = new rocket();
        asts= new asteroids();
        textSize(52);
        textAlign(CENTER);
        text('GAME OVER', 500, height/4);
        textSize(32);
        textAlign(CENTER);
        fill(0, 255, 0);
        text('Press\n"h" to go back to the homepage\nSpacebar to restart game\n"i" for instructions page', 500, height/2);
        text('Score: ' + round(timePassed/100,0), width/2 , height- height*0.25);

        if(!savedscore)
        {
            let url = '/saverocket';
            let postData = 'Rocket Dodger,' + str(score);
            savedScore = true;
            httpPost(url, 'text', postData);
        }

        if (keyCode === 72)
        {
            homescreen = true;
            gameover = false;
        }

        if (keyCode === 73)
        {
            instructions = true;
            gameover = false;
        }
    }
}
function keyPressed()
{
    if (keyCode === 32 && playing && rock.bullets > 0)
    {
        bullets.push(new bullet(rock.posx + rock.leng/2, rock.posy));
        rock.bullets -=1;
    }
    if (keyCode === 32 && gameover)
    {
        gameover = false;
        playing = true;
        savedScore = false;
        timePassed = 0;
        bullets = [];
        ammospawn = new spawnAmmo();
        aliens = new ufos();
        asts = new asteroids();
    }
}
