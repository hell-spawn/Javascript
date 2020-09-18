import Snake from './snake.js';
import InputHandler from '../util/input.js';
import Fruit from './fruit.js';


const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {

    constructor(props) {
        this.gameWidth = props.gameWidth;
        this.gameHeight = props.gameHeight;
        this.gameState = GAME_STATE.MENU;
        this.box = props.box;
        this.borders = {
            top: 30,
            bottom: this.gameHeight - 10,
            left: 10,
            right: this.gameWidth - 10
        }
        this.gameBoardWidth = this.borders.right - this.borders.left;
        this.gameBoardHeight = this.borders.bottom - this.borders.top;
        this.gameLevel = props.defaultLevel;
        this.points = 0;
        this.input = new InputHandler(this);
    }

    update() {
        if (this.gameState === GAME_STATE.PAUSED || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAMEOVER) {
            return;
        }
        this.snake.update();
    }

    start() {
        if (this.gameState === GAME_STATE.RUNNING || this.gameState === GAME_STATE.PAUSED) {
            return;
        }
        this.snake = new Snake(this);
        this.fruit = new Fruit();
        this.gameState = GAME_STATE.RUNNING;
    }

    gameover() {
        this.gameState = GAME_STATE.GAMEOVER;
        this.points = 0;
        this.gameLevel = 0;
    }

    togglePause() {
        if (this.gameState === GAME_STATE.MENU) {
            return;
        }
        if (this.gameState === GAME_STATE.RUNNING) {
            this.gameState = GAME_STATE.PAUSED;
            return;
        }
        this.gameState = GAME_STATE.RUNNING;
    }


    draw(ctx) {

        if (this.gameState === GAME_STATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(0, 0, 0, 1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this.gameHeight / 2);
            return;
        }

        if (this.gameState === GAME_STATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(0, 0, 0, 1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
            return;
        }


        if (this.gameState === GAME_STATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
            return;
        }

        ctx.fillStyle = '#14BCCC';
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.box.size, this.box.size * 3, this.gameBoardWidth, this.gameBoardHeight);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("SCORE: " + this.points + " LEVEL: " + this.gameLevel, this.gameWidth / 2, 25);
        this.snake.draw(ctx);
        this.fruit.draw(ctx);
    }

}
