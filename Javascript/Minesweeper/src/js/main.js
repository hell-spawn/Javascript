const MineSweeper = {
    totalMine : 30,
    totalMinefound : 0,
    numRows : 15,
    numColumns : 15,
    boardMines : []
}


function printTable(){
    var board = document.querySelector('#board');
    while(board.firstChild){
        board.firstChild.removeEventListener('click', uncover);
        board.firstChild.removeEventListener('contextmenu', mark);
        board.removeChild(board.firstChild); 
    }
    document.querySelector('html').style.setProperty('--num-rows', MineSweeper.numRows );
    document.querySelector('html').style.setProperty('--num-columns', MineSweeper.numColumns );
    for(var row = 0; row < MineSweeper.numRows; row++){
        for(var col = 0; col < MineSweeper.numColumns; col++){
            var newDiv = document.createElement("div");
            newDiv.setAttribute('id', 'cell_row_' + row + '_col_' + col);
            newDiv.dataset.row = row;
            newDiv.dataset.column = col;
            newDiv.addEventListener('click', uncover);
            newDiv.addEventListener('contextmenu', mark);
            board.appendChild(newDiv);
        }
    }
}

function mineFieldEmpty() {
    MineSweeper.boardMines = new Array(MineSweeper.numRows);
    for (var row = 0; row < MineSweeper.numRows; row++) {
        MineSweeper.boardMines[row] =  new Array(MineSweeper.numColumns);
    }
}


function putMines() {
    var mines = 0;
    while (mines < MineSweeper.totalMine) {
        var row = Math.floor(Math.random() * MineSweeper.numRows);
        var column = Math.floor(Math.random() * MineSweeper.numColumns);
        if (MineSweeper.boardMines[row][column] != 'X') {
            MineSweeper.boardMines[row][column] = 'X'; 
            mines++;
        }
    }
}

function countNerbyMines(row, column) {
    var countMines = 0;
    for (var _row = row - 1; _row <= row + 1; _row++) {
        for (var _column = column - 1; _column <= column + 1; _column++) {
            if (_row > - 1 && _row < MineSweeper.numRows &&  _column > -1 && _column < MineSweeper.numColumns) {
                if (MineSweeper.boardMines[_row][_column] == 'X') {
                    countMines++; 
                } 
            } 
        } 
    }
    MineSweeper.boardMines[row][column] = countMines;
}


function countMines() {
    for (var row = 0; row < MineSweeper.numRows; row++) {
        for (var column = 0; column < MineSweeper.numColumns; column++) {
            if (MineSweeper.boardMines[row][column] != 'X') {
                countNerbyMines(row, column); 
            }
        } 
    } 
}


function initGame(){
    MineSweeper.numRows = 10;
    MineSweeper.numColumns = 10;
    MineSweeper.totalMine = 5;
    printTable();
    mineFieldEmpty();
    putMines();
    countMines();
    updateNumRemainingMines();
}

function mark(event) {
    if (event.type === 'contextmenu') {
        event.stopPropagation();
        event.preventDefault();
        var box = event.target;
        var row = box.dataset.row;
        var column = box.dataset.column;
        if (row >= 0 && column >= 0 && row < MineSweeper.numRows && column < MineSweeper.numColumns) {
            if (box.classList.contains('icon-flag')) {
                box.classList.remove('icon-flag');
                box.classList.add('icon-question');
                MineSweeper.totalMinefound--;
                updateNumRemainingMines();
                return;
            }
            if(box.classList.contains('icon-question')){
                box.classList.remove('icon-question');
                return;
            } 
            if (box.classList.length == 0) {
                box.classList.add('icon-flag');
                MineSweeper.totalMinefound++;
                if (MineSweeper.totalMinefound == MineSweeper.totalMine) {
                    resolveBoard(true);
                }
                updateNumRemainingMines();
            }
        }
    }
}

function uncover(event) {
    if(event.type === 'click'){
        var box = event.target;
        var row = box.dataset.row;
        var column = box.dataset.column;
        uncoverField( parseInt(row),parseInt(column));
    }
}

function uncoverField(row, column){
    if (row >= 0 && column >= 0 && row < MineSweeper.numRows && column < MineSweeper.numColumns) {
        var field = document.querySelector(`#cell_row_${row}_col_${column}`);
        if(!field.classList.contains('uncover')){
            if (!field.classList.contains("icon-flag")){
                field.classList.add('uncover');
                field.innerHTML = MineSweeper.boardMines[row][column];
                field.classList.add('mine' + MineSweeper.boardMines[row][column]);
                if (MineSweeper.boardMines[row][column] !== 'X'){
                    if (MineSweeper.boardMines[row][column] == 0){
                        uncoverField(parseInt(row - 1), parseInt(column - 1));
                        uncoverField(parseInt(row - 1), parseInt(column));
                        uncoverField(parseInt(row - 1), parseInt(column + 1));
                        uncoverField(parseInt(row), parseInt(column - 1));
                        uncoverField(parseInt(row), parseInt(column + 1));
                        uncoverField(parseInt(row + 1), parseInt(column - 1));
                        uncoverField(parseInt(row + 1), parseInt(column));
                        uncoverField(parseInt(row + 1), parseInt(column + 1));
                        field.innerHTML  = '';
                    }
                } else if (MineSweeper.boardMines[row][column] == 'X'){
                    // si por el contrario hay bomba quitamos la B
                    field.innerHTML = "";

                    //añadimos el estilo de que hay bomba
                    field.classList.add('icon-bomb');

                    // y que se nos ha olvidado marcarla
                    field.classList.add('unmarked');

                    // y resolvemos el board indicando (false), que hemos cometido un fallo
                    resolveBoard(false);
                }
            }
        }
    }
}

function updateNumRemainingMines(){
    document.querySelector("#numMinasRestantes").innerHTML = (MineSweeper.totalMine - MineSweeper.totalMinefound);
}

function resolveBoard(isOk){
    let board = document.getElementById('board');
    let boardFields = board.children;
    for(let i = 0; i < boardFields.length ; i++){
        boardFields[i].removeEventListener('click', uncover);
        boardFields[i].removeEventListener('contextmenu', mark);
        let row = parseInt(boardFields[i].dataset.row, 10);
        let column = parseInt(boardFields[i].dataset.column, 10);
        if(boardFields[i].classList.contains('icon-flag')){
            if(MineSweeper.boardMines[row][column] == 'X'){
                boardFields[i].classList.remove('icon-flag');
                boardFields[i].classList.add('icon-bomb');
                boardFields[i].classList.add('uncover');
            } else {
                boardFields[i].classList.add('uncover');
                boardFields[i].classList.add('error-flag');
                this.isOK = false;
            }
        } else {
            if(MineSweeper.boardMines[row][column] == 'X'){
                boardFields[i].classList.add('icon-bomb');
                boardFields[i].classList.add('error-flag');
            } else {
                boardFields[i].classList.add('uncover');
                if(MineSweeper.boardMines[row][column] != 0){
                    boardFields[i].classList.add('mine' + MineSweeper.boardMines[row][column]);
                    boardFields[i].innerHTML =  MineSweeper.boardMines[row][column];
                }
            }
        }
    }
    if(this.isOk){
        alert('gg....');
    } 
}

initGame();
