import React from 'react'
import './Overlay.css'

class Overlay extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var overlayMessage = "";
        var overlayText = ""
        if(this.props.gameState.numberBlueChips==0){
          overlayText = "Red Wins!"
        }else if(this.props.gameState.numberRedChips==0){
            overlayText = "Blue Wins!"
        }
        if(overlayText!=""){
            return(
                <div class="overlay-container">
                    <div class="overlay-text">
                        {overlayText}
                    </div>
                </div>
            )
        }else{
            return("");
        }
    }
}

export default Overlay;