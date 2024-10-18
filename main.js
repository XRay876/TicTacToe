import {
        initializeGame,
        humanMove,
        computerMove,
        checkWinner,
        displayBoard,
        createMoveCounter,
        resetBoard,
    } from './game.js';
    
let board;
let humanSign;
let computerSign;
let currentPlayer;
let gameActive = false;

const incrementCounter = createMoveCounter();

const gameBoardElement = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('start-game');
const humanSignSelect = document.getElementById('human-sign');
const firstPlayerSelect = document.getElementById('first-player');


startButton.addEventListener('click', () => {

    let gameData = initializeGame(
        humanSignSelect.value,
        firstPlayerSelect.value
    );
    
    board = gameData.board;
    humanSign = gameData.humanSign;
    computerSign = gameData.computerSign;
    currentPlayer = gameData.currentPlayer;

    gameActive = true;
    incrementCounter(true); 

    
    resetBoard(gameBoardElement);
    displayBoard(board, gameBoardElement, handleCellClick);
    messageElement.textContent = `Game started. ${currentPlayer === 'human' ? 'Your' : "Computer's"} turn.`;


    if (currentPlayer === 'computer') {
    computerTurn();
    }
});
    

function handleCellClick(event) {
    if (!gameActive || currentPlayer !== 'human') return;

    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (board[row][col] === '_') {
    humanMove(board, humanSign, row, col);
    displayBoard(board, gameBoardElement, handleCellClick);

    if (checkWinner(board, humanSign)) {
        messageElement.textContent = 'Congratulations! You win!';
        gameActive = false;
        return;
    }

    if (incrementCounter() >= 9) {
        messageElement.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = 'computer';
    messageElement.textContent = "Computer's turn.";
    computerTurn();
    }
}
    
function computerTurn() {
    setTimeout(() => {
    computerMove(board, computerSign);
    displayBoard(board, gameBoardElement, handleCellClick);

    if (checkWinner(board, computerSign)) {
        messageElement.textContent = 'Computer wins!';
        gameActive = false;
        return;
    }

    if (incrementCounter() >= 9) {
        messageElement.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = 'human';
    messageElement.textContent = 'Your turn.';
    }, 500); 
}
    