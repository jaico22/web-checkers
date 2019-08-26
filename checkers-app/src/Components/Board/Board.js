import React from 'react'
import './chess-board.css'
import Square from '../Board/Square'

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(64).fill().map(u=>({row: 0, col: 0, value:'x',isGreyed:false})),
            whiteIsNext: false,
        }
        let squares = this.state.squares.slice();
        let rowCount = -1;
        for(let i = 0; i < 64; i++){   
            squares[i].value = i;
            squares[i].row = i % 8 == 0 ? ++rowCount : rowCount;
            squares[i].col = i % 8
            squares[i].isGreyed = (squares[i].row + squares[i].col) % 2 == 0;
        }
        this.setState({squares: squares});
    }


    renderSquare(i){
        return(<Square value={this.state.squares[i]}/>);
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