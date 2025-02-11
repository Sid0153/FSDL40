// Variables
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Unique card values
let cards = []; // Array to store card objects
let flippedCards = []; // Array to store flipped cards
let matchedCards = 0; // Count of matched cards

// Generate shuffled cards
function shuffleCards() {
    let shuffledValues = [...cardValues, ...cardValues]; // Duplicate array for pairs
    shuffledValues = shuffledValues.sort(() => Math.random() - 0.5); // Shuffle array

    // Create card elements
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Clear the board before adding new cards

    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value; // Store card value in dataset
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });
}

// Flip a card when clicked
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        // If two cards are flipped, check for a match
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

// Check if the two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];

    // Check if the game is over
    if (matchedCards === cards.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

// Reset the game
document.getElementById('resetBtn').addEventListener('click', () => {
    matchedCards = 0;
    flippedCards = [];
    cards = [];
    shuffleCards();
});

// Initialize the game
shuffleCards();
