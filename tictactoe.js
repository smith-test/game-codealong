const prompt = require('prompt-sync')(); //set this if you are needing a prompt for the the user to provide input

console.log('Welcome to Tic Tac Toe')
/*---------------Lookup Data/Constants----------*/
const WINNING_COMBOS = [
    
        [
            { row: 0, column: 0 },
            { row: 0, column: 1 },
            { row: 0, column: 2 },
        ],
        [
            { row: 1, column: 0 },
            { row: 1, column: 1 },
            { row: 1, column: 2 },
        ],
        [
            { row: 2, column: 0 },
            { row: 2, column: 1 },
            { row: 2, column: 2 },
        ],
        [
            { row: 0, column: 0 },
            { row: 1, column: 0 },
            { row: 2, column: 0 },
        ],
        [
            { row: 0, column: 1 },
            { row: 1, column: 1 },
            { row: 2, column: 1 },
        ],
        [
            { row: 0, column: 2 },
            { row: 1, column: 2 },
            { row: 2, column: 2 },
        ],
        [
            { row: 0, column: 0 },
            { row: 1, column: 1 },
            { row: 2, column: 2 },
        ],
        [
            { row: 0, column: 2 },
            { row: 1, column: 1 },
            { row: 2, column: 0 },
        ],
    ];

/*---------------State----------*/
const board = [  //two demensional array (array within an array)
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
];

// console.log(board[0][0]) //Reference on how to access spaces on the board

const player1 = 'X'
const player2 = 'O'
let turn='X'
let winner = null //could be 'X' or 'O', depending on player win, or 'T'

/*--------- Logic to implement game---------*/
main();  //calling the main function

function main() {
    //until the  game is won or tied, the game will continue
    while(!winner){
        renderBoard();
        renderMessage();
        
        let row = getUserInput('row'); //passing in string
        let col = getUserInput('column');
        
        const selectedSpace = board[row-1][col-1]

        if (selectedSpace !== ' ' ){
            console.log("This spot is occupied! Please choose an empty spot!")
        } else {
            //UPDATE THE BOARD STATE
            board[row -1][col -1] = turn;  //subtract 1 from the user input to match an index value
            
            checkWinner() //this will check for winner each time the board is updated above

            if (turn === 'X') {  //this will switch the turns
                turn = 'O'
            } else {
                turn = 'X'
            }
        }
        // console.log('row', typeof row); //this is just to confirm the entry and it's type
        // console.log('col', typeof col);
       
        // winner ='X'; //this is just to avoid a infinite while loop if you run this without a value for winner
       
    }
    renderBoard();
    console.log('Congrats to Player ${winner} you won')
}

function renderBoard() {

console.log(' 1 |2| 3');
console.log(`1 ${board[0][0]}|${board[0][1]}| ${board[0][2]}`);
console.log(' --|-|--');
console.log(`2 ${board[1][0]}|${board[1][1]}| ${board[1][2]}`);
console.log(' --|-|--');
console.log(`3 ${board[2][0]}|${board[2][1]}| ${board[2][2]}`);
};

function renderMessage() {
    console.log(`Current turn is ${turn}`);
    console.log('Please select the row and column that you would like to play.');

}

function getUserInput(pos) {  //this function is taking in the row or column into the pos. value doesn't care what it is.
    let value
    while(!value || value > 3 || value < 1) {
        value = prompt(`Select ${pos}: `);
        value = parseInt(value); //changing the entered string type into numbers
    }
}
function checkWinner(){
    WINNING_COMBOS.forEach(combo => {
    const pos1 = combo[0]
    const pos2  = combo[1]
    const pos3 = combo[2]
    if(
        board[pos1.row][pos1.col] 
        === board[pos2.row][pos2.col]   
        && [pos1.row][pos1.col] 
        === board[pos3.row][pos3.col]
    ) {
        if(board[pos1.row][pos1.col] !== ' ')
        winner = turn;
    }
});


//this will handle no winner and now empty
    const isEmpty = board.some(row => row.includes[' '])
    if(!winner && isEmpty)
    

}