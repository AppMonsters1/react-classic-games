import React, { Component } from 'react';
import Board from './board';
import '../../css/tictactoe.css';

export default class TicTacToeGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
        this.replay = this.replay.bind(this);
    }

    
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ 
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 ) === 0,
        })
    }

    replay(){
        this.setState({stepNumber: 0,
            history: [{
                squares: Array(9).fill(null),
            }],
        xIsNext: true});
        this.jumpTo(0);
    }

    render() {
        
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move :
            'Go to game start';
            return(
                <li key={move}>
                    <button className="btn btn-link" onClick = {() => this.jumpTo(move)}> {desc} </button>
                </li>
            )
        });

        let status;
        if(winner){
            status = 'Winner: ' + winner;
        } else{
            var complete = true;
            current.squares.forEach(function(item){
                if(item === null){
                    complete = false;
                }
            });
            if (complete && this.state.stepNumber !== 0){
                status="Its a Tie!";
            }else{
                status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }
    

      return (
        <div className="bodyContainer">
            <h1 className="leftAlign">Tic-Tac-Toe</h1>
            <b> Enjoy this classic game with your friend!</b>
            <br/>
            <div className="status">{status}</div>
            <div className="mainGame">
                <div className="game-board">
                    <Board squares={current.squares}
                    onClick = {(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
          </div>
          {
              (status.includes("Winner") || status.includes("Tie")) ? 
                <button className="btn btn-primary" onClick={this.replay}> Replay </button>
              : null
          }
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }