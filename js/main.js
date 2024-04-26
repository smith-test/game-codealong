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
  /*------ Cached Elements -------*/
const messageEl = document.querySelector('h3.message-header');
const boardEl = document.querySelector('div.board');

boardEl.addEventListener('click', handleBoardClick);  /*add event listener takes two parameters.*/
  
  /*------ State -------*/
let board, turn, winner;
  
  /*------ Logic -------*/
init();
  
function init() {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  
    turn = 'X';
    winner = null;
  
    render();
}
  
function render() {
    renderMessage();
    renderBoard();
}

function renderNewGamBtn(){
    if(winner)
        const newGameBtn = document.createElement('button')
        newGameBtn.innerText = 'New Game'
        newGameBtn.addEventListener('click', init) /**click is the action and init is the function we call */
        document.body.append(newGameBtn);
    } else {
        const newGameBtn = document.querySelector('button')
        if(newGameBtn) {
            newGameBtn.remove();
        }
    }


function renderMessage() {
    if (winner === 'T') {
        messageEl.innertext = "It's a tie!"
    } else if (!winner) {
        messageEl.innertext = `It is ${turn}'s turn`
    } else {
        messageEl.innerText = `Player ${winner} won!`;
    }
 }

function renderBoard(){
    board.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            document.getElementById(`r${rowIdx}c${colIdx}`).innerText = col 
            ? col 
            : '' ;  /*the "col ? col : ''" is a ternary expression evaluates to one single value so kind of like an if statement built in*/
        })
    });
}
function changeTurn(){
    if (turn === 'X') {
        turn = 'O';
      } else {
        turn = 'X';
      }
}

function handleBoardClick(evt) {
    if(evt.target.classList.contains('cell') && !winner) {
       const row = evt.target.id[1];  /*the square brackets are treating the ID as a string with indexes.  So r0c1 is 0123 indexes*/         
       const col = evt.target.id[3];

       if(!board[row][col]) {
        board[row][col] = turn
        
        checkWinner();
        changeTurn();
        render();
       }
    }
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
          if (board[pos1.row][pos1.col]) {
            winner = turn;
          }
        }
      });
    
      const isEmpty = board.some((row) => row.includes(null));
    
      if (!winner && !isEmpty) {
        winner = 'T';
      }
    } 
