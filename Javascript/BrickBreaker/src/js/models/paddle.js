export default class Paddle {

    constructor(game){
       
        this.maxspeed = 5;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.color = '#0029FA';
        this.width = 120;
        this.height = 20;
        this.speed = 0;
        this.reset(); 
    }

    reset(){
        this.position = {
            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight - this.height - 10
        }
    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(detalTime){
        this.position.x += this.speed;

        if(this.position.x < 0)
            this.position.x = 0;

        if(this.position.x > this.gameWidth - this.width)
            this.position.x = this.gameWidth - this.width;

    }

    moveLeft(){
        this.speed = -this.maxspeed;
    }

    moveRigth(){
        this.speed = this.maxspeed;
    }

    stop(){
        this.speed = 0;
    }
}
