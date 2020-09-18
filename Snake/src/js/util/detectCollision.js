export function detectCollision(object, snakeHead) {
    if(object.position.x == snakeHead.position.x && object.position.y == snakeHead.position.y){
        return true; 
    }
    return false;

}
