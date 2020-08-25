import {detectCollision} from "../utils/detectCollision.js";

export default class Brick {

    constructor(game , position){
        this.brick = document.getElementById('brick'); 
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.position = position;
        this.height = 24;
        this.width = 80;
        this.game = game;
        this.makedForDetection = false;
    }

    draw(context){
        context.drawImage(this.brick, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.makedForDetection = true;
        }
    }

}
