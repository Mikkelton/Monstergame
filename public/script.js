const Board_Size = 20;
const cellSize = calculateCellSize();
let board;
let player;

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
            if(y === 0 || y === Board_Size -1 || x === 0 || x === Board_Size -1){
                newBoard[y][x] = 'W';
            }
        }
    }

    console.log(newBoard);
    generateObstacles(newBoard);

    const [playerX, playerY] = randomEmptyPosition(newBoard);
    setCell(newBoard,playerX, playerY, 'P');

    return newBoard;
}

function drawBoard(board){
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.gridTemplateColumns = `repeat(${Board_Size},1fr)`;

    for(let y = 0; y < Board_Size; y++){
        for(let x = 0; x < Board_Size; x++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellSize + "px";
            cell.style.height = cellSize + "px";
            if(getCell(board,x,y) === 'W'){
                cell.classList.add('wall');
            }else if (getCell(board,x,y) === 'P'){
                cell.classList.add('player');
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

function generateObstacles(board){

    const obstacles = [
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,0],[1,0],[2,0],[1,1]],
    ];

    const positions = [
        {startX: 2, startY: 2},
        {startX: 8, startY: 2},
        {startX: 4, startY: 8},
        {startX: 10, startY: 10},
        {startX: 3, startY: 16},
        {startX: 6, startY: 14},
    ];

    positions.forEach(pos=>{
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
        placeObstacle(board,randomObstacle,pos.startX,pos.startY);
    });

}

function placeObstacle(board, obstacle, startX, startY){
    for(coordinatePair of obstacle){
        [x,y] = coordinatePair;
        board[startY + y][startX + x] = 'W';
    }
}

function randomInt(min,max){
    return Math.floor(Math.random() * (max-min + 1)) +min;
}

function randomEmptyPosition(board){
    x = randomInt(1,Board_Size - 2);
    y = randomInt(1,Board_Size - 2);

    return [x,y];
}

function setCell(board, x, y, value){
    board[y][x] = value;
}