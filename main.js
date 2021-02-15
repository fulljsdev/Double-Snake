window.onload = startGame
function startGame() {
    let cells = 30
    let cellSize = 20
    let trapX = 15
    let trapY = 15
    let foodX = 15
    let foodY = 15
    let trailOne = []
    let trailTwo = []
    let tailOne = 3
    let tailTwo = 3
    let playerOneX = 5
    let playerOneY = 5
    let playerTwoX = 20
    let playerTwoY = 20
    let playerOneMoveX = 0
    let playerOneMoveY = 0
    let playerTwoMoveX = 0
    let playerTwoMoveY = 0
    let gameT = null

    let canvas = document.querySelector('#canv');
    let ctx = canvas.getContext('2d')
    start()

    function start() {
        tailOne = 3
        tailTwo = 3
        playerOneX = 25
        playerOneY = 25
        playerTwoX = 10
        playerTwoY = 10
        playerOneMoveX = 0
        playerOneMoveY = 0
        playerTwoMoveX = 0
        playerTwoMoveY = 0
        ctx.fillStyle = "#061c31"
        ctx.fillRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = "#ffffff"
        ctx.font = "50px monospace"
        ctx.textAlign = "center"
        ctx.fillText("Start", 300, 300)
        canvas.onclick = function () {
            document.addEventListener("keydown", move)
            gameT = setInterval(game, 60)
            canvas.onclick = null
            trapX = Math.floor(Math.random() * cells)
            trapY = Math.floor(Math.random() * cells)
        }

    }

    function move(e) {
        switch (e.key) {
            case 'w':
                playerOneMoveX = 0
                playerOneMoveY = -1
                break;
            case 'a':
                playerOneMoveX = -1
                playerOneMoveY = 0
                break;
            case 's':
                playerOneMoveX = 0
                playerOneMoveY = 1
                break;
            case 'd':
                playerOneMoveX= 1
                playerOneMoveY = 0
                break;

            case 'ArrowUp':
                playerTwoMoveX = 0
                playerTwoMoveY = -1
                break;
            case 'ArrowLeft':
                playerTwoMoveX = -1
                playerTwoMoveY = 0
                break;
            case 'ArrowDown':
                playerTwoMoveX = 0
                playerTwoMoveY = 1
                break;
            case 'ArrowRight':
                playerTwoMoveX= 1
                playerTwoMoveY = 0
                break;
            case 'Enter':
                start()
                break;
        }
    }

    function game() {
        playerOneX += playerOneMoveX
        playerOneY += playerOneMoveY

        playerTwoX += playerTwoMoveX
        playerTwoY += playerTwoMoveY



        if(playerOneX < 0 || playerOneY < 0 || playerOneX > cells || playerOneY >= cells){
            tailTwo += 1000
            endGame()
        }
        if(playerTwoX < 0 || playerTwoY < 0 || playerTwoX > cells || playerTwoY >= cells){
            tailOne += 1000
            endGame()
        }
        if(playerTwoX == playerOneX && playerTwoY == playerOneY){
            endGame()
        }
        if(playerOneX == trapX && playerOneY == trapY){
            tailTwo += 1000
            endGame()
        }
        if(playerTwoX == trapX && playerTwoY == trapY){
            tailOne += 1000
            endGame()
        }
        ctx.fillStyle = "#00417A"
        ctx.fillRect(0,0, canvas.width, canvas.height)


        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.font  = "20px monospace"
        ctx.fillText("Score: " + (tailOne-3), 50, 30)
        ctx.fillText("Score: " + (tailTwo-3), 550, 30)

        ctx.fillStyle = "#ffffff"
        ctx.fillRect(foodX*cellSize, foodY*cellSize, cellSize, cellSize)
        ctx.fillStyle = "#6a0e0e"
        ctx.fillRect(trapX*cellSize, trapY*cellSize, cellSize, cellSize)


        for(let i = 0; i < trailOne.length-1; i++){
            ctx.fillStyle = "#030f1c"
            ctx.fillRect(trailOne[trailOne.length-1].x * cellSize, trailOne[trailOne.length-1].y * cellSize, cellSize, cellSize)
            ctx.fillStyle = "#001f3b"
            ctx.fillRect(trailOne[i].x * cellSize, trailOne[i].y * cellSize, cellSize, cellSize)
        }

        for(let i = 0; i < trailTwo.length-1; i++){
            ctx.fillStyle = "#044f93"
            ctx.fillRect(trailTwo[trailTwo.length-1].x * cellSize, trailTwo[trailTwo.length-1].y * cellSize, cellSize, cellSize)
            ctx.fillStyle = "#0078E0"
            ctx.fillRect(trailTwo[i].x * cellSize, trailTwo[i].y * cellSize, cellSize, cellSize)
        }

        trailOne.push({x: playerOneX, y: playerOneY})
        trailTwo.push({x: playerTwoX, y: playerTwoY})

        if(playerOneX == foodX && playerOneY == foodY){
            tailOne++;
            foodX = Math.floor(Math.random() * cells)
            foodY = Math.floor(Math.random() * cells)
        }
        if(playerTwoX == foodX && playerTwoY == foodY){
            tailTwo++;
            foodX = Math.floor(Math.random() * cells)
            foodY = Math.floor(Math.random() * cells)
        }
        while (trailOne.length > tailOne){
            trailOne.shift()
        }
        while (trailTwo.length > tailTwo){
            trailTwo.shift()
        }

    }

    function endGame() {
        clearInterval(gameT)
        setTimeout(function () {
            ctx.fillStyle = "#061c31"
            ctx.fillRect(0,0, canvas.width, canvas.height)
            ctx.fillStyle = "#ffffff"
            ctx.textAlign = "center"
            ctx.font  = "50px monospace"
            ctx.fillText("End Game!", 300, 300)
            ctx.font  = "25px monospace"
            if(tailOne < tailTwo){
                ctx.fillText("Player 2 won", 300, 500)
            }else if(tailOne > tailTwo){
                ctx.fillText("Player 1 won", 300, 500)
            }
        }, 100)
        canvas.onclick = start
    }

}

