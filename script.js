const GameBoard = () => {
    const squares = [];

    const getSquares = () => squares;

    const createBoard = () => {
        let board = document.createElement('div');
        board.setAttribute('id', 'board');
        const container = document.getElementById('container');
        container.appendChild(board);
    }
    const renderBoard = () => {
        for (let i=0; i<=8; i++) {
            let square = Square();
            squares.push(square);
            let renderedSquare= square.createSquare(i);
            document.getElementById('board').appendChild(renderedSquare);
        }
    }
    return {getSquares, createBoard, renderBoard}
}

const Square = () => {

    let state = null;

    const getState = () => state;

    const setState = (newState) => state = newState;

    const createSquare = (id) => {
        let square = document.createElement('div');
        square.setAttribute('number', id);
        square.setAttribute('class', 'square');
        return square;
    }
    return {getState, setState, createSquare};
}

const gameBoard = GameBoard();
gameBoard.createBoard();
gameBoard.renderBoard();
