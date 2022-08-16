const gameBoard = (() => {
    const gameBoardArray = Array.apply(null, Array(9));
    const gameTiles = document.querySelectorAll('.game-tile');

    // Add event listener to game tiles
    gameTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            gameController.handleClick(tile);
        })
    })

    function renderContents() {
        for (let i = 0; i < gameBoardArray.length; i++) {
            gameTiles[i].textContent = gameBoardArray[i];
        }
    }

    return { gameBoardArray, gameTiles, renderContents };

})();


const newPlayer = (playerNumber, gamePiece, playerName = "Anonymous") => {
    const _gamePiece = gamePiece;
    const _playerName = playerName;

    return {
        playerNumber,
        get gamePiece() {
            return _gamePiece
        },
        get playerName() {
            return _playerName;
        }
    };
}

const playerOne = newPlayer(1, "X", "Shrek");
const playerTwo = newPlayer(2, "O", "Donkey");

// Function to make the game functional
const gameController = (() => {

    let currentPlayer = playerOne;
    let winner;
    let gameOver = false;

    function handleClick(tile) {
        if (!gameOver) {
            let tileClicked = Array.from(gameBoard.gameTiles).indexOf(tile);

            if (gameBoard.gameBoardArray[tileClicked] === undefined) {
                gameBoard.gameBoardArray[tileClicked] = currentPlayer.gamePiece;
                gameBoard.renderContents();
                winner = getWinner();
                changePlayerTurn();

            }
        }
    }

    function changePlayerTurn() {
        if (currentPlayer === playerOne)
            currentPlayer = playerTwo;
        else
            currentPlayer = playerOne;
    }

    function getWinner() {
        winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winningPositions.length; i++) {

            if (gameBoard.gameBoardArray[winningPositions[i][0]] === playerOne.gamePiece
                && gameBoard.gameBoardArray[winningPositions[i][1]] === playerOne.gamePiece
                && gameBoard.gameBoardArray[winningPositions[i][2]] === playerOne.gamePiece) {
                gameOver = true;
                return playerOne;
            }
            else if (gameBoard.gameBoardArray[winningPositions[i][0]] === playerTwo.gamePiece
                && gameBoard.gameBoardArray[winningPositions[i][1]] === playerTwo.gamePiece
                && gameBoard.gameBoardArray[winningPositions[i][2]] === playerTwo.gamePiece) {
                gameOver = true;
                return playerTwo;
            }
        }

        // display winner
        // 


    }

    function Reset() {
        gameBoard.gameBoardArray.fill(undefined, 0, 8);
        gameBoard.renderContents();
        winner = null;
        gameOver = false;
    }

    return { handleClick };

})();

