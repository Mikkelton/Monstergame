const Board_Size = 15;
const cellSize = calculateCellSize();
let board;

document.getElementById('new-game-btn').addEventListener('click',startgame)

function startgame(){
    console.log('klikattu')
    document . getElementById('intro-screen').style.display = 'none';
    document . getElementById('game-screen').style.display = 'block';

    board = generateRandomBoard();

    drawBoard(board);
}

function generateRandomBoard(){
    const newBoard = Array.from({length:Board_Size},()=>Array(Board_Size).fill(''));

    for(let y = 0; y < Board_Size; y++){
        for(let x = 0; x < Board_Size; x++){
            if(y === 0){
                newBoard[y][x] = 'W';
            }
        }
    }


    console.log(newBoard);
    return newBoard;
}

function drawBoard(board){
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.gridTemplateColumns = `repeat(${Board_Size},1fr)`;

    for(let y = 0; y < Board_Size; Y++){
        for(let x = 0; x < Board_Size; x++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            if(getCell(board,x,y) === 'W'){
                cell.classList.add('wall');
            }

            gameBoard.appendChild(cell);
        }
    }
}

function getCell(board,x,y){
    return board[y][x];
}

function calculateCellSize(){
    const screenSize = Math.min(window.innerWidth,window.innerHeight);
    const gameBoardSize = 0.95 * screenSize;
    return gameBoardSize / Board_Size;
}