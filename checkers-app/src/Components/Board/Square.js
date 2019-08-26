import React from 'react';

function Square(props){
    if (props.value.isGreyed){
        return(
            <button className="chess-board-square" id="grey">
                {props.value.row} , {props.value.col}
            </button>
        );
    }else{
        return(
            <button className="chess-board-square" id="white">
                {props.value.row} , {props.value.col}
            </button>
        );       
    }

}

export default Square;