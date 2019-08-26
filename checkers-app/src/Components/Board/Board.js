import React from 'react'
import './chess-board.css'
import SquareRenderer from './SquareRenderer'
import Pieces from '../Board/Pieces'
import Square from './Square';

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(64).fill().map(u=>(new Square())),
            whiteIsNext: false,
        }
        let squares = this.state.squares.slice();
        let rowCount = -1;
        for(let i = 0; i < 64; i++){   
            squares[i].row = i % 8 == 0 ? ++rowCount : rowCount;
            squares[i].col = i % 8
            squares[i].isShaded = (squares[i].row + squares[i].col) % 2 != 0;
            // Determine Pieces
            if (squares[i].isShaded && squares[i].row >=6){
                squares[i].piece = Pieces.CHECKERS_BLACK;
            }else if(squares[i].isShaded && squares[i].row <= 1){
                squares[i].piece = Pieces.CHECKERS_WHITE;
            }else{
                squares[i].piece = Pieces.EMPTY;
            }
        }
        this.setState({squares: squares});
    }


    renderSquare(i){
        return(<SquareRenderer square={this.state.squares[i]}/>);
    }

    generateBoard(){
        let board = [];
            let boardRow = [];
            for(let i = 0; i < 64; i++){
                boardRow.push(this.renderSquare(i));
            }
            board.push(<div className="chess-board">{boardRow}</div>);
        
        return <div className="chess-board">{boardRow}</div>;
    }

    render(){
        return(
            <div>
                {this.generateBoard()}
            </div>
        )        
    };

};

export default Board;