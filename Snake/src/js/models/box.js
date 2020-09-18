export default class Box {

    constructor(game, position) {
        this.size = game.box.size;
        this.height = game.box.height;
        this.position = position;
    }

    update(position) {
        this.position;
    }

    draw(ctx) {
        ctx.fillStyle = '#B1FFA3';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#348026';
        ctx.strokeRect(this.position.x, this.position.y, this.size, this.size);
    }

}
