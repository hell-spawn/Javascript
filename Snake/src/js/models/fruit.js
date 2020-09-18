export default class Fruit {

    constructor(){
        this.size = 10; 
        this.position = {x: 0, y:0};
        this.update();
    }

    update(){
        this.position = {
            x: ( this.getRandom( 0, 39 ) * 10) + 10,
            y: ( this.getRandom( 0, 39 ) * 10) + 30 
        }
    }

    draw( ctx ){
        ctx.fillStyle = '#FF303F';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    getRandom(min, max) {
        return Math.floor( Math.random() * (max - min) + min );
    }

}
