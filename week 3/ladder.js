// Game Setup
const board = document.getElementById('board');
const rollButton = document.getElementById('rollButton');
const diceRollResult = document.getElementById('diceRollResult');
const player1Pos = document.getElementById('player1Pos');
const player2Pos = document.getElementById('player2Pos');

// Snake and Ladder positions (key is the start, value is the end)
const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

// Initial Player Positions
let player1Position = 1;
let player2Position = 1;
let currentPlayer = 1;

// Generate the game board (10x10 grid)
function generateBoard() {
    board.innerHTML = ''; // Clear the board before creating new squares

    for (let i = 100; i >= 1; i--) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-position', i);
        
        // Display the square number
        square.textContent = i;

        // Place player markers
        if (i === player1Position) {
            const player1Marker = document.createElement('div');
            player1Marker.classList.add('player1');
            square.appendChild(player1Marker);
        }
        if (i === player2Position) {
            const player2Marker = document.createElement('div');
            player2Marker.classList.add('player2');
            square.appendChild(player2Marker);
        }

        board.appendChild(square);
    }
}

// Roll the dice (return a random number between 1 and 6)
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Move player based on the dice roll
function movePlayer(player, roll) {
    let newPos = player + roll;

    // If the player exceeds 100, keep the position at 100
    if (newPos > 100) {
        newPos = 100;
    }

    // Check for snake
    if (snakes[newPos]) {
        newPos = snakes[newPos];
    }

    // Check for ladder
    if (ladders[newPos]) {
        newPos = ladders[newPos];
    }

    return newPos;
}

// Update the game state after a roll
function updateGameState() {
    const roll = rollDice();
    diceRollResult.textContent = `Player ${currentPlayer} rolled a ${roll}!`;

    // Move the current player
    if (currentPlayer === 1) {
        player1Position = movePlayer(player1Position, roll);
        player1Pos.textContent = player1Position;
    } else {
        player2Position = movePlayer(player2Position, roll);
        player2Pos.textContent = player2Position;
    }

    // Update the board display
    generateBoard();

    // Check for winner
    if (player1Position === 100) {
        alert('Player 1 Wins!');
        resetGame();
    } else if (player2Position === 100) {
        alert('Player 2 Wins!');
        resetGame();
    }

    // Switch turns
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Reset the game to initial state
function resetGame() {
    player1Position = 1;
    player2Position = 1;
    currentPlayer = 1;
    generateBoard();
}

// Event Listener for the Roll Dice button
rollButton.addEventListener('click', updateGameState);

// Initialize the game board
generateBoard();
