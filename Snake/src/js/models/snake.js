import Box from './box.js';
import {detectCollision} from '../util/detectCollision.js';

export default class Snake {

    constructor(game) {
        this.boxs = [];
        this.boxs.push(new Box(game, {x: game.gameWidth / 2, y: game.gameHeight / 2}));
        this.game = game
        this.currentDirection = SnakeDirection.RIGHT;
    }

    update() {
        let head = this.boxs[this.boxs.length - 1];
        let newBox = null;
        switch (this.currentDirection) {
            case SnakeDirection.UP:
                newBox = new Box(this.game, {x: head.position.x, y: head.position.y - 10});
                break;
            case SnakeDirection.DOWN:
                newBox = new Box(this.game, {x: head.position.x, y: head.position.y + 10});
                break;
            case SnakeDirection.LEFT:
                newBox = new Box(this.game, {x: head.position.x - 10, y: head.position.y});
                break;
            case SnakeDirection.RIGHT:
                newBox = new Box(this.game, {x: head.position.x + 10, y: head.position.y});
                break;
            default:
                break;
        }

        /*Detect Collison game borders*/
        let borders = this.game.borders;
        if (newBox.position.x + 10 > borders.right || newBox.position.x < borders.left || newBox.position.y + 10 > borders.bottom || newBox.position.y < borders.top) {
            this.game.gameover();
            return;
        }
        /*end*/


        let indexCollision = this.boxs.findIndex((box) => {
            return detectCollision(newBox, box);
        });

        if (indexCollision >= 0) {
            this.game.gameover();
            return;
        }

        if (!detectCollision(this.game.fruit, newBox)) {
            this.boxs.shift();
        } else {
            this.addPoint();
        }
        this.boxs.push(newBox);

    }

    draw(ctx) {
        this.boxs.forEach((box) => box.draw(ctx));
    }

    changeDirection(direction) {
        if (direction === SnakeDirection.UP || direction === SnakeDirection.DOWN) {
            if (this.currentDirection === SnakeDirection.UP || this.currentDirection === SnakeDirection.DOWN) {
                return;
            }
            else {
                this.currentDirection = direction;
            }
        }
        if (direction === SnakeDirection.LEFT || direction === SnakeDirection.RIGHT) {
            if (this.currentDirection === SnakeDirection.LEFT || this.currentDirection === SnakeDirection.RIGHT) {
                return;
            }
            else {
                this.currentDirection = direction;
            }
        }
    }

    addPoint() {
        this.game.fruit.update();
        this.game.points += 1;
        if (this.game.points % 5 === 0) {
            this.game.gameLevel += 1;
        }
    }
}


export const SnakeDirection = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
}
