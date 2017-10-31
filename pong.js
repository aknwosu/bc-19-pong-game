var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var ballRadius = 4;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 7;
var paddleWidth = 75;
var paddle1X = (canvas.width - paddleWidth) / 2;
var paddle1Y = canvas.height - paddleHeight;
//var paddle2X = (canvas.width - paddleWidth) / 2;
//var paddle2Y = paddleHeight;
var rightPressed = false;
var leftPressed = false;
var keyQ = false;
var keyW = false;
var lives = 4;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    //if (e.keyCode == 81) {
    //   keyQ = true;
    //}

    if (e.keyCode == 37) {
        leftPressed = true;
    }
    // if (e.keyCode == 87) {
    //     keyW = true;
    // }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    //if (e.keyCode == 87) {
    // keyW = false;
    //}
    // if (e.keyCode == 81) {
    //     keyQ = false;
    // } 
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(paddle1X, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

/*function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddle2X, paddle2Y, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
*/

function drawLives() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle1();
    //drawPaddle2();
    drawLives();


    //hitting top, left boundary
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //hitting right boundary
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) { //hiting paddle
        if (x > paddle1X && x < paddle1X + paddleWidth) {
            document.getElementById('collide').play();
            dy = -dy * 1.2;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddle1X < canvas.width - paddleWidth) {
        paddle1X += 7;
    } else if (leftPressed && paddle1X > 0) {
        paddle1X -= 7;
    }

    /*if (keyW && paddle2X < canvas.width - paddleWidth) {
        paddle2X += 7;
    } else if (keyQ && paddle2X > 0) {
        paddle2X -= 7;
    }*/

    x += dx;
    y += dy;
    requestAnimationFrame(draw);

}

draw();
