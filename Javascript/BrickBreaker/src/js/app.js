import Game from './models/game.js'

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let canvas = document.getElementById('gamescreen');
let context = canvas.getContext('2d');


let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update();
    game.draw(context);
    requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

