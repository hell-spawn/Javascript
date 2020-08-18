import Brick from '../models/brick.js';

export function buildLevel(game, level) {
  
    let bricks = [];

    level.forEach((row, rowIndex) =>{
        row.forEach((item, itemIndex)=> {
            if(item === 1){
                let position = {
                    x: 80 * itemIndex,
                    y: 50 + 24 * rowIndex
                }

                bricks.push(new Brick(game, position));
            }
        });
    });

    return bricks;
}


export const Levels = [
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,0,0,1,1],
        [1,1,0,0,1,1,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1]
    ],
    [
        [1,1,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,0,0,0,0,1,1]
    ],
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
    ]
]
