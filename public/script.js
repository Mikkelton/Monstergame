
document.getElementById('new-game-btn').addEventListener('click',startgame)

function startgame(){
    console.log('klikattu')
    document . getElementById('intro-screen').style.display = 'none';
    document . getElementById('game-screen').style.display = 'block';
}