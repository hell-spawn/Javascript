import Game from './models/game.js';
import FpsCtrl from './util/fps_controller.js';

const GAME_WIDTH = 40;
const GAME_HEIGHT = 40;
const BOX_SIZE = 10;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const properties = {
    box: {
        size: BOX_SIZE,
    },
    gameWidth: (GAME_WIDTH * BOX_SIZE) + 20,
    gameHeight: (GAME_HEIGHT * BOX_SIZE) + 40,
    defaultLevel: 0
}

const game = new Game(properties);

var fps = new FpsCtrl(60, function (e) {
    ctx.clearRect(0, 0, game.gameWidth, game.gameHeight);
    game.draw(ctx)
    let ratio = (5 - game.gameLevel) * 4
    if (ratio === 0)
        ratio = 1;
    console.log(ratio);
    if (e.frame % ratio === 0) {
        game.update();
    }
});

fps.run();

