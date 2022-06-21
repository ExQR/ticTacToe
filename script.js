const Game = () => {
    let round = 1;

    const getRound = () => round;
    const setRound = () => round++;

    const createGame = () => {
        const gameBoard = GameBoard();
        gameBoard.createBoard();
        gameBoard.renderBoard();
        return gameBoard;
    }
    
    return {getRound, setRound, createGame}
}



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

    const getStates = (squares) => {
        let statesArr = [];
        for (let i=0; i<=8; i++) {
            statesArr.push(squares[i].getState());
        }
        return statesArr;
    }

    return {getStates, getSquares, createBoard, renderBoard}
}

const Square = () => {

    let state = null;

    const getState = () => state;

    const setState = (newState) => state = newState;

    const createSquare = (id) => {
        let square = document.createElement('button');
        square.setAttribute('type', 'button');
        square.setAttribute('number', id);
        square.setAttribute('class', 'square');
        square.addEventListener('click', (e) => {
            if (game.getRound() === 0) {
                setState('X');
                game.setRound();
            } else if (game.getRound() % 2 === 0) {
                setState('O');
                game.setRound();
            } else {
                setState('X');
                game.setRound();
            }
            square.innerHTML = state;
            let states = gameboard.getStates(gameboard.getSquares())
            console.log(states);
        })

        return square;
    }
    return {getState, setState, createSquare};
}


const game = Game();
const gameboard = game.createGame();
