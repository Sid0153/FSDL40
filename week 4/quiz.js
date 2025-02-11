// Question class to represent each question in the quiz
class Question {
    constructor(questionText, options, correctAnswerIndex) {
        this.questionText = questionText; // Text of the question
        this.options = options;           // Array of answer options
        this.correctAnswerIndex = correctAnswerIndex; // Index of the correct answer
    }

    // Method to check if the selected answer is correct
    isCorrect(selectedIndex) {
        return selectedIndex === this.correctAnswerIndex;
    }
}

// Variables for the DOM elements
const quizContainer = document.getElementById('quizContainer');
const submitBtn = document.getElementById('submitBtn');
const resultElement = document.getElementById('result');

// List of questions (Quiz Data)
const questions = [
    new Question("What is the capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], 2),
    new Question("Which programming language is used for web development?", ["C", "Python", "JavaScript", "Java"], 2),
    new Question("What is 5 + 3?", ["6", "7", "8", "9"], 2),
    new Question("Who wrote 'To Kill a Mockingbird'?", ["Harper Lee", "J.K. Rowling", "Jane Austen", "George Orwell"], 0)
];

// Variable to track the user's answers
let userAnswers = [];

// Function to display the quiz questions and options
function displayQuiz() {
    quizContainer.innerHTML = ''; // Clear the container before adding new content

    questions.forEach((question, index) => {
        // Create and display question
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `${index + 1}. ${question.questionText}`;

        // Create and display answer options
        const answersList = document.createElement('ul');
        answersList.classList.add('answers');
        question.options.forEach((option, i) => {
            const answerItem = document.createElement('li');
            answerItem.classList.add('answer');
            answerItem.innerHTML = `
                <input type="radio" name="question${index}" value="${i}" />
                ${option}
            `;
            answersList.appendChild(answerItem);
        });

        questionElement.appendChild(answersList);
        quizContainer.appendChild(questionElement);
    });
}

// Function to calculate the score
function calculateScore() {
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            const selectedAnswerIndex = parseInt(selectedOption.value);
            if (question.isCorrect(selectedAnswerIndex)) {
                score++;
            }
        }
    });

    return score;
}

// Function to show the result
function showResult() {
    const score = calculateScore();
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    resultElement.classList.remove('hidden');
    resultElement.textContent = `You scored ${score} out of ${totalQuestions} (${percentage.toFixed(2)}%)`;

    // Display different message based on the score
    if (percentage >= 75) {
        resultElement.style.color = 'green';
        resultElement.textContent += " - Great job!";
    } else {
        resultElement.style.color = 'red';
        resultElement.textContent += " - Better luck next time!";
    }
}

// Event listener for the Submit button
submitBtn.addEventListener('click', () => {
    showResult(); // Show result when the user submits the quiz
});

// Initialize the quiz on page load
window.onload = displayQuiz;
