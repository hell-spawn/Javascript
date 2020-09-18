import {SnakeDirection} from '../models/snake.js';

export default class InputHandler {

    constructor(game) {

        document.addEventListener('keydown', (event) => {
            let keyCode = event.keyCode;
            switch (keyCode) {
                case 38:
                    game.snake.changeDirection(SnakeDirection.UP);
                    break;
                case 40:
                    game.snake.changeDirection(SnakeDirection.DOWN);
                    break;
                case 39:
                    game.snake.changeDirection(SnakeDirection.RIGHT);
                    break;
                case 37:
                    game.snake.changeDirection(SnakeDirection.LEFT);
                    break;
                case 32:
                    game.start();
                    break;
                case 27:
                    game.togglePause();
                    break;
                default:
                    break;

            }
        });

    }

}
