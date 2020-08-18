import { detectCollision } from '../utils/detectCollision.js'

export default class Ball {

    constructor(game){
        this.ball = document.getElementById('ball'); 
        this.size = 16;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.speed = { x: 6, y: 4 };
        this.game = game;
        this.reset();
    }

    reset(){
        this.position = { 
            x: this.gameWidth / 2 - this.size /2, 
            y: 550 
        };
        this.game.paddle.reset();
    }

    draw(context){
        context.drawImage(this.ball, this.position.x, this.position.y, this.size, this.size);
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x < 0 || this.position.x + this.size > this.gameWidth)
            this.speed.x = -this.speed.x;

        if(this.position.y  < 0 )
            this.speed.y = -this.speed.y;

        if(this.position.y + this.size > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        if(detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size; 
        }
    }

}

