var board;
var xcoord;
var ycoord;
var moveCounter;
var col;
var change;
var start = 0;
var hasLost = false;
var hasWon = false;
var canvasx;
var canvasy;
var boardsize;
let savedScore;
function setup()
{
    savedScore = false;
    canvasx = 550;
    canvasy = 650;
    change = [];
    board = new Array(2);
    //var x = 275;
    createCanvas(canvasx, canvasy);
    background(255);
    moveCounter = 0;
    boardsize = 22;
}

function draw()
{
    print("DISPLAY");
    background(0);
    if (start === 0)
    {
        background(41, 100, 170);
        displayTopBox();
        //displayBottomBox();
        fill(255);

        //var starttext = "Welcome to FLOOD IT! Your goal is to fill"  + '\n' + "the whole board with one color." + '\n' +
        //  "When you select a color, it will turn the tile in the"  + '\n' + "top left corner to the color you select and" + '\n' + "merge all tiles that were the top left corner's color that are" + '\n' +
        //  "connected to the top left corner" + '\n' + "with the tiles of your selected color." + '\n' + "Choose your settings and click the button to begin.";

        var starttext = "Choose your board size above and" + '\n' + "select 'Begin' to start the game.";
        textSize(height*0.035);
        textAlign(CENTER);
        text(starttext, width/2, height*(4/7));

        textSize(height*0.035);
        fill(0, 0, 0);

        if (mouseX > 125 && mouseX < 225 && mouseY > height/10 && mouseY< height/10 + 100 && boardsize != 14)
        {
            fill(255, 255, 255);
            var fourteen = "14 X14";
            text(fourteen, 175, height/10 + 60);
            fill(0, 0, 0);
        } else
        {
            var fourteen = "14 X14";
            text(fourteen, 175, height/10 + 60);
        }

        if (mouseX > 225 && mouseX < 325 && mouseY > height/10 && mouseY< height/10 + 100 && boardsize != 22 && boardsize != 0)
        {
            fill(255, 255, 255);
            var twentytwo = "22 X 22";
            text(twentytwo, 275, height/10 + 60);
            fill(0, 0, 0);
        } else
        {
            var twentytwo = "22 X 22";
            text(twentytwo, 275, height/10 + 60);
        }

        if (mouseX > 325 && mouseX < 425 && mouseY > height/10 && mouseY< height/10 + 100 && boardsize != 30)
        {
            fill(255, 255, 255);
            var thirty = "30 X 30";
            text(thirty, 375, height/10 + 60);
            fill(0, 0, 0);
        } else
        {
            var thirty = "30 X 30";
            text(thirty, 375, height/10 + 60);
        }

        if (mouseX > 125 && mouseX < 225 && mouseY > 165 && mouseY < 265 && boardsize != 38)
        {
            fill(255, 255, 255);
            var thirtyeight = "38 X 38";
            text(thirtyeight, 175, height/10 + 160);
            fill(0, 0, 0);
        } else
        {
            var thirtyeight = "38 X 38";
            text(thirtyeight, 175, height/10 + 160);
        }

        if (mouseX > 225 && mouseX < 325 && mouseY > 165 && mouseY < 265 && boardsize != 46)
        {
            fill(255, 255, 255);
            var fourtysix = "46 X 46";
            text(fourtysix, 275, height/10 + 160);
            fill(0, 0, 0);
        } else
        {
            var fourtysix = "46 X 46";
            text(fourtysix, 275, height/10 + 160);
        }

        if (mouseX > 325 && mouseX < 425 && mouseY > 165 && mouseY < 265 && boardsize != 54)
        {
            fill(255, 255, 255);
            var fiftyfour = "54 X 54";
            text(fiftyfour, 375, height/10 + 160);
            fill(0, 0, 0);
        } else
        {
            var fiftyfour = "54 X 54";
            text(fiftyfour, 375, height/10 + 160);
        }

        var begin = "Begin";

        stroke(0, 0, 0);
        fill(255, 255, 255);

        if (start===0 && mouseX > 175 && mouseX < 375 && mouseY > 500 &&  mouseY < 575)
        {
            strokeWeight(3);
            stroke(8, 0, 131);
            rect(175, 500, 200, 75);
            noStroke();
            fill(8, 0, 131);
            noStroke();
            textSize(height*.06);
            text(begin, width*(4/11), height*7/9 + (height*0.0769230769*3/10), width*(0.090909090909)*3, height*0.0769230769);
            noStroke();
        } else
        {
            rect(175, 500, 200, 75);
            fill(0, 0, 0);
            noStroke();
            textSize(height*.06);
            text(begin, width*(4/11), height*7/9 + (height*0.0769230769*3/10), width*(0.090909090909)*3, height*0.0769230769);
            noStroke();
        }
    } else if (start === 1)
    {
        background(255);

        if (boardsize == 14)
        {
            var moves = moveCounter + " / 25";
        } else if (boardsize == 22 || boardsize == 0)
        {
            var moves = moveCounter + " / 37";
        } else if (boardsize == 30)
        {
            var moves = moveCounter + " / 48";
        } else if (boardsize == 38)
        {
            var moves = moveCounter + " / 60";
        } else if (boardsize == 46)
        {
            var moves = moveCounter + " / 75";
        } else
        {
            var moves = moveCounter + " / 85";
        }
        fill(0, 0, 0);
        textSize(20);
        textAlign(CENTER);
        text(moves, width/2, 600);


        //CODE FOR DIFFERENT GRID SIZES


        if (boardsize == 14)
        {
            for (var i = 0; i<14; i++)
            {
                for (var j=0; j<14; j++)
                {
                    board[i][j].display();
                }
            }
            if (moveCounter >= 25 && !boardFull())
            {
                fill(255, 8, 37, 180);
                rect(0, 0, width, height);
                var lost = "You Lost" + '\n' + "Click to restart";
                fill(0);
                text(lost, width/2, height/2);
                hasLost = true;
            }
            if (moveCounter<=25 && boardFull() && !hasLost)
            {
                fill(7, 216, 18, 180);
                rect(0, 0, width, height);
                var won = "You Won in:" + '\n' + moveCounter + " Moves!" +  '\n' + "Click to restart";
                fill(0, 0, 0);
                text(won, width/2, height/2);
                hasWon = true;

                if(!savedScore)
                {
                    let url = '/savecolor14';
                    //data to send to Ruby route
                    let postData = '14Color Wayz,' + str(moveCounter);
                    print(postData);
                    savedScore = true;
                    httpPost(url, 'text', postData);
                }
            }
        } else if (boardsize == 22 || boardsize == 0)
        {
            for (var i = 0; i<22; i++)
            {
                for (var j=0; j<22; j++)
                {
                    board[i][j].display();
                }
            }
            if (moveCounter >= 37 && !boardFull())
            {
                fill(255, 8, 37, 180);
                rect(0, 0, width, height);
                var lost = "You Lost" + '\n' + "Click to restart";
                fill(0);
                text(lost, width/2, height/2);
                hasLost = true;
            }
            if (moveCounter<=37 && boardFull() && !hasLost)
            {
                fill(7, 216, 18, 180);
                rect(0, 0, width, height);
                var won = "You Won in:" + '\n' + moveCounter + " Moves!" +  '\n' + "Click to restart";
                fill(0, 0, 0);
                text(won, width/2, height/2);
                hasWon = true;
                if(!savedScore)
                {
                    let url = '/savecolor22';
                    //data to send to Ruby route
                    let postData = '22Color Wayz,' + str(moveCounter);
                    savedScore = true;
                    httpPost(url, 'text', postData);
                }
            }
        } else if (boardsize == 30)
        {
            for (var i = 0; i<30; i++)
            {
                for (var j=0; j<30; j++)
                {
                    board[i][j].display();
                }
            }
            if (moveCounter >= 48 && !boardFull())
            {
                fill(255, 8, 37, 180);
                rect(0, 0, width, height);
                var lost = "You Lost" + '\n' + "Click to restart";
                fill(0);
                text(lost, width/2, height/2);
                hasLost = true;
            }
            if (moveCounter<=48 && boardFull() && !hasLost)
            {
                fill(7, 216, 18, 180);
                rect(0, 0, width, height);
                var won = "You Won in:" + '\n' + moveCounter + " Moves!" +  '\n' + "Click to restart";
                fill(0, 0, 0);
                text(won, width/2, height/2);
                hasWon = true;
                if(!savedScore)
                {
                    let url = '/savecolor30';
                    //data to send to Ruby route
                    let postData = '30Color Wayz,' + str(moveCounter);
                    savedScore = true;
                    httpPost(url, 'text', postData);
                }
            }
        } else if (boardsize == 38)
        {
            for (var i = 0; i<38; i++)
            {
                for (var j=0; j<38; j++)
                {
                    board[i][j].display();
                }
            }
            if (moveCounter >= 60 && !boardFull())
            {
                fill(255, 8, 37, 180);
                rect(0, 0, width, height);
                var lost = "You Lost" + '\n' + "Click to restart";
                fill(0);
                text(lost, width/2, height/2);
                hasLost = true;
            }
            if (moveCounter<=60 && boardFull() && !hasLost)
            {
                fill(7, 216, 18, 180);
                rect(0, 0, width, height);
                var won = "You Won in:" + '\n' + moveCounter + " Moves!" +  '\n' + "Click to restart";
                fill(0, 0, 0);
                text(won, width/2, height/2);
                hasWon = true;
                if(!savedScore)
                {
                    let url = '/savecolor38';
                    //data to send to Ruby route
                    let postData = '38Color Wayz,' + str(moveCounter);
                    savedScore = true;
                    httpPost(url, 'text', postData);
                }
            }
        } else if (boardsize == 46)
        {
            for (var i = 0; i<46; i++)
            {
                for (var j=0; j<46; j++)
                {
                    board[i][j].display();
                }
            }
            if (moveCounter >= 75 && !boardFull())
            {
                fill(255, 8, 37, 180);
                rect(0, 0, width, height);
                var lost = "You Lost" + '\n' + "Click to restart";
                fill(0);
                text(lost, width/2, height/2);
                hasLost = true;
            }
            if (moveCounter<=75 && boardFull() && !hasLost)
            {
                fill(7, 216, 18, 180);
                rect(0, 0, width, height);
                var won = "You Won in:" + '\n' + moveCounter + " Moves!" +  '\n' + "Click to restart";
                fill(0, 0, 0);
                text(won, width/2, height/2);
                hasWon = true;
                if(!savedScore)
                {
                    let url = '/savecolor46';
                    //data to send to Ruby route
                    let postData = '46Color Wayz,' + str(moveCounter);
                    savedScore = true;
                    httpPost(url, 'text', postData);
                }
            }
        } else
        {
            for (var i = 0; i<54; i++)
            {
                for (var j=0; j<54; j++)
                {
                    board[i][j].display();
                }
            }
            if (moveCounter >= 85 && !boardFull())
            {
                fill(255, 8, 37, 180);
                rect(0, 0, width, height);
                var lost = "You Lost" + '\n' + "Click to restart";
                fill(0);
                text(lost, width/2, height/2);
                hasLost = true;
            }
            if (moveCounter<=85 && boardFull() && !hasLost)
            {
                fill(7, 216, 18, 180);
                rect(0, 0, width, height);
                var won = "You Won in:" + '\n' + moveCounter + " Moves!" +  '\n' + "Click to restart";
                fill(0, 0, 0);
                text(won, width/2, height/2);
                hasWon = true;
                if(!savedScore)
                {
                    let url = '/savecolor54';
                    //data to send to Ruby routec
                    let postData = '54Color Wayz,' + str(moveCounter);
                    savedScore = true;
                    httpPost(url, 'text', postData);
                }
            }
        }
    }
}


function loadBoard()
{
    var ipos;
    var jpos;
    var t;
    var col;
    if (boardsize == 14)
    {
        for (var i = 0; i < 14; i++)
        {
            board[i] = [];
            for (var j = 0; j < 14; j++)
            {
                ipos = i*(width/14);
                jpos = j*(width/14);
                col = int (random(1, 7));
                t = new Tile(col, ipos, jpos, width*(1/14.0));
                board[i][j] = t;
            }
        }
    } else if (boardsize == 22 || boardsize == 0)
    {
        for (var i = 0; i < 22; i++)
        {
            board[i] = [];
            for (var j = 0; j < 22; j++)
            {
                ipos = i*(width*(1/22.0));
                jpos = j*(width*(1/22.0));
                col = int (random(1, 7));
                t = new Tile(col, ipos, jpos, width*(1/22.0));
                board[i][j] = t;
            }
        }
    } else if (boardsize == 30)
    {
        for (var i = 0; i < 30; i++)
        {
            board[i] = [];
            for (var j = 0; j < 30; j++)
            {
                ipos = i*(width*(1/30.0));
                jpos = j*(width*(1/30.0));
                col = int (random(1, 7));
                t = new Tile(col, ipos, jpos, width*(1/30.0));
                board[i][j] = t;
            }
        }
    } else if (boardsize == 38)
    {
        for (var i = 0; i < 38; i++)
        {
            board[i] = [];
            for (var j = 0; j < 38; j++)
            {
                ipos = i*(width*(1/38.0));
                jpos = j*(width*(1/38.0));
                col = int (random(1, 7));
                t = new Tile(col, ipos, jpos, width*(1/38.0));
                board[i][j] = t;
            }
        }
    } else if (boardsize == 46)
    {
        for (var i = 0; i < 46; i++)
        {
            board[i] = [];
            for (var j = 0; j < 46; j++)
            {
                ipos = i*(width*(1/46.0));
                jpos = j*(width*(1/46.0));
                col = int (random(1, 7));
                t = new Tile(col, ipos, jpos, width*(1/46.0));
                board[i][j] = t;
            }
        }
    } else
    {
        for (var i = 0; i < 54; i++)
        {
            board[i] = [];
            for (var j = 0; j < 54; j++)
            {
                ipos = i*(width*(1/54.0));
                jpos = j*(width*(1/54.0));
                col = int (random(1, 7));
                t = new Tile(col, ipos, jpos, width*(1/54.0));
                board[i][j] = t;
            }
        }
    }
}

function getColor()
{
    var xpos;
    var ypos;
    if (boardsize==14)
    {
        xpos = int((map(xcoord, 0, width, 0, 14)));
        ypos = int((map(ycoord, 0, width, 0, 14)));
    } else if (boardsize==22 || boardsize ==0)
    {
        xpos = int((map(xcoord, 0, width, 0, 22)));
        ypos = int((map(ycoord, 0, width, 0, 22)));
    } else if (boardsize==30)
    {
        xpos = int((map(xcoord, 0, width, 0, 30)));
        ypos = int((map(ycoord, 0, width, 0, 30)));
    } else if (boardsize==38)
    {
        xpos = int((map(xcoord, 0, width, 0, 38)));
        ypos = int((map(ycoord, 0, width, 0, 38)));
    } else if (boardsize==46)
    {
        xpos = int((map(xcoord, 0, width, 0, 46)));
        ypos = int((map(ycoord, 0, width, 0, 46)));
    } else
    {
        xpos = int((map(xcoord, 0, width, 0, 54)));
        ypos = int((map(ycoord, 0, width, 0, 54)));
    }
    var col = board[xpos][ypos].colo;
    return col;
}




function mouseClicked()
{

    if (hasWon || hasLost)
    {
        reset();
    }
    if (start === 1)
    {
        xcoord = mouseX;
        ycoord = mouseY;
        if (ycoord<=width)
        {
            var used = [];
            var selected = getColor();
            if (selected !== board[0][0].colo)
            {
                flood(0, 0, used, board[0][0].colo, selected);
                moveCounter++;
            }
        }
    }

    if (start == 0)
    {
        if (mouseX > 125 && mouseX < 225 && mouseY > height/10 && mouseY< height/10 + 100)
        {
            boardsize = 14;
        }
        if (mouseX > 225 && mouseX < 325 && mouseY > height/10 && mouseY< height/10 + 100)
        {
            boardsize = 22;
        }
        if (mouseX > 325 && mouseX < 425 && mouseY > height/10 && mouseY< height/10 + 100)
        {
            boardsize = 30;
        }
        if (mouseX > 125 && mouseX < 225 && mouseY > 165 && mouseY < 265)
        {
            boardsize = 38;
        }
        if (mouseX > 225 && mouseX < 325 && mouseY > 165 && mouseY < 265)
        {
            boardsize = 46;
        }
        if (mouseX > 325 && mouseX < 425 && mouseY > 165 && mouseY < 265)
        {
            boardsize = 54;
        }
        if (start===0 && mouseX > 175 && mouseX < 375 && mouseY > 500 &&  mouseY < 575 && boardsize == 0)
        {
            boardsize = 22;
        }
    }
    //BEGIN BUTTON
    if (start===0 && mouseX > 175 && mouseX < 375 && mouseY > 500 &&  mouseY < 575)
    {
        loadBoard();
        change.push(board[0][0]);
        start = 1;
    }
}

function flood(x, y, used, startCol, selectedCol)
{

    if (x < 0 || y < 0)
        return;
    if (x >= board.length || y >= board.length)
        return;
    if (used.includes(board[x][y]))
        return;

    //THIS IS WHERE IT BREAKS
    if (board[x][y].colo === startCol)
    {
        board[x][y].colo = selectedCol;
        used.push(board[x][y]);

        flood(x+1, y, used, startCol, selectedCol);
        flood(x-1, y, used, startCol, selectedCol);
        flood(x, y+1, used, startCol, selectedCol);
        flood(x, y-1, used, startCol, selectedCol);
    }
}

function boardFull()
{
    var startCol = board[0][0].colo;
    for (var r = 0; r<board.length; r++)
    {
        for (var c = 0; c<board.length; c++)
        {
            if (board[r][c].colo !== startCol)
            {
                return false;
            }
        }
    }
    return true;
}



function reset()
{
    moveCounter = 0;
    start = 0;
    hasWon = false;
    hasLost = false;
    savedScore = false;

    boardsize = 0;

    background(255);
    board = new Array(2);

    clearBoard();
//    loadBoard();
    change = [];
    change.push(board[0][0]);
}



function clearBoard()
{
    board = new Array(2);
}


function displayTopBox()
{
    if (start==0)
    {
        noStroke();
        if (boardsize==14)
        {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(237, 7, 7);
            rect(125, height/10-0.01, 100, 100);
            noStroke();
            strokeWeight(1);
        } else
        {
            fill(237, 7, 7);
            rect(125, height/10-0.01, 100, 100);
        }

        if (boardsize==22 || boardsize == 0)
        {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(243, 247, 10);
            rect(225, height/10-0.01, 100, 100);
            noStroke();
            strokeWeight(1);
        } else
        {
            fill(243, 247, 10);
            rect(225, height/10-0.01, 100, 100);
        }

        if (boardsize==30)
        {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(189, 0, 203);
            rect(325, height/10-0.01, 100, 100);
            noStroke();
            strokeWeight(1);
        } else
        {
            fill(189, 0, 203);
            rect(325, height/10-0.01, 100, 100);
        }

        if (boardsize==38)
        {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(252, 144, 36);
            rect(125, 165, 100, 100);
            noStroke();
            strokeWeight(1);
        } else
        {
            fill(252, 144, 36);
            rect(125, 165, 100, 100);
        }

        if (boardsize==46)
        {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(93, 214, 35);
            rect(225, 165, 100, 100);
            noStroke();
            strokeWeight(1);
        } else
        {
            fill(93, 214, 35);
            rect(225, 165, 100, 100);
        }

        if (boardsize==54)
        {
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(89, 169, 252);
            rect(325, 165, 100, 100);
            noStroke();
            strokeWeight(1);
        } else
        {
            fill(89, 169, 252);
            rect(325, 165, 100, 100);
        }
    }
}

//function displayBottomBox()
//{
//  fill(237, 7, 7);
//  rect(width*((1/11)), height*(0.6923076923)-height*1/16, width*(0.090909090909), height*(0.0769230769));

//  fill(243, 247, 10);
//  rect(width*(0.4545454545), height*(0.6923076923)-height*1/16, width*(0.090909090909), height*(0.0769230769));

//  fill(189, 0, 203);
//  rect(width*(0.54545454545), height*(0.6923076923)-height*1/16, width*(0.090909090909), height*(0.0769230769));

//  fill(252, 144, 36);
//  rect(width*(4/11), height*(0.7692307692)-height*1/16, width*(0.090909090909), height*(0.0769230769));

//  fill(93, 214, 35);
//  rect(width*(0.45454545454545), height*(0.7692307692)-height*1/16, width*(0.090909090909), height*(0.0769230769));

//  fill(89, 169, 252);
//  rect(width*(0.5454545454545), height*(0.7692307692)-height*1/16, width*(0.090909090909), height*(0.0769230769));

//}
