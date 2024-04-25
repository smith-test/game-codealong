const prompt = require('prompt-sync')();

console.log('Welcome to Tic Tac Toe!');

/*------ Lookup Data / Constants -------*/
const WINNING_COMBOS = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

/*------ State -------*/

const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

// Reference on how to access spaces on the board
// console.log(board[2][2]);

const player1 = 'X';
const player2 = 'O';
let turn = 'X';
let winner = null; // could be 'X' or 'O' depending on player win, or 'T'

/*------ Logic -------*/
main();

// main gameplay loop
function main() {
  // until the game is won or tied, the game will continue
  while (!winner) {
    renderBoard();
    renderMessage();

    let row = getUserInput('row');
    let col = getUserInput('column');

    const selectedSpace = board[row - 1][col - 1];

    if (selectedSpace !== ' ') {
      console.log(
        'This spot is occupied! Please choose an empty spot!'
      );
    } else {
      // update the board state
      board[row - 1][col - 1] = turn;

      checkWinner();

      if (turn === 'X') {
        turn = 'O';
      } else {
        turn = 'X';
      }
    }

    // winner = 'X';
  }

  renderBoard();
  if (winner === 'T') {
    console.log('Tie Game!!!');
  } else {
    console.log(`Congrats to Player ${winner}, you won!`);
  }
}

function renderBoard() {
  console.log(' 1 |2| 3');
  console.log(`1 ${board[0][0]}|${board[0][1]}|${board[0][2]}`);
  console.log(' --|-|--');
  console.log(`2 ${board[1][0]}|${board[1][1]}|${board[1][2]}`);
  console.log(' --|-|--');
  console.log(`3 ${board[2][0]}|${board[2][1]}|${board[2][2]}`);
}

function renderMessage() {
  console.log(`Current turn is ${turn}`);
  console.log(
    'Please select the row and column that you would like to play'
  );
}

function getUserInput(pos) {
  let value;
  while (!value || value > 3 || value < 1) {
    value = prompt(`Select ${pos}: `);
    value = parseInt(value);
  }
  return value;
}

function checkWinner() {
  WINNING_COMBOS.forEach((combo) => {
    const pos1 = combo[0];
    const pos2 = combo[1];
    const pos3 = combo[2];

    if (
      board[pos1.row][pos1.col] === board[pos2.row][pos2.col] &&
      board[pos1.row][pos1.col] === board[pos3.row][pos3.col]
    ) {
      if (board[pos1.row][pos1.col] !== ' ') {
        winner = turn;
      }
    }
  });

  const isEmpty = board.some((row) => row.includes(' '));

  if (!winner && !isEmpty) {
    winner = 'T';
  }
} 