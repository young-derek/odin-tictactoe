// Game board module
const gameBoard = (() => {
    const gameBoardArray = Array.apply(null, Array(9));
    const gameTiles = document.querySelectorAll('.game-tile');

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

// New player factory function
const newPlayer = (playerNumber, gamePiece, playerName) => {
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

const playerOne = newPlayer(1, "X", "Player One");
const playerTwo = newPlayer(2, "O", "Player Two");

// Game functionality module
const gameController = (() => {

    let playerOneWins = 0;
    let playerTwoWins = 0;
    let currentPlayer = playerOne;
    let winner;
    let gameOver = false;
    const displayActivePlayer = document.getElementById('active-player');
    const displayWinner = document.getElementById('winner');
    const displayPlayerOneWins = document.getElementById('player-one-wins');
    const displayPlayerTwoWins = document.getElementById('player-two-wins');
    const resetButton = document.getElementById('btn-reset')

    updateDisplayStatus();

    resetButton.addEventListener('click', () => {
        Reset();
    })

    function handleClick(tile) {
        if (!gameOver) {
            let tileClicked = Array.from(gameBoard.gameTiles).indexOf(tile);

            if (gameBoard.gameBoardArray[tileClicked] === undefined) {
                gameBoard.gameBoardArray[tileClicked] = currentPlayer.gamePiece;
                gameBoard.renderContents();
                winner = getWinner();
                changePlayerTurn();
                updateDisplayStatus();

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
            else if (!gameBoard.gameBoardArray.includes(undefined)) {
                gameOver = true;
                return "Draw";
            }
        }
    }

    function updateDisplayStatus() {
        if (gameOver) {
            if (winner === playerOne) {
                displayWinner.textContent = "Player One wins!";
                playerOneWins++;
            }
            else if (winner === playerTwo) {
                displayWinner.textContent = "Player Two Wins!";
                playerTwoWins++;
            }
            else if (winner === "Draw") {
                displayWinner.textContent = "Draw!";
            }
        }

        displayActivePlayer.textContent = `Current Player: ${currentPlayer.playerNumber}`;
        displayPlayerOneWins.textContent = `Player One wins: ${playerOneWins}`;
        displayPlayerTwoWins.textContent = `Player Two wins: ${playerTwoWins}`;

    }

    function Reset() {
        gameBoard.gameBoardArray.fill(undefined, 0, 9);
        gameBoard.renderContents();
        winner = null;
        gameOver = false;
        currentPlayer = playerOne;
        displayWinner.textContent = "";
    }

    return { handleClick };

})();

