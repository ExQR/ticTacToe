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
    
    const checkWinner = (gameBoard) => {
        let states = gameBoard.getStates(gameBoard.getSquares());
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];

        for (comb of winCombinations) {
            if (states[comb[0]] && states[comb[1]] && states[comb[2]]) {
                if (states[comb[0]] === states[comb[1]] && states[comb[0]] === states[comb[2]]) {
                    return states[comb[0]];
                }
            }
        }
        if (!states.includes(null)) {
            return 'Tie';
        }
    }

    const renderWinner = (winner) => {
        const congrats = document.getElementById('congrats');
        if (winner === 'X' || winner === 'O'){
            congrats.innerHTML = `The winner is ${winner}` 
        } else {
            congrats.innerHTML = 'It\'s a tie'
        }
    }

    return {renderWinner, checkWinner, getRound, setRound, createGame}
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
            if (game.getRound() === 1 && state === null) {
                setState('X');
                game.setRound();
            } else if (game.getRound() % 2 === 0 && state === null) {
                setState('O');
                game.setRound();
                if (game.checkWinner(gameboard) !== undefined) {
                    game.renderWinner(game.checkWinner(gameboard));
                    disableSquares();
                };
            } else if (state === null) {
                setState('X');
                game.setRound();
                if (game.checkWinner(gameboard) !== undefined) {
                    game.renderWinner(game.checkWinner(gameboard));
                    disableSquares();
                };
            }
            square.innerHTML = state;
        })

        return square;
    }
    const disableSquares = () => {
        let buttons = document.querySelectorAll('.square');
        buttons.forEach((element) => element.setAttribute('disabled', 'true'));
    }
    return {getState, setState, createSquare};
}


const game = Game();
const gameboard = game.createGame();

const resetGame = document.createElement('button');
resetGame.setAttribute('type', 'button');
resetGame.setAttribute('id', 'resetBtn');
const container = document.getElementById('container');
container.appendChild(resetGame);
resetGame.innerHTML = 'Restart';
resetGame.addEventListener('click', () => document.location.reload());