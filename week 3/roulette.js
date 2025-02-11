let players = [
    { name: 'Player 1', status: 'Alive' },
    { name: 'Player 2', status: 'Alive' },
    { name: 'Player 3', status: 'Alive' },
    { name: 'Player 4', status: 'Alive' }
];

let currentPlayer = 0;
let bulletPosition = -1;  // Bullet position (randomized later)
let isGameRunning = false;
let chamber = [0, 0, 0, 0, 0, 0]; // 6 positions, 1 will have the bullet

// DOM Elements
const playerStatus = [
    document.getElementById('player1Status'),
    document.getElementById('player2Status'),
    document.getElementById('player3Status'),
    document.getElementById('player4Status')
];
const turnInfo = document.getElementById('turnInfo');
const gameResult = document.getElementById('gameResult');
const startGameButton = document.getElementById('startGame');
const pullTriggerButton = document.getElementById('pullTrigger');

// Start the game
function startGame() {
    isGameRunning = true;
    currentPlayer = 0;
    bulletPosition = Math.floor(Math.random() * 6); // Randomize bullet position
    chamber = [0, 0, 0, 0, 0, 0];
    chamber[bulletPosition] = 1;  // Put the bullet in a random chamber
    resetPlayerStatuses();
    updateUI();
    gameResult.textContent = '';
    pullTriggerButton.disabled = false;  // Enable the button to pull the trigger
}

// Reset player statuses
function resetPlayerStatuses() {
    players.forEach((player, index) => {
        player.status = 'Alive';
        playerStatus[index].textContent = 'Alive';
    });
}

// Update UI based on the game state
function updateUI() {
    turnInfo.textContent = `${players[currentPlayer].name}'s Turn!`;
    playerStatus[currentPlayer].textContent = 'Alive';
}

// Handle pulling the trigger
function pullTrigger() {
    const chamberPosition = Math.floor(Math.random() * 6);  // Randomly select a chamber
    const isBullet = chamber[chamberPosition] === 1;
    
    // Check if the current player hits the bullet
    if (isBullet) {
        players[currentPlayer].status = 'Dead';
        playerStatus[currentPlayer].textContent = 'Dead';
        gameResult.textContent = `${players[currentPlayer].name} lost! Game Over.`;
        pullTriggerButton.disabled = true;  // Disable the button after a loss
        return;
    }

    // Otherwise, continue to the next player
    nextTurn();
}

// Move to the next player
function nextTurn() {
    currentPlayer = (currentPlayer + 1) % 4; // Rotate through players (0 to 3)
    updateUI();

    // Check if the game is over
    if (players.filter(player => player.status === 'Alive').length === 1) {
        gameResult.textContent = `${players.find(player => player.status === 'Alive').name} wins!`;
        pullTriggerButton.disabled = true;  // Disable the button after a winner
    }
}

// Event Listeners
startGameButton.addEventListener('click', startGame);
pullTriggerButton.addEventListener('click', pullTrigger);

// Initial UI Setup
startGameButton.disabled = false;
pullTriggerButton.disabled = true;  // Disable the pull trigger button initially
