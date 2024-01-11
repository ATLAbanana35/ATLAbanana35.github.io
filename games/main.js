document.addEventListener("DOMContentLoaded", function () {
    const ball = document.querySelector('.ball');
    const paddle = document.querySelector('.paddle');
    const levels = document.querySelectorAll('.level');
    let currentLevel = 0;
    let bricks = levels[currentLevel].querySelectorAll('.brick');
    let bricks_alive = bricks.length;
    let score = 0;

    let ballX = 10;
    let ballY = 10;
    let ballSpeedX = -3;
    let ballSpeedY = -3;

    let paddleX = 120;

    function update() {
        if (bricks_alive === 0) {
            alert("You win! Moving to the next level");
            currentLevel++;
            if (currentLevel < levels.length) {
                bricks = levels[currentLevel].querySelectorAll('.brick');
                bricks_alive = bricks.length;
            } else {
                alert("You completed all levels!");
                resetGame();
                return;
            }
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Gestion des collisions avec les bords
        if (ballX > 270 || ballX < 0) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Gestion des collisions avec la raquette
        if (
            ballY + 20 > 380 &&
            ballY < 400 &&
            ballX > paddleX &&
            ballX < paddleX + 60
        ) {
            ballSpeedY = -ballSpeedY;
        }

        // Gestion des collisions avec les briques
        let index = 0;
        bricks.forEach(function (brick) {
            if (
                ballY < brick.offsetTop + brick.offsetHeight &&
                ballY + 20 > brick.offsetTop &&
                ballX < brick.offsetLeft + brick.offsetWidth &&
                ballX + 20 > brick.offsetLeft
            ) {
                delete bricks[index];
                brick.style.display = 'none';
                ballSpeedY = -ballSpeedY;
                bricks_alive--;
                score += 10;
                document.getElementById('score').innerText = score;
            }
            index++;
        });

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        paddle.style.left = paddleX + 'px';

        if (ballY > 400) {
            requestAnimationFrame(update);
        } else {
            alert("Game over. Your final score: " + score);
            resetGame();
        }
    }

    // Écoute des événements tactiles
    let touchStartX = 0;

    document.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
    });

    document.addEventListener('touchmove', function (event) {
        let touchEndX = event.touches[0].clientX;
        let touchDeltaX = touchEndX - touchStartX;

        if (touchDeltaX < 0 && paddleX > 0) {
            paddleX -= 5;
        } else if (touchDeltaX > 0 && paddleX < 270) {
            paddleX += 5;
        }

        touchStartX = touchEndX;
    });

    // Fonction pour réinitialiser le jeu
    function resetGame() {
        currentLevel = 0;
        bricks = levels[currentLevel].querySelectorAll('.brick');
        bricks_alive = bricks.length;
        score = 0;
        document.getElementById('score').innerText = score;
        alert("Game reset. Starting from Level 1");
        update();
    }

    update();
});