import React from 'react';
import Pieces from './Pieces'

function SquareRenderer(props){

    let squareId = props.square.isShaded ? "grey" : "white";
    let contentString = ""
    let randomText = ""
    if (props.square.isKing){
        randomText = GenerateRandomKingText(150)
    }else{
        randomText = GenerateRandomText(150)
    }
    
    switch(props.square.piece){
        case Pieces.CHECKERS_BLACK : 
            
            contentString = <div className="checker" 
                id={props.square.selected?"black-selected":"black"}>{randomText}</div>;
            break;
        case Pieces.CHECKERS_WHITE :
            contentString = <div className="checker" 
                id={props.square.selected?"white-selected":"white"}>>{randomText}</div>;
            break;          
        default : 
            contentString = "";
            break;
    }
    return(
        <button className="chess-board-square"  id={squareId} onClick={props.onClick}> 
            <div className="chess-board-square-text">
                {contentString}
                {randomText}
            </div>
        </button>
    );

}

function GenerateRandomKingText(length){
    var result           = '';
    var characters       = 'Kk';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function GenerateRandomText(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKL@#$%&*()!~MNOPQRSTU+=-_.,:;~VWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
export default SquareRenderer;