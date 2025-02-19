const Board_Size = 15;
let board;

document.getElementById('new-game-btn').addEventListener('click',startgame)

function startgame(){
    console.log('klikattu')
    document . getElementById('intro-screen').style.display = 'none';
    document . getElementById('game-screen').style.display = 'block';

    board = generateRandomBoard();
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