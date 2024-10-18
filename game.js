export {
  initializeGame,
  humanMove,
  computerMove,
  checkWinner,
  displayBoard,
  createMoveCounter,
  resetBoard,
};

function initializeGame(humanSignInput, firstPlayerInput) {

  const board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ];


  const humanSign = humanSignInput.toUpperCase();
  const computerSign = humanSign === 'X' ? 'O' : 'X';

  const currentPlayer = firstPlayerInput.toLowerCase();

  return { board, humanSign, computerSign, currentPlayer };
}


function humanMove(board, humanSign, row, col) {
  board[row][col] = humanSign;
}


function computerMove(board, computerSign) {
  const emptyCells = [];

  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '_') {
        emptyCells.push({ row, col });
      }
    }
  }


  if (emptyCells.length > 0) {
    const randomIndex = getRandomInt(0, emptyCells.length - 1);
    const { row, col } = emptyCells[randomIndex];
    board[row][col] = computerSign;
  }
}

function checkWinner(board, sign) {
 
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === sign &&
      board[i][1] === sign &&
      board[i][2] === sign
    ) {
      return true;
    }
  }
  
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === sign &&
      board[1][i] === sign &&
      board[2][i] === sign
    ) {
      return true;
    }
  }
  
  if (
    board[0][0] === sign &&
    board[1][1] === sign &&
    board[2][2] === sign
  ) {
    return true;
  }
  if (
    board[0][2] === sign &&
    board[1][1] === sign &&
    board[2][0] === sign
  ) {
    return true;
  }
  return false;
}

function displayBoard(board, containerElement, cellClickHandler) {

  containerElement.innerHTML = '';
  containerElement.style.display = 'inline-block';

  board.forEach((rowArray, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    rowArray.forEach((cellValue, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.row = rowIndex;
      cellElement.dataset.col = colIndex;
      cellElement.textContent = cellValue !== '_' ? cellValue : '';
      cellElement.addEventListener('click', cellClickHandler);
      rowElement.appendChild(cellElement);
    });

    containerElement.appendChild(rowElement);
  });
}


function resetBoard(containerElement) {
  containerElement.innerHTML = '';
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


function createMoveCounter() {
  let counter = 0;
  return function (reset = false) {
    if (reset) {
      counter = 0;
    } else {
      counter++;
    }

    return counter;
  };
}
