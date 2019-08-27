import React from 'react'
import './chess-board.css'
import SquareRenderer from './SquareRenderer'
import Pieces from '../Board/Pieces'
import Square from './Square';
import { exportDefaultSpecifier } from '@babel/types';

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(64).fill().map(u=>(new Square())),
            isBlueTurn: true,
            isMoving: false,
            lastAction: 0,
            selectedId: -1
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

    switchPlayers(){
        // Set internal states
        this.state.isMoving = false;
        this.state.isBlueTurn = !this.state.isBlueTurn;
        // Set external states
        this.props.gameCommunication.turnIndicatorText = 
            this.state.isBlueTurn ? "Blue's Turn" : "Red's Turn";
        this.props.gameCommunication.warningText = ""
        if(this.state.lastAction==1){
            this.state.lastAction = 0;
            this.props.gameCommunication.warningText = "JUMPED AF";
            let t = Date.now();
            this.props.gameCommunication.warningTextTimeout = t + 2000;
        }else if(this.state.lastAction==2){
            this.state.lastAction = 0
            this.props.gameCommunication.warningText = "I'M THE KING NOW";
            let t = Date.now();
            this.props.gameCommunication.warningTextTimeout = t + 2000;
        }else if(this.state.lastAction==3){
            this.state.lastAction = 0
            this.props.gameCommunication.warningText = "JUMPING TO THE THONE!";
            let t = Date.now();
            this.props.gameCommunication.warningTextTimeout = t + 2000;
        }
        
    }

    checkAndKingMe(i){
        console.log("km_row="+this.state.squares[i].row);
        if((this.state.isBlueTurn == true && this.state.squares[i].row==7) || 
           (this.state.isBlueTurn == false && this.state.squares[i].row==0)){
            this.state.squares[i].isKing = true;
            if(this.state.lastAction==0){
                this.state.lastAction = 2;
            }else if(this.state.lastAction==1){
                this.state.lastAction = 3;
            }
                  
        }
    }


    componentDidMount(){
        this.interval = setInterval(()=>this.setState({time: Date.now()}), 6);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    remove(i)
    {
        if(this.state.isBlueTurn){
            this.props.gameCommunication.numberRedChips-=1;
        }else{
            this.props.gameCommunication.numberBlueChips-=1;
           
        }
        this.state.squares[i].piece = Pieces.EMPTY;
        this.state.lastAction = 1;
    }

    jump(remove_i,move_i)
    {
        this.remove(remove_i);
        this.move(move_i);
    }

    checkifSelectedPieceCanMoveBackwards(){
        // Black pieces can always move forward
        if (this.state.squares[this.state.selectedId].piece==Pieces.CHECKERS_BLACK)
        {
            return true;
        }
        // Blue pieces can only move forward if king
        if (this.state.squares[this.state.selectedId].piece == Pieces.CHECKERS_WHITE && 
            this.state.squares[this.state.selectedId].isKing == true)
        {
            return true;
        }
        return false;
    }

    checkIfSelectedPieceCanMoveForward(){
        // Blue pieces can always move forward
        if (this.state.squares[this.state.selectedId].piece==Pieces.CHECKERS_WHITE)
        {
            return true;
        }
        // Black pieces can only move forward if king
        if (this.state.squares[this.state.selectedId].piece == Pieces.CHECKERS_BLACK && 
            this.state.squares[this.state.selectedId].isKing == true)
        {
            return true;
        }
        return false;
    }

    move(i)
    {
        console.log("Target = " + this.state.squares[i].piece)
        console.log("Selected = " + this.state.squares[this.state.selectedId].piece.value)
        this.state.squares[this.state.selectedId].selected = false;
        this.state.squares[i].piece = this.state.squares[this.state.selectedId].piece;
        this.state.squares[i].isKing = this.state.squares[this.state.selectedId].isKing;
        this.state.squares[this.state.selectedId].isKing = false;
        this.state.squares[this.state.selectedId].piece = Pieces.EMPTY;
        this.checkAndKingMe(i);
    }

    checkIfValidAndJump(col,row,move_i){
        let remove_i = row*8+col;
        console.log("row="+row);
        console.log("col="+col);
        console.log("remove_i=" + remove_i);
        console.log("this.state.squares[remove_i].piece="+this.state.squares[remove_i].piece.value)
        if (remove_i >= 64 || remove_i < 0){
            return false;
        }
        if (this.state.isBlueTurn == true && 
            this.state.squares[remove_i].piece == Pieces.CHECKERS_BLACK)
        {
            this.jump(remove_i,move_i);
            return true;
        }
        if (this.state.isBlueTurn == false && 
            this.state.squares[remove_i].piece == Pieces.CHECKERS_WHITE)
        {
            this.jump(remove_i,move_i);
            return true;
        }
        return false;
    }

    checkIfValidAndMove(i){
        let sel_row = this.state.squares[this.state.selectedId].row;
        let sel_col = this.state.squares[this.state.selectedId].col;
        let move_row = this.state.squares[i].row;
        let move_col = this.state.squares[i].col;
        let delta_col = Math.abs(move_col - sel_col);
        let delta_row = Math.abs(move_row - sel_row);
        // Normal Moves
        if( this.state.squares[i].piece==Pieces.EMPTY){
            console.log("Delta_Col="+delta_col);
            if (delta_col == 1 && delta_row == 1){
                console.log(this.checkIfSelectedPieceCanMoveForward());
                // Only allow backward movement if king
                if(move_row < sel_row && this.checkifSelectedPieceCanMoveBackwards(i) == true){
                    this.move(i);
                    return true;
                }
                if(move_row > sel_row && this.checkIfSelectedPieceCanMoveForward(i) == true){
                    this.move(i);
                    return true;
                }
                return false;
            }
            // TODO: Add jumping
            if (delta_col == 2 && delta_row == 2){
                //Left-forward
                if(move_col < sel_col && move_row > sel_row &&
                    this.checkIfSelectedPieceCanMoveForward() == true)
                {
                    return this.checkIfValidAndJump(move_col+1,move_row-1,i);
                }
                //Right-forward
                if(move_col > sel_col && move_row > sel_row &&
                    this.checkIfSelectedPieceCanMoveForward() == true)
                {
                    return this.checkIfValidAndJump(move_col-1,move_row-1,i);
                }
                //Left-backward
                if(move_col < sel_col && move_row < sel_row && 
                    this.checkifSelectedPieceCanMoveBackwards() == true)
                {
                        return this.checkIfValidAndJump(move_col+1,move_row+1,i);
                }
                //Right-backwards
                if(move_col > sel_col && move_row < sel_row &&
                    this.checkifSelectedPieceCanMoveBackwards() == true)
                {
                        return this.checkIfValidAndJump(move_col-1,move_row+1,i);
                }                
            }
        }
        return false;
    }

    changeSelection(newSelectedId)
    {
        this.state.squares[newSelectedId].selected = true;
        this.state.squares[this.state.selectedId].selected = false;
        this.state.selectedId = newSelectedId;
    }

    handleClick(i){
        var squares = this.state.squares.slice();
        if(this.state.isMoving==false){
            // Selecting Piece    
            if(squares[i].piece==Pieces.CHECKERS_WHITE && this.state.isBlueTurn){
                // A Blue piece is selected and it is Blue's turn
                squares[i].selected = true;
                this.state.isMoving = true;
                this.state.selectedId = i;
            }else if(squares[i].piece==Pieces.CHECKERS_BLACK && !this.state.isBlueTurn){
                // A black pices is selected and it is black's turn
                squares[i].selected = true;
                this.state.isMoving = true;
                this.state.selectedId = i;
            }
        }else{
            // Moving Piece
            let validMove = this.checkIfValidAndMove(i);
            if (validMove){
                this.switchPlayers();
            }
            // Deselection
            if((squares[i].piece==Pieces.CHECKERS_WHITE && this.state.isBlueTurn == true) ||
                (squares[i].piece==Pieces.CHECKERS_BLACK && this.state.isBlueTurn == false)){
                this.changeSelection(i)
            }
        }
    }

    renderSquare(i){
        return(<SquareRenderer square={this.state.squares[i]} 
            onClick={()=>this.handleClick(i)}/>);
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