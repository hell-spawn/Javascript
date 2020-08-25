import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from '../utils/input.js';
import {buildLevel, Levels } from  '../utils/levels.js';

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.inputHandler = new InputHandler(this.paddle, this);
        this.gameObjects = [];
        this.gameState = GAME_STATE.MENU;
        this.lives = 2;
        this.currentLevel = 0;
    }


    start(){
        this.gameState = GAME_STATE.RUNNING;
        if(this.gameState === GAME_STATE.MENU){
            return;
        }
        this.bricks = buildLevel(this, Levels[this.currentLevel]);
        this.gameObjects = [this.paddle, this.ball, ...this.bricks];
    }

    restart(){
        this.gameState = GAME_STATE.RUNNING;
        this.bricks = buildLevel(this, Levels[this.currentLevel]);
        this.gameObjects = [this.paddle, this.ball, ...this.bricks];
        this.ball.reset();
    }

    draw(context){

        this.gameObjects.forEach((object) => object.draw(context));
        this.gameObjects = this.gameObjects.filter(gameObject => {
            return !gameObject.makedForDetection;
        });

      
        if(this.gameState === GAME_STATE.RUNNING){
            if(this.gameObjects.length < 3){
                this.gameState = GAME_STATE.NEWLEVEL;
                return;
            }
        }

        if(this.gameState === GAME_STATE.MENU){
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgb(0, 0, 0, 1)";
            context.fill();
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Press SPACEBAR to start", this.gameWidth/2, this.gameHeight/2);
            return;
        }

        if(this.gameState === GAME_STATE.GAMEOVER){
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgb(0, 0, 0, 0.5)";
            context.fill();
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2);
            return;
        }

        if(this.gameState === GAME_STATE.PAUSED){
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgb(0, 0, 0, 0.5)";
            context.fill();
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
            return;
        }

        if(this.gameState === GAME_STATE.NEWLEVEL){
            this.currentLevel++;
            this.restart();
            return;
        }

    }

    update(){

        if( this.gameState === GAME_STATE.PAUSED || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAMEOVER ){
            return;
        }
        if(this.lives === 0){
            this.gameState = GAME_STATE.GAMEOVER;
        }
        this.gameObjects.forEach((object) => object.update())
    }


    togglePaused(){
        if(this.gameState === GAME_STATE.PAUSED ){
            this.gameState = GAME_STATE.RUNNING; 
            return;
        }
        this.gameState = GAME_STATE.PAUSED;
    }

}
