const Board_Size = 20;
const cellSize = calculateCellSize();
let board;
let player;
let ghosts = [];

document.getElementById('new-game-btn').addEventListener('click',startgame)
document.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'ArrowUp':
            player.move(0,-1);
        break;

        case 'ArrowDown':
            player.move(0,1);
        break;

        case 'ArrowRight':
            player.move(1,0);
        break;

        case 'ArrowLeft':
            player.move(-1,0);
        break;

        case 'w':
            shootAt(player.x,player.y -1);
        break;
    }
    event.preventDefault();
})

function startgame(){
    console.log('klikattu')
    document . getElementById('intro-screen').style.display = 'none';
    document . getElementById('game-screen').style.display = 'block';

    player = new Player(0,0);

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
    player.x = playerX;
    player.y = playerY;

    for(let i = 0; i < 5; i++){
        const [ghostX, ghostY] = randomEmptyPosition(newBoard);
        setCell(newBoard,ghostX, ghostY,'G');
        
    }

    return newBoard;
}

function drawBoard(board){
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.gridTemplateColumns = `repeat(${Board_Size},1fr)`;
    gameBoard.innerHTML = "";

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
            }else if(getCell(board,x,y) === 'G'){
                cell.classList.add('ghost')
            }
            else if(getCell(board,x,y)==='B'){
                cell.classList.add('bullet')
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
    if(getCell(board, x, y) === ''){
        return [x,y];
    }  
    else{
        return randomEmptyPosition(board);
    }
}

function setCell(board, x, y, value){
    board[y][x] = value;
}

function shootAt(x,y){
    if(getCell(board,x,y) === 'W'){
        return;
    }
    setCell(board,x,y,'B');
    drawBoard(board);
}

class Player{
    constructor(x,y){
        this.x = y;
        this.y = y;
    }
    move(deltaX, deltaY){
        
            
        const currentX = player.x;
        const currentY = player.y;


        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        if(getCell(board, newX, newY) === ''){
            player.x = newX;
            player.y = newY;


            setCell(board,currentX, currentY,'');

            setCell(board,newX,newY,'P');

            drawBoard(board);
        }

        
        

    }
}

class Ghost{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}