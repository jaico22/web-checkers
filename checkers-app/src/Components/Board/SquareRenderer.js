import React from 'react';
import Pieces from './Pieces'

function SquareRenderer(props){

    let squareId = props.square.isShaded ? "grey" : "white";
    let contentString = ""
    switch(props.square.piece){
        case Pieces.CHECKERS_BLACK : 
            contentString = <div className="checker" id="black"></div>;
            break;
        case Pieces.CHECKERS_WHITE :
            contentString = <div className="checker" id="white"></div>;
            break;          
        default : 
            contentString = props.square.piece.value;
            break;
    }
    return(
        <button className="chess-board-square" id={squareId}>
            {contentString}
        </button>
    );

}

export default SquareRenderer;